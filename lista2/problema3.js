const margem = {vertical: 30, horizontal: 40}
const largura = 900
const altura = 450
const alturaGrafico = 150
const larguraGrafico = 300

var anos = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,
  2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009]

const maranhao = [0.6,1.1,0.9,1.1,0.9,1.2,1.3,0.9,1.3,1.3,1.6,2.1,2.2,2.7,2.4,3.4,2.9,3.9,3.9,4.8]
const piaui = [0.4,0.3,0.7,0.4,1.1,1.2,1.3,1.4,1.1,0.9,1.5,1.6,1.8,1.8,2.1,1.8,2.6,2.5,2.7,3.6]
const rgn = [0.5,0.7,1,2.4,3,3.7,2.6,1.4,0.9,1.1,1.4,1.7,1.4,1.7,1.2,1.3,1.3,1.3,2.5,2.8]
const pernambuco = [1.5,1.6,2.4,2.9,4.5,5.1,5.5,4,4.6,4.1,4.3,4.6,4.9,4.6,4.6,4.8,5.3,5,5,5.9]
const paraiba = [0.8,1.3,1,1.3,2.5,2.3,1.7,1.2,1.5,1.4,1.5,2,1.9,2.7,2.6,2.4,2.7,2.6,2.8,2.6]
const sergipe = [0.2,0.4,0.8,1.7,2,3.1,2.2,1.8,1.2,2.2,2.4,2,2,1.5,2.8,2.7,2,2.9,3.4,3.8]
const ceara = [0.6,0.9,1.2,1.8,2.1,2.5,2.8,2.3,1.6,1.9,2.3,2,2.7,2.6,2.6,2.5,2.8,3,3.3,3.4]
const bahia = [0.7,1.2,1.4,1.4,1.9,2,2.4,2.3,2.2,2.4,2.5,2.7,2.7,2.8,2.6,2.8,3.1,3.4,3.5,3.5]
const alagoas = [0.4,0.7,0.4,1.2,1.2,1.5,1.7,1.7,1,0.9,1.5,2.2,2.1,2.1,1.6,2,1.8,2.3,2.5,3.1]

var parseAno = d3.timeParse('%Y')

var dadosMA = []
var dadosPE = []
var dadosPB = []
var dadosPI = []
var dadosCE = []
var dadosBA = []
var dadosAL = []
var dadosRN = []
var dadosSE = []

for (var i = 0; i < 30; i++) {
  anos[i] = parseAno(anos[i]);

  dadosMA.push({incidencia: maranhao[i], ano: anos[i]});
  dadosPE.push({incidencia: pernambuco[i], ano: anos[i]});
  dadosPB.push({incidencia: paraiba[i], ano: anos[i]});
  dadosPI.push({incidencia: piaui[i], ano: anos[i]});
  dadosCE.push({incidencia: ceara[i], ano: anos[i]});
  dadosBA.push({incidencia: bahia[i], ano: anos[i]});
  dadosAL.push({incidencia: alagoas[i], ano: anos[i]});
  dadosRN.push({incidencia: rgn[i], ano: anos[i]});
  dadosSE.push({incidencia: sergipe[i], ano: anos[i]});
}

var MA_SVG = d3.select('body').append('svg').attr('height', alturaGrafico + margem.horizontal).attr('width', larguraGrafico + margem.vertical).call(d3.zoom().on("zoom", zoomed))
var PE_SVG = d3.select('body').append('svg').attr('height', alturaGrafico + margem.horizontal).attr('width', larguraGrafico + margem.vertical).call(d3.zoom().on("zoom", zoomed))
var PB_SVG = d3.select('body').append('svg').attr('height', alturaGrafico + margem.horizontal).attr('width', larguraGrafico + margem.vertical).call(d3.zoom().on("zoom", zoomed))
var PI_SVG = d3.select('body').append('svg').attr('height', alturaGrafico + margem.horizontal).attr('width', larguraGrafico + margem.vertical).call(d3.zoom().on("zoom", zoomed))
var CE_SVG = d3.select('body').append('svg').attr('height', alturaGrafico + margem.horizontal).attr('width', larguraGrafico + margem.vertical).call(d3.zoom().on("zoom", zoomed))
var BA_SVG = d3.select('body').append('svg').attr('height', alturaGrafico + margem.horizontal).attr('width', larguraGrafico + margem.vertical).call(d3.zoom().on("zoom", zoomed))
var AL_SVG = d3.select('body').append('svg').attr('height', alturaGrafico + margem.horizontal).attr('width', larguraGrafico + margem.vertical).call(d3.zoom().on("zoom", zoomed))
var RN_SVG = d3.select('body').append('svg').attr('height', alturaGrafico + margem.horizontal).attr('width', larguraGrafico + margem.vertical).call(d3.zoom().on("zoom", zoomed))
var SE_SVG = d3.select('body').append('svg').attr('height', alturaGrafico + margem.horizontal).attr('width', larguraGrafico + margem.vertical).call(d3.zoom().on("zoom", zoomed))

