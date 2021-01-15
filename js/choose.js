
function make_slider(x1, y1, y2, onClick) {
    var slider = svg.append("g")
    .attr("class", "slider");

    slider.append("line")
    .attr("x1", x(x1))
    .attr("y1", y(y1))
    .attr("x2", x(x1))
    .attr("y2", y(y2))
    .style("stroke", "#555555")
    .style("stroke-width", "8px");

    var mover = slider.append("rect")
    .attr("x", x(x1 - 1))
    .attr("y", y((y1 + y2) / 2))
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("width", x(2) - x(0))
    .attr("height", -(y(1) - y(0)))
    .style("fill", "black")
    .style("cursor", "pointer")
    .on("click", onClick);

    return slider;
}
