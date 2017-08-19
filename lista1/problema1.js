var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var svg1 = d3.select("body").select("div").append("svg").attr("width", windowWidth).attr("height", 350);

var text = svg1
.append("text")
.attr("x", (windowWidth / 2) - 10)
.attr("y", 300)
.attr("stroke", "#000000")
.attr("font-size", "25")
.text("279")

function getPoint(pos, level) {
  var circles = 18 + 3 * level - 1
  var radians = -2 * (Math.PI * pos) / (2 * circles)
  var cos = Math.cos(radians), sin = Math.sin(radians)
  var x = windowWidth / 2 - 105 - (17 * level), y = 300
  var cx = windowWidth / 2, cy = 300
  var X = (cos * (x - cx)) + (sin * (y - cy)) + cx;
  var Y = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [X, Y];
}

function getPointsColor(pos, level) {
  var circles = 18 + 3 * level
  if (pos == 18 + 3 * level - 1 && level >= 6) return "black"
  else if (pos == 0 && level <= 2) return "#F4A460"
  else if ((pos - level == 6 && level <= 7) || (pos - level == 5 && level > 8)) return "#A9A9A9"
  else if ((pos - level == 6 && level > 7) || pos - level == 7 || (pos - level == 8) && level <= 4) return "#4682B4"
  else if (pos == 13 && level == 8) return "#FF8C00"
  else if (pos - level < 6) return "#FFD700"
  else return "red"
}

for (var level = 1; level <= 9; level += 1)
  for (var i = 0; i < 18 + 3 * level; i++) {
    svg1
    .append("circle")
    .attr("cx", getPoint(i, level)[0])
    .attr("cy", getPoint(i, level)[1])
    .attr("r", 7)
    .attr("fill", getPointsColor(i, level))
  }

var svg2 = d3.select("body").select("div").append("svg").attr("width", windowWidth).attr("height", 300);

var gradient = svg2.append("defs")
  .append("linearGradient")
  .attr("id", "grad")
  .attr("x1", "10%")
  .attr("x2", "0%")
  .attr("y1", "100%")
  .attr("y2", "0%");

gradient.append("stop")
  .attr("offset", "50%")
  .style("stop-color", "#4B0082");

gradient.append("stop")
  .attr("offset", "50%")
  .style("stop-color", "#B22222");

svg2.append("circle")
  .attr("cx", windowWidth / 2)
  .attr("cy", 150)
  .attr("r", 100)
  .attr("fill", "url(#grad)");

svg2.append("circle")
  .attr("cx", (windowWidth / 2) - 50)
  .attr("cy", 150)
  .attr("r", 51)
  .attr("fill", "#B22222")

svg2.append("circle")
  .attr("cx", (windowWidth / 2) + 50)
  .attr("cy", 150)
  .attr("r", 50)
  .attr("fill", "#4B0082")

svg2.append("rect")
  .attr("x", (windowWidth / 2) - 30)
  .attr("y", 150)
  .attr("width", 60)
  .attr("height", 10)
  .attr("transform", 'translate(-447, 0)rotate(0)');