var grupoMA = MA_SVG.append('g').attr('class', 'grupo').attr('transform', 'translate(' + margem.vertical/2 + ',' + margem.horizontal/2 + ')')
var grupoPE = PE_SVG.append('g').attr('class', 'grupo').attr('transform', 'translate(' + margem.vertical/2 + ',' + margem.horizontal/2 + ')')
var grupoPB = PB_SVG.append('g').attr('class', 'grupo').attr('transform', 'translate(' + margem.vertical/2 + ',' + margem.horizontal/2 + ')')
var grupoPI = PI_SVG.append('g').attr('class', 'grupo').attr('transform', 'translate(' + margem.vertical/2 + ',' + margem.horizontal/2 + ')')
var grupoCE = CE_SVG.append('g').attr('class', 'grupo').attr('transform', 'translate(' + margem.vertical/2 + ',' + margem.horizontal/2 + ')')
var grupoBA = BA_SVG.append('g').attr('class', 'grupo').attr('transform', 'translate(' + margem.vertical/2 + ',' + margem.horizontal/2 + ')')
var grupoAL = AL_SVG.append('g').attr('class', 'grupo').attr('transform', 'translate(' + margem.vertical/2 + ',' + margem.horizontal/2 + ')')
var grupoRN = RN_SVG.append('g').attr('class', 'grupo').attr('transform', 'translate(' + margem.vertical/2 + ',' + margem.horizontal/2 + ')')
var grupoSE = SE_SVG.append('g').attr('class', 'grupo').attr('transform', 'translate(' + margem.vertical/2 + ',' + margem.horizontal/2 + ')')

zoom_ma = gerarVisualizacao(MA_SVG, grupoMA, dadosMA, "Maranhão")
zoom_pe = gerarVisualizacao(PE_SVG, grupoPE, dadosPE, "Pernambuco")
zoom_pb = gerarVisualizacao(PB_SVG, grupoPB, dadosPB, "Paraíba")
zoom_pi = gerarVisualizacao(PI_SVG, grupoPI, dadosPI, "Piauí")
zoom_ce = gerarVisualizacao(CE_SVG, grupoCE, dadosCE, "Ceará")
zoom_ba = gerarVisualizacao(BA_SVG, grupoBA, dadosBA, "Bahia")
zoom_al = gerarVisualizacao(AL_SVG, grupoAL, dadosAL, "Alagoas")
zoom_rn = gerarVisualizacao(RN_SVG, grupoRN, dadosRN, "Rio Grande do Norte")
zoom_se = gerarVisualizacao(SE_SVG, grupoSE, dadosSE, "Sergipe")

function gerarVisualizacao(svg, grupo, dados, title) {
  svg.call(d3.zoom().on("zoom", zoomed))

  var incidenciaEscala = d3.scaleLinear().domain([6, 0]).range([0, alturaGrafico])
  var tempoEscala = d3.scaleTime().domain(d3.extent(anos)).range([0, larguraGrafico])

  var geradorLinha = d3.line()
                .x(function (d) { return tempoEscala(d.ano) })
                .y(function (d) { return incidenciaEscala(d.incidencia) })

  grupo.append('text')
       .attr('y', "-3")
       .style('font-weight', 'bold')
       .text(title)

  grupo.append('path')
      .style('stroke-width', 2)
      .attr('class', 'estado')
      .attr('d', geradorLinha(dados))
      .attr('fill', 'none')
      .attr('stroke', 'red')

  var grupoEixoBase = grupo.append('g')
                        .attr('class', 'eixoBase')
                        .attr('transform', 'translate(0,' + (alturaGrafico) + ')')

  var grupoEixoEsquerda = grupo.append('g')
                        .attr('class', 'eixoEsquerda')

  var grupoEixoTopo = grupo.append('g')
                        .attr('class', 'eixoTopo')

  var grupoEixoDireita = grupo.append('g')
                        .attr('class', 'eixoDireita')
                        .attr('transform', 'translate(' +(larguraGrafico) + ', 0)')

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

  return function() {
    grupo.select("path").attr("transform", d3.event.transform)
    grupoEixoBase.call(eixoBase.scale(d3.event.transform.rescaleX(tempoEscala)))
    grupoEixoTopo.call(eixoTopo.scale(d3.event.transform.rescaleX(tempoEscala)))
    grupoEixoEsquerda.call(eixoEsquerda.scale(d3.event.transform.rescaleY(incidenciaEscala)))
    grupoEixoDireita.call(eixoDireita.scale(d3.event.transform.rescaleY(incidenciaEscala)))
  }
}

function zoomed() {
  zoom_ma()
  zoom_pe()
  zoom_pb()
  zoom_pi()
  zoom_ce()
  zoom_ba()
  zoom_al()
  zoom_rn()
  zoom_se()
}
