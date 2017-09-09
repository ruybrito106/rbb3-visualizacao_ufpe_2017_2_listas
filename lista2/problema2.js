const lado = 200;
const margemGeral = 10;
const dimensoes = 6;
const colorSchema = ['#fee8c8', '#fdbb84', '#e34a33'];

var escalaHorizontal = d3.scale.linear().range([margemGeral, lado - margemGeral]);
var eixoHorizontal = d3.svg.axis().scale(escalaHorizontal).orient("bottom").ticks(6);

var escalaVertical = d3.scale.linear().range([lado - margemGeral, margemGeral]);
var eixoVertical = d3.svg.axis().scale(escalaVertical).orient("left").ticks(6);

d3.csv("cars.csv", function(error, data) {
  if (error) {
    throw "Impossible to parse file due to " + error;
  }

  var dominios = {};
  var atributos = d3.keys(data[0]).filter(function(d) {
    return d !== "name" && d !== "cylinders";
  });

  for (var i = 0; i < atributos.length; i++) {
    dominios[atributos[i]] = d3.extent(data, function(d) {
      return d[atributos[i]];
    });
  }

  var svg = d3.select("body")
                .append("svg")
                .attr("width", lado * dimensoes + margemGeral)
                .attr("height", lado * dimensoes + margemGeral)
                  .append("g")
                  .attr("transform", "translate(" + margemGeral + "," + margemGeral / 2 + ")");

  eixoHorizontal.tickSize(lado * dimensoes);
  eixoVertical.tickSize(-lado * dimensoes);

  svg.selectAll(".x.axis")
     .data(atributos)
     .enter()
      .append("g")
      .attr("class", "x axis")
      .attr("transform", function(d, i) {
        return "translate(" + (dimensoes - i - 1) * lado + ",0)";
      })
      .each(function(d) {
        escalaHorizontal.domain(dominios[d]);
        d3.select(this).call(eixoHorizontal);
      });

  svg.selectAll(".y.axis")
      .data(atributos)
      .enter()
        .append("g")
        .attr("class", "y axis")
        .attr("transform", function(d, i) {
          return "translate(0," + i * lado + ")";
        })
        .each(function(d) {
          escalaVertical.domain(dominios[d]);
          d3.select(this).call(eixoVertical);
        });

  var grafico = svg.selectAll(".grafico")
                   .data(mapear(atributos, true))
                   .enter()
                     .append("g")
                     .attr("class", "grafico")
                     .attr("transform", function(d) {
                       return "translate(" + (dimensoes - d.i - 1) * lado + "," + d.j * lado + ")";
                     })
                     .each(plot);

  var brushGrafico;
  var brush = d3.svg.brush()
      .x(escalaHorizontal)
      .y(escalaVertical)
      .on("brushstart", start)
      .on("brush", move)
      .on("brushend", end);

  grafico.call(brush);

  var graficoDiagonal = svg.selectAll(".graficoDiagonal")
                           .data(mapear(atributos, false))
                           .enter()
                             .append("g")
                             .attr("class", "graficoDiagonal")
                             .attr("transform", function(d) {
                               return "translate(" + (dimensoes - d.i - 1) * lado + "," + d.j * lado + ")";
                             })

  graficoDiagonal.append("text")
      .attr("x", ((lado - margemGeral) / 2) - 30)
      .attr("y", (lado - margemGeral) / 2)
      .style("font-size", "20")
      .style("font-weight", "bold")
      .text(function(d) {
        return formataTexto(d.x);
      });

  function plot(p) {
    var grafico = d3.select(this);

    escalaHorizontal.domain(dominios[p.x]);
    escalaVertical.domain(dominios[p.y]);

    grafico.append("rect")
        .attr("class", "grafico")
        .attr("x", margemGeral / 2)
        .attr("y", margemGeral / 2)
        .attr("width", lado - margemGeral)
        .attr("height", lado - margemGeral);

    grafico.selectAll("circle")
        .data(data)
      .enter().append("circle")
        .attr("cx", function(d) { return escalaHorizontal(d[p.x]); })
        .attr("cy", function(d) { return escalaVertical(d[p.y]); })
        .attr("r", 5)
        .style("fill", function(d) { return getColor(d.cylinders) });
  }

  function start(p) {
    if (brushGrafico === this) return;

    d3.select(brushGrafico).call(brush.clear());
    escalaHorizontal.domain(dominios[p.x]);
    escalaVertical.domain(dominios[p.y]);
    brushGrafico = this;

  }

  function move(p) {
    var e = brush.extent();

    svg.selectAll("circle").classed("hidden", function(d) {
      return verificaCirculos(d, e, p);
    });
  }

  function end() {
    if (brush.empty())
      svg.selectAll(".hidden")
         .classed("hidden", false);
  }
});

// Funções utilitárias

function formataTexto(text) {
  if (text[0] == '0') return "         Mph"
  else if (text[0] == 'w') return "      Weight"
  else if (text[0] == 'p') return "       Power"
  else if (text[0] == 'd') return "Displacement"
  else if (text[0] == 'e') return "     Economy"
  else return "        Year"
}

function mapear(a, type) {
  var graficos = []
  var tam = a.length
  for (var i = 0; i < tam; ++i) {
    for (var j = 0; j < tam; ++j) {
      if ((type && i == j) || (!type && i != j)) continue;
      graficos.push({
        x: a[i],
        y: a[j],
        i: i,
        j: j
      });
    }
  }
  return graficos;
}

function verificaCirculos(a, b, c) {
  if (b[0][0] > a[c.x] || a[c.x] > b[1][0]) return true;
  else if (b[0][1] > a[c.y] || a[c.y] > b[1][1]) return true;
  return false;
}

function getColor(title) {
  if (title == 4) return colorSchema[0]
  else if (title == 6) return colorSchema[1]
  else return colorSchema[2]
}
