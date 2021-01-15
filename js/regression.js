
    var lineWidth = 2;
    var data_corr = [];
    var keys_corr = [];
    var x_key = 0;
    var y_key = 0;
    var sf_corr = 0.25;
    var xScaleCorr = d3.scale.linear();
    var yScaleCorr = d3.scale.linear();
    var pScaleCorr = d3.scale.linear().domain([-1, 0, 1]).range(['#F2F7FD', '#61A7D2', '#08306B']);
    var xScaleBarCorr = d3.scale.linear().domain([-1, 1]);

    var xAxisCorr = d3.svg.axis().scale(xScaleCorr).orient("bottom").ticks(0);
    var xAxisBarCorr = d3.svg.axis().scale(xScaleBarCorr).orient("bottom").ticks(5);
    var yAxisCorr = d3.svg.axis().scale(yScaleCorr).orient("left").ticks(0);

    var svgCorr = d3.select("#svgCorr").append("svg").attr("display", "inline-block");

    var xAxisGroupCorr = svgCorr.append("g").attr("class", "x axis");
    var xAxisGroupBarCorr = svgCorr.append("g").attr("class", "x axis");
    var yAxisGroupCorr = svgCorr.append("g").attr("class", "y axis");

    var clipCorr = svgCorr.append("clipPath").attr("id", "viewCorr").append("rect");

    var xaxisTextCorr = svgCorr.append("text").attr("text-anchor", "middle");
    var yaxisTextCorr = svgCorr.append("text").attr("text-anchor", "middle");

    var tipCorr = d3.tip().attr('class', 'd3-tip').offset([-10, 0]);
    $(window).on('mouseup', tipCorr.hide);


    var containerCorr = svgCorr.append("g").attr("clip-path", "url(#viewCorr)").call(tipCorr);


    var dragCorr = d3.behavior.drag()
        .origin(function (d) {
            return { x: d3.select(this).attr("cx"), y: d3.select(this).attr("cy") };
        })
        .on('drag', function (d) {
            var r = parseFloat(d3.select(this).attr("r")),
                x = Math.max(xScaleCorr.range()[0] + r, Math.min(xScaleCorr.range()[1] - r, d3.event.x)),
                y = Math.max(yScaleCorr.range()[1] + r, Math.min(yScaleCorr.range()[0] - r, d3.event.y));
            d3.select(this).attr('cx', x).attr('cy', y);
            d[keys_corr[x_key]] = xScaleCorr.invert(x);
            d[keys_corr[y_key]] = yScaleCorr.invert(y);
            tipCorr.show(d, this);
            corr_table_calc();
        })
    var defs = svgCorr.append("defs");

    var linearGradient = defs.append("linearGradient")
        .attr("id", "linear-gradient");

    linearGradient
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

    linearGradient.selectAll("stop")
        .data(pScaleCorr.range())
        .enter().append("stop")
        .attr("offset", function (d, i) { return i / (pScaleCorr.range().length - 1); })
        .attr("stop-color", function (d) { return d; });

    var legend = svgCorr.append("rect")
        .style("fill", "url(#linear-gradient)")
        .attr("stroke-width", lineWidth)
        .attr('stroke', 'black')

    var regressionLineCorrX = containerCorr.append("line"),
        regressionLineCorrY = containerCorr.append("line"),
        cosineCorr = containerCorr.append("path"),
        barCorr = svgCorr.append('line');


    $("#table_corr").delegate('td', 'click mouseover mouseleave', function (e) {

        var col = $(this).index(),
            row = $(this).parent().index(),
            cell = $("#table_corr tr").eq(row).children().eq(col);

        if (col && row) {
            if ((e.type == 'mouseover') && !cell.hasClass("click_corr")) {
                cell.addClass("hover_corr");
            } else if (e.type == 'click') {
                $("td").removeClass("click_corr hover_corr");
                cell.addClass("click_corr");
                x_key = col - 1;
                y_key = row - 1;
                add_data_corr();
            } else {
                cell.removeClass("hover_corr");
            }
        };
    });



    drawCorr();
    $(window).on("resize", drawCorr);
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

    function add_data_corr() {
        console.log(x_key)
 
        xaxisTextCorr.text(keys_corr[x_key]);
        yaxisTextCorr.text(keys_corr[y_key]);

 
        tipCorr.html(function (d, i) {
            return '(' + round(d[keys_corr[x_key]], 2) + ', ' + round(d[keys_corr[y_key]], 2) + ')';
        });

   
        var x_min = d3.min(data_corr, function (d) { return +d[keys_corr[x_key]] }),
            x_max = d3.max(data_corr, function (d) { return +d[keys_corr[x_key]] }),
            x_offset = (x_max - x_min) * sf_corr;
        xScaleCorr.domain([x_min - x_offset, x_max + x_offset]);
        xAxisCorr.ticks(5);
        xAxisGroupCorr.transition().call(xAxisCorr);

   
        var y_min = d3.min(data_corr, function (d) { return +d[keys_corr[y_key]] }),
            y_max = d3.max(data_corr, function (d) { return +d[keys_corr[y_key]] }),
            y_offset = (y_max - y_min) * sf_corr;
        yScaleCorr.domain([y_min - y_offset, y_max + y_offset]);
        yAxisCorr.ticks(5);
        yAxisGroupCorr.transition().call(yAxisCorr);


        var data = containerCorr.selectAll("circle.data").attr("stroke", "#3987BD")
            .data(data_corr);
   
        data.exit().remove();

   
        var data_enter = data
     
            .enter()
            .append("circle")
            .attr("r", 3)
            .attr("class", "data")
            .attr("stroke", "#3987BD")
            .call(dragCorr)
            .on('mousedown', function (d) { tipCorr.show(d, this); })
            .on('mouseover', function (d) { tipCorr.show(d, this); })
            .on('mouseout', tipCorr.hide);

        data_enter.transition()
            .attr("cx", function (d) { return xScaleCorr(d[keys_corr[x_key]]); })
            .attr("cy", function (d) { return yScaleCorr(d[keys_corr[y_key]]); });
        data.transition()
            .attr("cx", function (d) { return xScaleCorr(d[keys_corr[x_key]]); })
            .attr("cy", function (d) { return yScaleCorr(d[keys_corr[y_key]]); });

     
        corr_table_calc();
    }

    function reset_corr() {

        
        svgCorr.selectAll("circle").remove();

  
        xAxisCorr.ticks(0);
        xAxisGroupCorr.transition().call(xAxisCorr);
        yAxisCorr.ticks(0);
        yAxisGroupCorr.transition().call(yAxisCorr);

       
        xaxisTextCorr.text("");
        yaxisTextCorr.text("");

 
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                $("#table_corr tr").eq(i + 1).children().eq(j + 1)
                    .html("")
                    .css("background", "#FFFFFF")
                    .removeClass("click_corr");
            };
        };

        regressionLineCorrX.attr("stroke", "transparent");
        regressionLineCorrY.attr("stroke", "transparent");
        cosineCorr.attr("fill", "transparent");
        barCorr.attr("stroke", "transparent");
    }

    function corr_coef_calc(xdata, ydata) {
        var n = xdata.length,
            xmean = d3.mean(xdata),
            ymean = d3.mean(ydata),
            syy = 0,
            sxx = 0,
            sxy = 0;
        for (var i = 0; i < n; i++) {
            syy += Math.pow((ydata[i] - ymean), 2);
            sxx += Math.pow((xdata[i] - xmean), 2);
            sxy += (xdata[i] - xmean) * (ydata[i] - ymean);
        }
        var b1x = syy / sxy,
            b0x = ymean - b1x * xmean,
            b1y = sxy / sxx,
            b0y = ymean - b1y * xmean,
            p = sxy / (Math.sqrt(sxx) * Math.sqrt(syy));

        var sse = 0;
        for (var i = 0; i < n; i++) {
            sse += Math.pow((xdata[i] * b1y + b0y - ydata[i]), 2);
        }
        var tscore = b1y * Math.sqrt(sxx) * (n - 2) / sse,
            pvalue = jStat.ttest(tscore, n, 2),
            sig = pvalue < 0.05;

        return [p, b0x, b1x, xmean, b0y, b1y, ymean];
    }
  
    function corr_table_calc() {
        var variables;
        for (var i = 0; i < keys_corr.length - 1; i++) {
            for (var j = 0; j < keys_corr.length - 1; j++) {
            
                var xdata = extractColumn(data_corr, keys_corr[i]),
                    ydata = extractColumn(data_corr, keys_corr[j]),
                    result = corr_coef_calc(xdata, ydata);
            
                if ((x_key == i) && (y_key == j)) variables = result;
        
                var col = "#FFFFFF"
                if (result[0] < 0.5) {
                    col = '#000000'
                }
                $("#table_corr tr").eq(i + 1).children().eq(j + 1)
                    .html(round(result[0], 2))
                    .css("color", col)

                    .css("font-size", "10px")
                    .css("background", pScaleCorr(result[0]));
            };
        };
        if (variables == null) return;
        var p = variables[0],
            b0x = variables[1],
            b1x = variables[2],
            xmean = variables[3],
            b0y = variables[4],
            b1y = variables[5],
            ymean = variables[6];

   
        var x1 = xScaleCorr.range()[0],
            x2 = xScaleCorr.range()[1];

        regressionLineCorrX
            .attr("x1", x1)
            .attr("y1", yScaleCorr(b0x + b1x * xScaleCorr.invert(x1)))
            .attr("x2", x2)
            .attr("y2", yScaleCorr(b0x + b1x * xScaleCorr.invert(x2)))
            .attr("stroke-width", 2 * lineWidth)
            .attr("stroke", "#3987BD")
  

        regressionLineCorrY
            .attr("x1", x1)
            .attr("y1", yScaleCorr(b0y + b1y * xScaleCorr.invert(x1)))
            .attr("x2", x2)
            .attr("y2", yScaleCorr(b0y + b1y * xScaleCorr.invert(x2)))
            .attr("stroke-width", 2 * lineWidth)
            .attr("stroke", "#3987BD")
   


        var y_range = yScaleCorr.range()[1] - yScaleCorr.range()[0],
            y_domain = yScaleCorr.domain()[1] - yScaleCorr.domain()[0],
            y_ratio = y_range / y_domain;

        var x_range = xScaleCorr.range()[1] - xScaleCorr.range()[0],
            x_domain = xScaleCorr.domain()[1] - xScaleCorr.domain()[0],
            x_ratio = x_range / x_domain;

        var start_angle = Math.acos(-b1x * y_ratio / Math.hypot(x_ratio, b1x * y_ratio)),
            end_angle = Math.acos(-b1y * y_ratio / Math.hypot(x_ratio, b1y * y_ratio)),
            arc = d3.svg.arc()
                .innerRadius(0)
                .outerRadius(100)
                .startAngle(start_angle)
                .endAngle(end_angle);

        cosineCorr.attr("d", arc)
            .attr('transform', 'translate(' + xScaleCorr(xmean) + ',' + yScaleCorr(ymean) + ')')
            .attr('fill', pScaleCorr(p))
    

        barCorr.attr("x1", xScaleBarCorr(p))
            .attr("x2", xScaleBarCorr(p))
            .attr("stroke-width", lineWidth)
            .attr("stroke", "black");
    }

    function drawCorr() {

 
        var parent = d3.select('#svgCorr'),
            w = parent.node().clientWidth,
            h = 500,
            hBar = 70,
            padding = 50;

 
        xScaleCorr.range([padding, (w - padding)]);
        xScaleBarCorr.range([padding, (w - padding)]);
        yScaleCorr.range([(h - padding), padding]);


        svgCorr.attr("width", w).attr("height", h);

        xAxisGroupCorr.attr("transform", "translate(0," + (h - padding) + ")").call(xAxisCorr);
        xAxisGroupBarCorr.attr("transform", "translate(0," + (hBar - padding) + ")").call(xAxisBarCorr);
        yAxisGroupCorr.attr("transform", "translate(" + padding + ",0)").call(yAxisCorr);


        legend.attr("x", padding).attr("y", lineWidth).attr("width", w - 2 * padding).attr("height", hBar - padding - lineWidth);
        barCorr.attr("y1", lineWidth).attr("y2", hBar - padding);

  
        clipCorr.attr("x", padding).attr("y", padding).attr("width", w - 2 * padding).attr("height", h - 2 * padding);

    
        xaxisTextCorr.attr("transform", "translate(" + (w / 2) + "," + (h - padding / 4) + ")");
        yaxisTextCorr.attr("transform", "translate(" + (padding / 4) + "," + (h / 2) + ")rotate(-90)");

       
        add_data_corr();
    }

    function getArrayProps(array, key) {
        var key = key || "value";
        var res = [];
        if (array) {
            array.forEach(function (t) {
                res.push(t[key]);
            });
        }
        return res;
    }
    function data_set() {

        var species = []
        $('input[name = "correlation"]:checked').each(function () { return species.push($(this).val()); });
        data_corr = rsidata.filter(function (d) { return species.indexOf(d['Species']) != -1; });
        keys_corr = d3.keys(data_corr[0])
        if (data_corr.length) {
            add_data_corr()

        } else {
            reset_corr();
        }

    }
