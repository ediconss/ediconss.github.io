// Some global variables
var svg;
var data;
var dbscan_state;
var algo_delay;
var process = null; // For setInterval

function twodecs(x) {
    return parseFloat(Math.round(x*100)/100).toFixed(2);
}

function go() {
    dbscan_state.phase = "inprogress";
    d3.selectAll(".choose_eps_ball").remove()
    //d3.select("#eps_select").remove();
    //d3.select("#minPoints_select").remove();
    
    d3.select("#next_button").remove();

    process = setInterval(function() {
        dbscan_iter(data);
        svg.selectAll(".dot")
        .transition()
        .style("fill", function(d) { return color(d.cluster); });
    }, algo_delay);

    d3.select("#pause").remove()
    var pause=d3.select("#button_area").append("div")
    .attr("id", "pause")
    .attr("name", "pause_button")
    .attr("class", "button").html('暂停')
    .on("click", function() {
        d3.select("#pause").remove();
        clearInterval(process);
        d3.select("#next_button").remove()
     d3.select("#button_area").append("div")
        .attr("id", "next_button")
        .attr("name", "updateButton")
        .attr("class", "button").html('开始')
        .on("click", go);
  
    });
 
}


var smiley_dat = function() { return smiley(500); };
var unif_dat  = function() { return uniform(250); };
var threenorm_dat = function() { return threenorm(250); };
var pimples_dat = function() { return pimples(500); };
var circles = function() { return circle_pack(500); };
var density = function() { return density_bars(500); };
var dbscan_dat = function() { return dbscan_all(); };
var dbscan_nonunique = function() { return dbscan_borders(); };

var  choicesData= [
    {name: "Uniform Points", choice: unif_dat, txtpos_x: -14.0},
    {name: "Gaussian Mixture", choice: threenorm_dat, txtpos_x: -4.5},
    {name: "Smiley Face", choice: smiley_dat, txtpos_x: 6.6},
    {name: "Density Bars", choice: density, txtpos_x: -13.6},
    {name: "Packed Circles", choice: circles, txtpos_x: -3.9},
    {name: "Pimpled Smiley", choice: pimples_dat, txtpos_x: 5.8},
    {name: "DBSCAN Rings", choice: dbscan_dat, txtpos_x: -14.0},
    {name: "Example A", choice: dbscan_nonunique, txtpos_x: -3.2}
];

function changeData(){
    restart($("#dataset").val())
}
function bchangeData(){
    var ss= parseInt($("#dataset").val())+1
    if(ss>7){
     ss=0
    }
 $("#dataset").val(ss)
 changeData()
 }
function restart(i) {
    /* Reset global variables */
    data = [];
    d3.select("#pause").remove()
    dbscan_state = {eps: 1.0, minPoints: 4, cluster: 0, index: 0, neigh: [], phase: "choose"};
    algo_delay = 100;
    clearInterval(process);
    process = null;

    setup();

    svg.append("g")
    .attr("class", "own_region")
    .attr("opacity", 0.5);

    dbscan_state.phase = "postchoose";
    var cdata = choicesData[i].choice;
    data=cdata()
    draw(data);
  
    d3.select("#eps_value").remove()
    d3.select("#button_area2").append("div")
    .attr("id", "eps_value")
    .attr("x", x(-20))
    .attr("y", y(-9.5))
    .text("epsilon:" + twodecs(dbscan_state.eps));

    d3.select("#eps_select").remove()
    d3.select("#button_area2").append("input")
    .attr("id", "eps_select")
    .attr("name", "eps_select")
    .attr("type", "range")
    .attr("min", 0.102920)  // lots of decimals to prevent ties in initial animation... :-(
    .attr("max", 2.0)
    .attr("step", 0.02)
    .attr("value", dbscan_state.eps)
    .style("width", "20%")
    .attr("onchange", "update_eps(parseFloat(this.value));")
    .attr("oninput", "update_eps(parseFloat(this.value));");
    d3.select("#minPoints_value").remove()
    d3.select("#button_area2").append("div")
    .attr("id", "minPoints_value")
    .attr("x", x(-20))
    .attr("y", y(-10.5))
    .text("minPoints:" + dbscan_state.minPoints);

    
   
    d3.select("#minPoints_select").remove()
    d3.select("#button_area2").append("input")
    .attr("id", "minPoints_select")
    .attr("name", "minPoints_select")
    .attr("type", "range")
    .attr("min", 1)
    .attr("max", 6)
    .attr("step", 1)
    .attr("value", dbscan_state.minPoints)
    .style("width", "20%")
    .attr("onchange", "update_minPoints(parseInt(this.value));")
    .attr("oninput", "update_minPoints(parseInt(this.value));");

    d3.select("#next_button").remove()
    d3.select("#button_area").append("div")
    .attr("id", "next_button")
    .attr("name", "updateButton")
    .attr("class", "button").html("开始")
    .on("click", go);

    setTimeout(draw_eps_balls, 500);
 
}
