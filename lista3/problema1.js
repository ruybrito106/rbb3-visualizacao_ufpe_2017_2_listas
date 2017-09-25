const margem = 10;
const largura = 620;
const altura = 600;

var color = d3.scaleLinear()
              .domain([0, 370])
              .range(["#CEC2B9", "#3B2B1F"]);

var colorState = d3.scalePow()
              .domain([0, 1600])
              .range(["#FFF599", "#908100"]);

var projection = d3.geoMercator()
                   .scale(600)
                   .translate([850, 150])

var path = d3.geoPath()
             .projection(projection)

var svg = d3.select('svg')
            .attr('width', largura)
            .attr('height', altura)

var eventos = []

var cidades = []
var ocorrenciasCidade = []

var estados = []
var ocorrenciasEstado = []

d3.csv('oco.csv', function(error, data) {

  for (var i = 0; i < data.length; i++) {
    var o = data[i], c = ""

    if (o.ocorrencia_classificacao && o.ocorrencia_classificacao[0] == "A") c = "acidente"
    else c = "incidente"

    eventos.push({classe: c, cidade: clear(o.ocorrencia_cidade), lat: parseFloat(o.ocorrencia_latitude), long: parseFloat(o.ocorrencia_longitude), uf: clear(o.ocorrencia_uf)})
  }
});

setTimeout(function() {
  for (var j = 0; j < eventos.length; j++) {
    evento = eventos[j]

    var found = false
    for (var i = 0; i < estados.length; i++) {
      if (estados[i].name === evento.uf) {
        estados[i].counter++
        found = true
        break
      }
    }

    if (!found) {
      estados.push({name: evento.uf, counter: 1})
    }

    found = false
    for (var i = 0; i < cidades.length; i++) {
      if (cidades[i].name === evento.cidade) {
        cidades[i].counter++
        found = true
        break
      }
    }

    if (!found) {
      cidades.push({name: evento.cidade, counter: 1})
    }

  }

  for (var i = 0; i < estados.length; i++) {
    ocorrenciasEstado[estados[i].name] = estados[i].counter
  }

  for (var i = 0; i < cidades.length; i++) {
    ocorrenciasCidade[cidades[i].name] = cidades[i].counter
  }

}, 100);

function handleClick(radio) {
  if (radio.value == "uf") secondVis()
  else if (radio.value == "municipio") firstVis()
  else thirdVis()
}

function firstVis() {
  svg.selectAll("*").remove()

  d3.json('mun.json', function(error, data) {
    var features = data.features;

    svg.selectAll('path')
         .data(features)
         .enter().append('path')
         .attr('d', path)
         .style('fill', function(d) {
           if (ocorrenciasCidade[clear(d.properties.name)]) return color(ocorrenciasCidade[clear(d.properties.name)])
           else return "grey"
         })
  });

  svg.append('rect')
     .attr('x', 10)
     .attr('y', 10)
     .attr('width', 15)
     .attr('height', 10)
     .style('fill', color(0))

   svg.append('rect')
      .attr('x', 10)
      .attr('y', 25)
      .attr('width', 15)
      .attr('height', 10)
      .style('fill', color(185))

  svg.append('rect')
     .attr('x', 10)
     .attr('y', 40)
     .attr('width', 15)
     .attr('height', 10)
     .style('fill', color(370))

   svg.append('rect')
      .attr('x', 10)
      .attr('y', 55)
      .attr('width', 15)
      .attr('height', 10)
      .style('fill', "grey")

  svg.append('text')
     .attr('x', 30)
     .attr('y', 20)
     .text('0 - 123')

  svg.append('text')
     .attr('x', 30)
     .attr('y', 35)
     .text('124 - 246')

  svg.append('text')
     .attr('x', 30)
     .attr('y', 50)
     .text('247 - 370')

  svg.append('text')
     .attr('x', 30)
     .attr('y', 65)
     .text('undefined')
}

function secondVis() {
  svg.selectAll("*").remove()

  d3.json('est.json', function(error, data) {
    var features = data.features;

    svg.selectAll('path')
         .data(features)
         .enter().append('path')
         .attr('d', path)
         .style('fill', function(d) {
           if (ocorrenciasEstado[clear(d.properties.sigla)]) return colorState(ocorrenciasEstado[clear(d.properties.sigla)])
           else return "grey"
         })
  });

  svg.append('rect')
     .attr('x', 10)
     .attr('y', 10)
     .attr('width', 15)
     .attr('height', 10)
     .style('fill', colorState(0))

   svg.append('rect')
      .attr('x', 10)
      .attr('y', 25)
      .attr('width', 15)
      .attr('height', 10)
      .style('fill', colorState(300))

  svg.append('rect')
     .attr('x', 10)
     .attr('y', 40)
     .attr('width', 15)
     .attr('height', 10)
     .style('fill', colorState(1600))

   svg.append('rect')
      .attr('x', 10)
      .attr('y', 55)
      .attr('width', 15)
      .attr('height', 10)
      .style('fill', "grey")

  svg.append('text')
     .attr('x', 30)
     .attr('y', 20)
     .text('0 - 150')

  svg.append('text')
     .attr('x', 30)
     .attr('y', 35)
     .text('151 - 450')

  svg.append('text')
     .attr('x', 30)
     .attr('y', 50)
     .text('451 - 1600')

  svg.append('text')
     .attr('x', 30)
     .attr('y', 65)
     .text('undefined')
}

function thirdVis() {
  svg.selectAll("*").remove()

  d3.json('est.json', function(error, data) {
    var features = data.features;

    svg.selectAll('path')
         .data(features)
         .enter().append('path')
         .attr('d', path)
         .style('fill', '#FFF599')
  });

  setTimeout(function() {
    svg.selectAll('circle')
       .data(eventos)
       .enter().append('circle')
       .attr('cx', function(d) {
         var pt = [d.long, d.lat]
         return projection(pt)[0]
       })
       .attr('cy', function(d) {
         var pt = [d.long, d.lat]
         return projection(pt)[1]
       })
       .attr('r', 1)
       .attr('fill', function(d) {
         if (d.classe == "acidente") return "red"
         else return "blue"
       })
  }, 100)

  svg.append('rect')
     .attr('x', 10)
     .attr('y', 10)
     .attr('width', 15)
     .attr('height', 10)
     .style('fill', "blue")

   svg.append('rect')
      .attr('x', 10)
      .attr('y', 25)
      .attr('width', 15)
      .attr('height', 10)
      .style('fill', "red")

  svg.append('text')
     .attr('x', 30)
     .attr('y', 20)
     .text('INCIDENTE')

  svg.append('text')
     .attr('x', 30)
     .attr('y', 35)
     .text('ACIDENTE')
}

// Utility functions

function clear(str) {
  str = str.toLowerCase()
  var ret = ""

  for(var x = 0; x < str.length; x++) {
    if (str[x] == ' ' || str[x] == "'") continue;
    else if (str[x] == "â" || str[x] == "ã" || str[x] == "à" || str[x] == "á") ret += 'a'
    else if (str[x] == "ê" || str[x] == "ẽ" || str[x] == "è" || str[x] == "é") ret += 'e'
    else if (str[x] == "î" || str[x] == "ĩ" || str[x] == "ì" || str[x] == "í") ret += 'i'
    else if (str[x] == "ô" || str[x] == "õ" || str[x] == "ò" || str[x] == "ó") ret += 'o'
    else if (str[x] == "û" || str[x] == "ũ" || str[x] == "ù" || str[x] == "ú") ret += 'u'
    else if (str[x] == "ç") ret += 'c'
    else ret += str[x]
  }

  return ret
}
