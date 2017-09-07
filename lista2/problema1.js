const margem = {topo: 20, direita: 20, base: 20, esquerda: 20}
const largura = 500 - margem.esquerda - margem.direita
const altura = 300 - margem.topo - margem.base

var anos = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,
  2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008]

const masculino = [10.74, 13.75, 16.49, 18.04, 19.2, 20.83, 22.66, 23.38, 24.95,
  22.01, 22.75, 22.66, 26.19, 25.54, 24.33, 23.22, 21.93, 22.03, 22.27]

const feminino = [1.96, 2.87, 4.07, 5.1, 5.86, 7.45, 9.32, 11.12, 12.69,
  11.96, 13.05, 13.81, 16.85, 16.55, 15.89, 15.5, 14.48, 13.93, 14.24]

var parseAno = d3.timeParse('%Y')
var parseMesAno = d3.timeParse('%b-%Y')
var formatAno = d3.timeFormat('%b-%Y')

var dadosMasculino = []
var dadosFeminino = []

for (let i = 0; i < anos.length; i++) {
  anos[i] = parseAno(anos[i])

  dadosMasculino.push({incidencia: masculino[i], ano: anos[i]})
  dadosFeminino.push({incidencia: feminino[i], ano: anos[i]})
}

gerarVisualizaco(dadosMasculino, dadosFeminino)

function gerarVisualizaco (dadosMasculino, dadosFeminino) {

  var meuSVG = d3.select('body')
                .append('svg')
                  .attr('height', altura + margem.esquerda + margem.direita)
                  .attr('width', largura + margem.topo + margem.base)
                  .on("mousemove", mousemove)

  var grupo = meuSVG.append('g')
                    .attr('transform', 'translate(' + margem.esquerda +
                          ',' + margem.topo + ')')

  var line = grupo.append("line")
                .style("stroke", "grey")
                .style("stroke-width", 4)
                .attr("y1", altura)
                .attr("x1", 0)
                .attr("x2", 0)
                .attr("y2", 0);

  var texto = grupo.append('text')
                .attr('x', margem.esquerda)
                .attr('y', margem.topo)

  var maleMarker = grupo.append('circle')
  var femaleMarker = grupo.append('circle')

  var incidenciaEscala = d3.scaleLinear()
                          .domain([30, 0])
                          .range([0, altura])

  var tempoEscala = d3.scaleTime()
                      .domain(d3.extent(anos))
                      .range([0, largura])

  var geradorLinha = d3.line()
                .x(function (d) { return tempoEscala(d.ano) })
                .y(function (d) { return incidenciaEscala(d.incidencia) })

  grupo.append('path')
      .attr('class', 'masculino')
      .attr('d', geradorLinha(dadosMasculino))
      .attr('fill', 'none')
      .attr('stroke', 'blue')

  grupo.append('path')
      .attr('class', 'feminino')
      .attr('d', geradorLinha(dadosFeminino))
      .attr('fill', 'none')
      .attr('stroke', 'red')

  var grupoEixoBase = grupo.append('g')
                        .attr('class', 'eixoBase')
                        .attr('transform', 'translate(0,' + (altura) + ')')

  var grupoEixoEsquerda = grupo.append('g')
                        .attr('class', 'eixoEsquerda')

  var grupoEixoTopo = grupo.append('g')
                        .attr('class', 'eixoTopo')

  var grupoEixoDireita = grupo.append('g')
                        .attr('class', 'eixoDireita')
                        .attr('transform', 'translate(' + largura + ', 0)')

  var eixoBase = d3.axisBottom(tempoEscala)
                .tickFormat(d3.timeFormat('%Y'))
                .tickSize(-5)
                .tickPadding(8)

  var eixoEsquerda = d3.axisLeft(incidenciaEscala)
                .ticks(7)
                .tickSize(-5)
                .tickPadding(5)

  var eixoTopo = d3.axisTop(tempoEscala)
                .tickFormat('')
                .tickSize(-5)

  var eixoDireita = d3.axisRight(incidenciaEscala)
                .tickFormat('')
                .ticks(7)
                .tickSize(-5)

  grupoEixoBase.call(eixoBase)
  grupoEixoEsquerda.call(eixoEsquerda)
  grupoEixoTopo.call(eixoTopo)
  grupoEixoDireita.call(eixoDireita)

  function mousemove() {
    var m = d3.mouse(this)
    var pos = Math.max(0, Math.min(m[0] - 20, largura))

    line.attr("x1", pos).attr("x2", pos)

    var mesAnos = d3.timeMonth.range(new Date(1990, 0, 0), new Date(2008, 0, 0))
    var y = mesAnos[Math.round(pos * mesAnos.length / largura)]
    texto.attr("x", getXPosition(pos)).attr("y", 30).text(formatAno(y))

    maleMarker.attr("r", 4)
              .attr("cx", pos)
              .attr("cy", getMaleCircleYPosition(pos))
              .style("fill", "blue")
              .style("stroke", "grey")
              .style("stroke-width", 1)

    femaleMarker.attr("r", 4)
                .attr("cx", pos)
                .attr("cy", getFemaleCircleYPosition(pos))
                .style("fill", "red")
                .style("stroke", "grey")
                .style("stroke-width", 1)
  }

  function getXPosition(value) {
    if (2 * value < largura) return value + 5
    else return value - 70
  }

  function getYPosition(value) {
    return altura - ((value * altura) / 30)
  }

  function getMaleCircleYPosition(value) {
    if ((Math.round(value) * 18) % 460 == 0) {
      return getYPosition(masculino[Math.round(value) * 18 / 460])
    } else {
      var XprevI = Math.floor(value * 18 / 460)
      var Xprev = XprevI * 460 / 18
      var XnxtI = XprevI + 1
      var Xnxt = XnxtI * 460 / 18
      var Yprev = getYPosition(masculino[XprevI])
      var Ynxt = getYPosition(masculino[XnxtI])

      return Yprev + ((value - Xprev) * (Ynxt - Yprev)) / (Xnxt - Xprev)
    }
  }

  function getFemaleCircleYPosition(value) {
    if ((Math.round(value) * 18) % 460 == 0) {
      return getYPosition(feminino[Math.round(value) * 18 / 460])
    } else {
      var XprevI = Math.floor(value * 18 / 460)
      var Xprev = XprevI * 460 / 18
      var XnxtI = XprevI + 1
      var Xnxt = XnxtI * 460 / 18
      var Yprev = getYPosition(feminino[XprevI])
      var Ynxt = getYPosition(feminino[XnxtI])

      return Yprev + ((value - Xprev) * (Ynxt - Yprev)) / (Xnxt - Xprev)
    }
  }

}
