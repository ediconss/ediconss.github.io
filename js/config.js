var margin = {top: 20, right: 20, bottom: 30, left: 0},
    width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

y.domain([-10, 10]);
var xlim = 10 * width / height;
x.domain([-xlim, xlim]);

var clr = ["white", "red", "blue", "green", "yellow", "black", "purple", "grey", "brown", "orange", "pink"];
function color(i) {
    if(i == 0) {
        return clr[0];
    }
    else {
        return clr[1 + (i - 1) % (clr.length - 1)];
    }
}

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

function dist(w, z) {
    return Math.sqrt(Math.pow(w.x - z.x, 2) + Math.pow(w.y - z.y, 2));
}

function setup() {

    d3.select("svg").remove();

    svg = d3.select("#svg_area").append("svg")
    .attr("width", "100%")
    .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
    // .attr("viewBox", "600 0 " + 500+ " " + 300)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    // .attr("width", "700px").attr("height", "500px");

    d3.select("#svg_area").select("svg")
    .insert("rect", ":first-child")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", "100%")
  
    .style("fill", "white");

    d3.select("#button_area").selectAll("input").remove();




}

function draw(data) {
    var points = svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 7.5)
      .attr("cx", function(d, i) { return x(30 * Math.cos(i / 5)); })
      .attr("cy", function(d, i) { return y(30 * Math.sin(i / 5)); })
      .style("fill", function(d) { return color(d.cluster); })
      .style("stroke", "black")
      .style("stroke-width", "1px");

    points.transition()
    .duration(500)
    .attr("cx", function(d) { return x(d.x); })
    .attr("cy", function(d) { return y(d.y); });
}
