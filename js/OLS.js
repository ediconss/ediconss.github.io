
var tipMark;
var svg_ols;
var img;
var cut;
function showMark(text,i){
  tipMark.attr('class','show')
  if(text=='最小二乘回归线'){
    d3.select("#svg_ols").select('img').remove()
   img= d3.select("#svg_ols").append('img').attr('src','data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMy40NDZleCIgaGVpZ2h0PSIyLjc0ZXgiIHZpZXdCb3g9IjAgLTEwMDYgNTk0My4xIDEyMTEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgc3R5bGU9InZlcnRpY2FsLWFsaWduOi0uNDY0ZXgiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJNMjEgMjg3cTAgMTQgMTUgNDh0NDggNzEgNzQgMzZxNDEgMCA2Ni0yM3QyNi02NHEtMi0xOS0zLTIxIDAtMy0xNi00NnQtMzMtOTctMTYtODZxMC00MyAxNC02MHQ0Mi0xOHEyMyAwIDQzIDExdDMxIDIzIDI3IDMzcTAgMSA1IDIwdDE0IDU5IDE5IDc0cTM4IDE1MCA0MiAxNTcgMTMgMjcgNDMgMjcgMTMgMCAyMS03dDExLTEyIDItOXEwLTEzLTQ5LTIxMFQzOTEtMjNxLTI4LTgzLTk3LTEzMnQtMTM4LTUwcS00NSAwLTc5IDIydC0zNCA2NnEwIDIyIDcgMzd0MTkgMjIgMjAgMTAgMTcgM3E0NCAwIDQ0LTQyIDAtMjAtMTItMzV0LTIzLTIwLTEzLTVsLTMtMXEyLTUgMTktMTJ0MzQtN2g4cTE3IDAgMjYgMiAzMyA5IDYxIDM4dDQzIDYyIDIzIDU2IDggMzBsLTYtNHEtNi00LTE5LTExVDI3MC02cS0yMC01LTM5LTUtNDYgMC04MSAyMnQtNDYgNzFxLTEgNy0xIDMxIDAgNTcgMzUgMTQ5dDM1IDExN3YxNHEwIDMtNCA3dC0xMSA0aC00cS0yMyAwLTQyLTE5dC0zMC00MS0xNy00Mi04LTIycS0yLTItMTYtMkgyN3EtNiA2LTYgOXoiLz48cGF0aCBpZD0iYiIgZD0iTTU2IDM0N3EwIDEzIDE0IDIwaDYzN3ExNS04IDE1LTIwIDAtMTEtMTQtMTlsLTMxOC0xSDcycS0xNiA1LTE2IDIwem0wLTE5NHEwIDE1IDE2IDIwaDYzNnExNC0xMCAxNC0yMCAwLTEzLTE1LTIwSDcwcS0xNCA3LTE0IDIweiIvPjxwYXRoIGlkPSJjIiBkPSJNMjMxIDYzN3EtMjcgMC0zMiAxdC01IDExcTAgMjcgMTEgMzMgMSAxIDEzMCAxIDI1OSAwIDI3My0yIDYzLTEwIDEwNS00NXQ0My05MnEwLTY0LTU4LTExNXQtMTMzLTY5bC0xMC0zcTY0LTkgMTA1LTQ2dDQyLTkycTAtNzMtNzItMTQxVDQ1MyAxcS03LTEtMjExLTFRNDIgMCAzOSAycS00IDMtNCA4IDAgNyAyIDE0IDUgMTkgMTAgMjEgNCAxIDE1IDFoNnEyNyAwIDYwIDMgMTQgMyAxOSAxMiAzIDQgNzIgMjc4dDY5IDI4OXEwIDctNTcgOXptNDE4LTkzcTAgMzAtMTUgNTZ0LTQ5IDM0cS03IDItOTIgM2gtNDJxLTIyIDAtMzUtMWgtMTNxLTE1LTEtMTktMTAtMi00LTMyLTEyMCAwLTMtMS02bC0zMS0xMjZoODFxODEgMCA5MyAyIDYwIDEwIDEwNyA1OHQ0OCAxMTB6bS01NC0zMTVxMCA0NC0yMyA3M3QtNjAgMzRxLTYgMS04MyAxLTExOCAwLTExOS0xIDAtMi0xNy03M3QtMzUtMTQxbC0xOC03MHEwLTQgMTItNHQ4MS0ycTg5IDAgOTYgMSA2MiA3IDExNCA1OHQ1MiAxMjR6Ii8+PHBhdGggaWQ9ImQiIGQ9Ik05NiA1ODVxNTYgODEgMTUzIDgxIDQ4IDAgOTYtMjZ0NzgtOTJxMzctODMgMzctMjI4IDAtMTU1LTQzLTIzNy0yMC00Mi01NS02N3QtNjEtMzEtNTEtN3EtMjYgMC01MiA2dC02MSAzMi01NSA2N3EtNDMgODItNDMgMjM3IDAgMTc0IDU3IDI2NXptMjI1IDEycS0zMCAzMi03MSAzMi00MiAwLTcyLTMyLTI1LTI2LTMzLTcydC04LTE5MnEwLTE1OCA4LTIwOHQzNi03OXEyOC0zMCA2OS0zMCA0MCAwIDY4IDMwIDI5IDMwIDM2IDg0dDggMjAzcTAgMTQ1LTggMTkxdC0zMyA3M3oiLz48cGF0aCBpZD0iZSIgZD0iTTExMiA1NjBsMTM3IDEzNCA4LThxMTMwLTEyNCAxMzAtMTI2bC0yNi0yOXEtMiAxLTU4IDUwbC01MyA0Ni01NS00N3EtMTMtMTEtMjYtMjN0LTIxLTE5bC04LTZxLTItMi0xNSAxNGwtMTMgMTR6Ii8+PHBhdGggaWQ9ImYiIGQ9Ik01NiAyMzd2MTNsMTQgMjBoMjk5djE1MGwxIDE1MHExMCAxMyAxOSAxMyAxMyAwIDIwLTE1VjI3MGgyOThxMTUtOCAxNS0yMHQtMTUtMjBINDA5Vi02OHEtOC0xNC0xOC0xNGgtNHEtMTIgMC0xOCAxNHYyOThINzBxLTE0IDctMTQgMjB6Ii8+PHBhdGggaWQ9ImciIGQ9Ik0yMTMgNTc4bC0xMy01cS0xNC01LTQwLTEwdC01OC03SDgzdjQ2aDE5cTQ3IDIgODcgMTV0NTYgMjQgMjggMjJxMiAzIDEyIDMgOSAwIDE3LTZWMzYxbDEtMzAwcTctNyAxMi05dDI0LTQgNjItMmgyNlYwaC0xMXEtMjEgMy0xNTkgMy0xMzYgMC0xNTctM0g4OHY0Nmg2NHExNiAwIDI1IDF0MTYgMyA4IDIgNiA1IDYgNHY1MTd6Ii8+PHBhdGggaWQ9ImgiIGQ9Ik01MiAyODlxNyA0MiA1NCA5N3QxMTYgNTZxMzUgMCA2NC0xOHQ0My00NXE0MiA2MyAxMDEgNjMgMzcgMCA2NC0yMnQyOC01OXEwLTI5LTE0LTQ3dC0yNy0yMi0yMy00cS0xOSAwLTMxIDExdC0xMiAyOXEwIDQ2IDUwIDYzLTExIDEzLTQwIDEzLTEzIDAtMTktMi0zOC0xNi01Ni02Ni02MC0yMjEtNjAtMjU4IDAtMjggMTYtNDB0MzUtMTJxMzcgMCA3MyAzM3Q0OSA4MXEzIDEwIDYgMTF0MTYgMmg0cTE1IDAgMTUtOCAwLTEtMi0xMS0xNi01Ny02Mi0xMDFUMzMzLTExcS03MCAwLTEwNiA2My00MS02Mi05NC02MmgtNnEtNDkgMC03MCAyNlQzNSA3MXEwIDMyIDE5IDUydDQ1IDIwcTQzIDAgNDMtNDIgMC0yMC0xMi0zNXQtMjMtMjAtMTMtNWwtMy0xcTAtMSA2LTR0MTYtNyAxOS0zcTM2IDAgNjIgNDUgOSAxNiAyMyA2OHQyOCAxMDggMTYgNjZxNSAyNyA1IDM5IDAgMjgtMTUgNDB0LTM0IDEycS00MCAwLTc1LTMydC00OS04MnEtMi05LTUtMTB0LTE2LTJINThxLTYgNi02IDExeiIvPjwvZGVmcz48ZyBkYXRhLW1tbC1ub2RlPSJtYXRoIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgZmlsbD0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjAiPjx1c2UgeGxpbms6aHJlZj0iI2EiIGRhdGEtbW1sLW5vZGU9Im1pIiB0cmFuc2Zvcm09InNjYWxlKDEgLTEpIi8+PHVzZSB4bGluazpocmVmPSIjYiIgZGF0YS1tbWwtbm9kZT0ibW8iIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDc2Ny44IDApIi8+PGcgZGF0YS1tbWwtbm9kZT0iVGVYQXRvbSI+PGcgZGF0YS1tbWwtbm9kZT0ibW92ZXIiIGRhdGEtbWp4LXRleGNsYXNzPSJPUkQiPjxnIGRhdGEtbW1sLW5vZGU9Im1zdWIiPjx1c2UgeGxpbms6aHJlZj0iI2MiIGRhdGEtbW1sLW5vZGU9Im1pIiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAxODIzLjYgMCkiLz48ZyBkYXRhLW1tbC1ub2RlPSJUZVhBdG9tIj48dXNlIHhsaW5rOmhyZWY9IiNkIiBkYXRhLW1tbC1ub2RlPSJtbiIgdHJhbnNmb3JtPSJtYXRyaXgoLjcwNyAwIDAgLS43MDcgMjU4Mi42IDE1MCkiIGRhdGEtbWp4LXRleGNsYXNzPSJPUkQiLz48L2c+PC9nPjx1c2UgeGxpbms6aHJlZj0iI2UiIGRhdGEtbW1sLW5vZGU9Im1vIiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAyMjM4LjIgLTIxMikiLz48L2c+PC9nPjx1c2UgeGxpbms6aHJlZj0iI2YiIGRhdGEtbW1sLW5vZGU9Im1vIiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAzMjA4LjMgMCkiLz48ZyBkYXRhLW1tbC1ub2RlPSJUZVhBdG9tIj48ZyBkYXRhLW1tbC1ub2RlPSJtb3ZlciIgZGF0YS1tangtdGV4Y2xhc3M9Ik9SRCI+PGcgZGF0YS1tbWwtbm9kZT0ibXN1YiI+PHVzZSB4bGluazpocmVmPSIjYyIgZGF0YS1tbWwtbm9kZT0ibWkiIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDQyMDguNiAwKSIvPjxnIGRhdGEtbW1sLW5vZGU9IlRlWEF0b20iPjx1c2UgeGxpbms6aHJlZj0iI2ciIGRhdGEtbW1sLW5vZGU9Im1uIiB0cmFuc2Zvcm09Im1hdHJpeCguNzA3IDAgMCAtLjcwNyA0OTY3LjYgMTUwKSIgZGF0YS1tangtdGV4Y2xhc3M9Ik9SRCIvPjwvZz48L2c+PHVzZSB4bGluazpocmVmPSIjZSIgZGF0YS1tbWwtbm9kZT0ibW8iIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDQ2MjMuMiAtMjEyKSIvPjwvZz48L2c+PHVzZSB4bGluazpocmVmPSIjaCIgZGF0YS1tbWwtbm9kZT0ibWkiIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDUzNzEuMSAwKSIvPjwvZz48L3N2Zz4=')
   img.attr('class','mathi')
    }
  tipMark.html(text)
  d3.select('#asource').attr('src','../images/'+i+'.MP3');
  $("#player")[0].load();
  $("#player")[0].play();
}
function notshowMark(){
  tipMark.attr('class','notshow')
  img.remove()
  $("#player")[0].pause();
}
  window.onload = function () {
    var parent = d3.select('#svg_ols')
    
    var margin = { top: 30, right: 20, bottom: 30, left: 683.638 },
      width =parent.node().clientWidth,
      height = parent.node().clientHeight - margin.top - margin.bottom;

    var x = d3.scale.linear()
      .range([0, width+100]);

    var y = d3.scale.linear()
      .range([height, 0]);

    var originData = [{ "X1": "10", "X2": "10", "X3": "10", "X4": "8", "Y1": "8.04", "Y2": "9.14", "Y3": "7.46", "Y4": "6.58" },
    { "X1": "8", "X2": "8", "X3": "8", "X4": "8", "Y1": "6.95", "Y2": "8.14", "Y3": "6.77", "Y4": "5.76" },
    { "X1": "13", "X2": "13", "X3": "13", "X4": "8", "Y1": "7.58", "Y2": "8.74", "Y3": "12.74", "Y4": "7.71" },
    { "X1": "9", "X2": "9", "X3": "9", "X4": "8", "Y1": "8.81", "Y2": "8.77", "Y3": "7.11", "Y4": "8.84" },
    { "X1": "11", "X2": "11", "X3": "11", "X4": "8", "Y1": "8.33", "Y2": "9.26", "Y3": "7.81", "Y4": "8.47" },
    { "X1": "14", "X2": "14", "X3": "14", "X4": "8", "Y1": "9.96", "Y2": "8.1", "Y3": "8.84", "Y4": "7.04" },
    { "X1": "6", "X2": "6", "X3": "6", "X4": "8", "Y1": "7.24", "Y2": "6.13", "Y3": "6.08", "Y4": "5.25" },
    { "X1": "4", "X2": "4", "X3": "4", "X4": "19", "Y1": "4.26", "Y2": "3.1", "Y3": "5.39", "Y4": "12.5" },
    { "X1": "12", "X2": "12", "X3": "12", "X4": "8", "Y1": "10.84", "Y2": "9.13", "Y3": "8.15", "Y4": "5.56" },
    { "X1": "7", "X2": "7", "X3": "7", "X4": "8", "Y1": "4.82", "Y2": "7.26", "Y3": "6.42", "Y4": "7.91" },
    { "X1": "5", "X2": "5", "X3": "5", "X4": "8", "Y1": "5.68", "Y2": "4.74", "Y3": "5.73", "Y4": "6.89" }
    ],
      data_ols = [],
      keys_ols = [],
      x_index,
      y_index,
      dur = 100;


     svg_ols = d3.select("#svg_ols").append("svg").attr("display", "inline-block")
    .attr("width", "00px").attr("heigh", "500px");


    var x_scale_ols = d3.scale.linear().domain([0, 20])
      y_scale_ols = d3.scale.linear().domain([0, 15])
      var x_scale_ols_n= d3.scale.linear().domain([0, 20]).range([0, width]);
      y_scale_ols_n= d3.scale.linear().domain([0, 15]).range([0, height]);
    var x_axis_ols = d3.svg.axis().scale(x_scale_ols).orient("bottom").ticks(5),
      y_axis_ols = d3.svg.axis().scale(y_scale_ols).orient("left").ticks(5);

       tipMark = svg_ols.append("text").attr("text-anchor", "middle")
   

       var x_axis_group_ols = svg_ols.append("g").attr("class", "x axis"),
      y_axis_group_ols = svg_ols.append("g").attr("class", "y axis");


    var clip_ols = svg_ols.append("clipPath").attr("id", "viewOLS").append("rect");


    var xaxisTextOLS = svg_ols.append("text").attr("text-anchor", "middle"),
      yaxisTextOLS = svg_ols.append("text").attr("text-anchor", "middle");


    var tipOLS = d3.tip().attr('class', 'd3-tip').offset([-10, 0]);
    $(window).on('mouseup', tipOLS.hide);


    var containerOLS = svg_ols.append("g").attr("clip-path", "url(#viewOLS)")
      .attr("width", "1500px").attr("heigh", "500px")
      .call(tipOLS).attr('id', 'container');


    var dragOLS = d3.behavior.drag()
      .origin(function (d) { return { x: d3.select(this).attr("cx"), y: d3.select(this).attr("cy") }; })
      .on('drag', function (d) {
        var r = parseFloat(d3.select(this).attr("r")),
          x = Math.max(x_scale_ols.range()[0] + r, Math.min(x_scale_ols.range()[1] - r, d3.event.x)),
          y = Math.max(y_scale_ols.range()[1] + r, Math.min(y_scale_ols.range()[0] - r, d3.event.y));
        d3.select(this).attr('cx', x).attr('cy', y);
        d[keys_ols[x_index]] = x_scale_ols.invert(x);
        d[keys_ols[y_index]] = y_scale_ols.invert(y);
        tipOLS.show(d, this);
        statisticsCalcOLS(0);
      })


    function addDataPointsOLS() {

      xaxisTextOLS.text(keys_ols[x_index]);
      yaxisTextOLS.text(keys_ols[y_index]);


      tipOLS.html(function (d, i) {
        return '(' + round(d[keys_ols[x_index]], 2) + ', ' + round(d[keys_ols[y_index]], 2) + ')';
      });

      var circles = containerOLS.selectAll("circle.data");

      circles.data(data_ols).enter()
        .append("circle")
        .attr("r", 7)
        .attr("class", "data")
        .call(dragOLS)
        .on('mousedown', function (d) { tipOLS.show(d, this) })
        .on('mouseover', function (d) { tipOLS.show(d, this) })
        .on('mouseout', tipOLS.hide);

 
      containerOLS.selectAll("line.ols")
        .data([1])
        .enter()
        .append("line")
        .attr("class", "ols")
        .attr('onmousedown', "showMark('最小二乘回归线',6)" )
        .attr('onmouseover', "showMark('最小二乘回归线',6)")
        .attr('onmouseout',"notshowMark()")
        .moveToBack();


      var rects = containerOLS.selectAll("rect.sse").data(data_ols)
           


      
      rects.enter()
        .append("rect")
        .attr("r", 5)
        .attr("class", "sse")
        .attr('onmousedown', "showMark('正方形的面积表示数据与回归线的误差平方',7)" )
        .attr('onmouseover', "showMark('正方形的面积表示数据与回归线的误差平方',7)")
        .attr('onmouseout', "notshowMark()")
        .moveToBack();
    }

    function ols_coef_calc(xdata, ydata) {
      var n = xdata.length,
        xmean = d3.mean(xdata),
        ymean = d3.mean(ydata),
        sxx = 0,
        sxy = 0;
      for (var i = 0; i < n; i++) {
        sxx += Math.pow((xdata[i] - xmean), 2);
        sxy += (xdata[i] - xmean) * (ydata[i] - ymean);
      }
      var b1 = sxy / sxx,
        b0 = ymean - b1 * xmean;

      var sse = 0;
      for (var i = 0; i < n; i++) {
        sse += Math.pow((xdata[i] * b1 + b0 - ydata[i]), 2);
      }
      var b0_std = sse * Math.pow(xmean, 2) / sxx + sse / n,
        b1_std = sse / sxx;

      return [n, xmean, ymean, b0, b1, sse, b0_std, b1_std];
    }

    function statisticsCalcOLS(dur) {
      if (data_ols.length == 0) return;


      var xdata = extractColumn(data_ols, keys_ols[x_index]),
        ydata = extractColumn(data_ols, keys_ols[y_index]),

        result = ols_coef_calc(xdata, ydata)
      b0 = result[3],
        b1 = result[4]
      x0 = x_scale_ols.range()[0],
        x1 = x_scale_ols.range()[1];

      for (rs in result) {
        if (isNaN(result[rs])) {
          result[rs] = 0
        }

      }

      $('#sampleSizeValue').html(result[0]);
      $('#xMeanValue').html(round(result[1], 2));
      $('#yMeanValue').html(round(result[2], 2));
      $('#beta0Value').html(round(result[3], 2));
      $('#beta1Value').html(round(result[4], 2));
      $('#sseValue').html(round(result[5], 2));
      $('#beta0STD').html(round(result[6], 2));
      $('#beta1STD').html(round(result[7], 2));


      containerOLS.selectAll("circle.data")
        .transition()
        .duration(dur)
        .attr("cx", function (d) { return x_scale_ols(d[keys_ols[x_index]]) })
        .attr("cy", function (d) { return y_scale_ols(d[keys_ols[y_index]]) });
      if (data_ols.length > 1) {

        containerOLS.selectAll("line.ols")
          .transition()
          .duration(dur)
          .attr("x1", x0)
          .attr("y1", y_scale_ols(b0 + b1 * x_scale_ols.invert(x0)))
          .attr("x2", x1)
          .attr("y2", y_scale_ols(b0 + b1 * x_scale_ols.invert(x1)))
        // var x_scale_ols_n= d3.scale.linear().domain([0, 20]).range([0, width]);
        // y_scale_ols_n=
          // var line_generator = d3.svg.line()//d3中绘制曲线的函数
          // .x(function(d, i){return x_scale_ols_n(i)})//曲线中x的值
          // .y(function(d){return y_scale_ols_n(d)})//曲线中y的值
          // .interpolate("basis")//把曲线设置光滑
          // containerOLS.select('path').remove()
          // containerOLS.append("path")
          // .attr("d", line_generator(ydata))


        containerOLS.selectAll("rect.sse")
          .transition()
          .duration(dur)
          .attr("x", function (d) { return x_scale_ols(d[keys_ols[x_index]]) })
          .attr("y", function (d) { return y_scale_ols(Math.max(d[keys_ols[y_index]], b0 + b1 * d[keys_ols[x_index]])); })
          .attr("width", function (d) { return Math.abs(y_scale_ols(d[keys_ols[y_index]]) - y_scale_ols(b0 + b1 * d[keys_ols[x_index]])); })
          .attr("height", function (d) { return Math.abs(y_scale_ols(d[keys_ols[y_index]]) - y_scale_ols(b0 + b1 * d[keys_ols[x_index]])); })
      }



    }

    var clr = ["white", "red", "blue", "green", "yellow", "black", "purple", "grey", "brown", "orange", "pink"];
    function color(i) {
      if (i == 0) {
        return clr[0];
      }
      else {
        return clr[1 + (i - 1) % (clr.length - 1)];
      }
    }
    var cursor;
    $('#datasetsOls').change(function (e) {

      if (+$('input[name = "ols"]:checked').val() == 4) {
        addData()
        return;
      } else {
        d3.select('rect.target_rect').remove()
        d3.select("circle.cursor").remove()
        data_ols = originData
      }


      keys_ols = d3.keys(data_ols[0])
      x_index = +$('input[name = "ols"]:checked').val();
      y_index = x_index + 4;

      addDataPointsOLS();
      statisticsCalcOLS(dur);


    });
    addData()
    d3.selection.prototype.moveToBack = function () {
      return this.each(function () {
        this.parentNode.insertBefore(this, this.parentNode.firstChild);
      });
    };
    function addData(d) {
      data_ols = []
      $("#container").html("")
      cursor = d3.select("#container")
        .append("circle")
        .attr("r", 10.0)
        .attr("transform", "translate(-100,-100)")
        .attr("class", "cursor")
        .style("fill", color(1));
      function mousemove() {
        cursor.attr("transform", "translate(" + d3.mouse(this) + ")");
      }

      function mouseout() {
        cursor.attr("opacity", 0.0);
      }

      function mouseover() {
        cursor.attr("opacity", 1.0);
      }

      var centcount = 0;
      function click(d) {

        centcount += 1;
        try {
          cursor.transition().style("fill", color(centcount + 1));
        } catch (error) {
        }



        var coords = d3.mouse(this);

        var xi = x.invert(coords[0]);
        var yi = y.invert(coords[1] - margin.right);
        data_ols.push({ "X1": "5", "X2": "5", "X3": "5", "X4": "8", "X": xi * 22, "Y1": "5.68", "Y2": "4.74", "Y3": "5.73", "Y4": "6.89", "Y": yi * 15 })



        keys_ols = d3.keys(data_ols[0])
        x_index = +$('input[name = "ols"]:checked').val();
        y_index = x_index + 5;
        addDataPointsOLS();
        statisticsCalcOLS(dur);

      }

// 50   0
// 0    20
      d3.select('#container')
        .append("rect")
        .attr("class", "target_rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("opacity", 0.0)
        .on("mousedown", click)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout)
        .on("mouseover", mouseover);

    }

    function round(number, decimal) {
      var power = Math.pow(10, decimal);
      return (Math.round(number * power) / power).toFixed(decimal);
    }


    function extractColumn(arr, column) {
      function reduction(previousValue, currentValue) {
        previousValue.push(currentValue[column]);
        return previousValue;
      }
      return arr.reduce(reduction, []);
    }

    var tableExplanation = ["#sampleSize", "#xMean", "#yMean", "#beta0", "#beta1", "#sse"];
    $("#table_ols").delegate('td', 'click mouseover mouseleave', function (e) {
      var col = $(this).index(),
        curr = $("#table_ols colgroup").eq($(this).index());

      if (col) {
        if (e.type == 'mouseover' && !curr.hasClass("click")) {
          curr.addClass("hover");
        } else if (e.type == 'click') {
          $(".explanation").css("display", "none");
          if (curr.hasClass("click")) {
            $("#defaultRegresion").css("display", "block");
            curr.removeClass("click");
          } else {
            $("colgroup").removeClass("click hover");
            curr.addClass("click");
            $(tableExplanation[col - 1]).fadeToggle();
          }
        } else {
          curr.removeClass("hover");
        }
      };
    });



    function drawOls() {
      var parent = d3.select('#svg_ols'),
        w = parent.node().clientWidth,
        h =parent.node().clientHeight,
        padding = 50;

      x_scale_ols.range([padding, (w - padding)]);
      y_scale_ols.range([(h - padding), padding]);
      
      svg_ols.attr("width", w).attr("height", h);

      x_axis_group_ols.attr("transform", "translate(0," + (h - padding-6) + ")").call(x_axis_ols);
      y_axis_group_ols.attr("transform", "translate(" + padding + ",0)").call(y_axis_ols);


      clip_ols.attr("x", padding).attr("y", padding).attr("width", w - 2 * padding).attr("height", h - 2 * padding);

      xaxisTextOLS.attr("transform", "translate(" + (w / 2) + "," + (h+10 - padding / 4) + ")");
      tipMark.attr("transform", "translate(" + (w / 2+15) + "," + (60) + ")").style('font-size','1em');
   

      yaxisTextOLS.attr("transform", "translate(" + (padding / 4+8) + "," + (h / 2) + ")rotate(-90)");
 
      statisticsCalcOLS(0);
    }
    drawOls();
    $(window).on("resize", drawOls);
  }