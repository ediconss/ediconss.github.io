var svg;
var data;
var centroids;
var drop_centroid;
var kmeans_init;

var smiley_dat = function() { return smiley(500); };
var unif_dat  = function() { return uniform(250); };
var threenorm_dat = function() { return threenorm(250); };
var pimples_dat = function() { return pimples(500); };
var circles = function() { return circle_pack(500); };
var density = function() { return density_bars(500); };
var dbscan_dat = function() { return dbscan_all(); };
var dbscan_nonunique = function() { return dbscan_borders(); };

var  choicesData= [
    {name: "均匀分布", choice: unif_dat, txtpos_x: -14.0},
    {name: "高斯混合", choice: threenorm_dat, txtpos_x: -4.5},
    {name: "笑脸", choice: smiley_dat, txtpos_x: 6.6},
    {name: "Density Bars", choice: density, txtpos_x: -13.6},
    {name: "Packed Circles", choice: circles, txtpos_x: -3.9},
    {name: "Pimpled Smiley", choice: pimples_dat, txtpos_x: 5.8},
    {name: "密度聚类", choice: dbscan_dat, txtpos_x: -14.0},
    {name: "案例A", choice: dbscan_nonunique, txtpos_x: -3.2}
];

var choicesMethed = [{name: "自己选择", choice: "user", txtpos_x: -13.2},
{name: "随机", choice: "random", txtpos_x: -3.2},
{name: "离中心最远", choice: "farthest", txtpos_x: 6.2}
];
function restart(i1,i2) {
    data = [];
    centroids = [];
    drop_centroid = true;
    kmeans_init = "none";
    setup();
    svg.append("g")
    .attr("class", "own_region")
    .attr("opacity", 0.5);
    kmeans_init = choicesMethed[i1].choice;
    console.log(kmeans_init)
    var cdata = choicesData[i2].choice;
    data=cdata()
     draw(data);
    centroids = get_centroids();
    d3.select("#next_button_p").remove()
    d3.select("#next_button").remove()
}
