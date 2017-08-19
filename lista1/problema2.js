var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var margin = [100, 50]
var w = 800 - 2 * margin[0], h = 600 - 2 * margin[1]

var x = d3.scale.linear().range([0, w]);
var y = d3.scale.linear().range([h, 0]);

var bottomAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  .ticks(9);
var leftAxis = d3.svg.axis().scale(y).orient("left").ticks(5);
var topAxis = d3.svg.axis().scale(x).orient("top").ticks(0);
var rightAxis = d3.svg.axis().scale(y).orient("right").ticks(0);

function xPlot(d) { return x(d.year); }
function yPlot(d) { return y(d.value); }

var points = d3.svg.line().x(xPlot).y(yPlot);

var svg = d3.select("body")
  .append("svg")
  .attr("width", w + 2 * margin[0])
  .attr("height", h + 2 * margin[1])
  .append("g")
  .attr("transform", "translate(" + margin[0] + "," + margin[1] + ")");

d3.csv("/lista1/aids_male.csv", function(error, data) {
  console.log(data)

  x.domain([1990, 2008]);
  y.domain([0, 30])

  svg.append("path")
    .attr("class", "line1")
    .attr("d", points(data));

  svg.append("g")
    .attr("width", "2px")
    .attr("transform", "translate(0," + (h - 6) + ")")
    .call(bottomAxis);

  svg.append("g")
    .attr("width", "2px")
    .attr("transform", "translate(" + (w - 6) + ",0)")
    .call(rightAxis);

  svg.append("g")
    .attr("width", "2px")
    .call(leftAxis);

  svg.append("g")
    .attr("width", "2px")
    .call(topAxis);

});

d3.csv("/lista1/aids_female.csv", function(error, data) {
  svg.append("path")
    .attr("class", "line2")
    .attr("d", points(data));
});
