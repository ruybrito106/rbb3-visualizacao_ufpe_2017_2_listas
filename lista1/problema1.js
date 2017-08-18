var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var svg1 = d3.select("body").append("svg").attr("width", windowWidth).attr("height", windowHeight / 2);
var svg2 = d3.select("body").append("svg").attr("width", windowWidth).attr("height", windowHeight / 2);

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

function getColor(pos, level) {
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
    .attr("fill", getColor(i, level))
  }

// var dataset = [ 10, 20, 75, 5, 45, 90, 25, 0, 20, 10 ];
//
// function color( numero ) {
//   if (numero % 2 == 0) return "green"
//   else return "blue"
// }
//
// d3
// .select("body")
// .select("svg")
// .selectAll("rect")
// .data(dataset)
// .enter()
// .append("rect")
// .attr("x", (d, i) => i * 50)
// .attr("y", d => 200 - d)
// .attr("width", 50)
// .attr("height", d => d)
// .attr("fill", (d, i) => color(i));
