
var eventwindowresize = function () {};
d3.csv("profile.csv", function (error, csv) {
    "use strict";
    if (error) throw error;

    var data = [],
        cwinh, //cache for speed boost
        cwinw,
        cache,
        cdatal = data.length,
        cacher = 360 / cdatal,
        
        lineFunctioninit = d3.radialArea()
        .radius(function (d, index) { return 0; })
        .angle(function (d, index) { return 0; }),
        
        lineFunctionrand = d3.radialArea()
        .angle(function (d, index) { return Math.round(index * cacher + 5); })
        .radius(function (d, index) { return Math.random() * 150; }),
        
        lineFunction = d3.area()
        .y(function (d, index) { return Math.round(index * cache + 5); })
        .x0(-100)
        .x1(function (d) { return Math.round(d * cache); }),
        
        svgContainer = d3.select("#panel").append("svg")
            .attr("class", "fixed"), //The SVG Container
    
        lineGraph = svgContainer.append("path");  //The line SVG Path
        
        csv.forEach(function (x, index) {
            if (index % 10 === 0) {
                data.push(Number(x.l / 25));
            }
        });
    
        var updatevariables = function () {
            cwinh = window.innerHeight;
            cwinw = window.innerWidth;
            cdatal = data.length;
            cache = cwinh / cdatal;
            cacher = 360 / cdatal;
            
        }
        
        var updatepanelw = function () {
            var cfacew = Math.round(Math.max.apply(Math,data)*cache),
                wrappersize;
            if (3*cfacew<cwinw)
                wrappersize = cwinw - cfacew + "px";
            else 
                wrappersize = 100 + "%";

            console.log(cfacew+" "+cwinw);
            return d3.select('#page-wrapper')
              .style("width", wrappersize);
        }
        
        var introanimation = function () {
            updatevariables();
            
            lineGraph
            .datum(data)
            .attr("class", "area")
            .attr("transform", "translate(" + cwinw / 2 + "," + cwinh / 2 + ")")
            .attr("d", lineFunctioninit)
            .transition()
            .duration(500)
            .attr("d", lineFunctionrand)
            .transition()
            .duration(500)
            .attr("d", lineFunctionrand)
            .transition()
            .duration(500)
            .attr("d", lineFunctionrand)
            .transition()
            .duration(2000)
            .attr("transform", "translate(0,0)")
            .attr("d", lineFunction)
            .on("end", function() {
                updatepanelw()
                .transition()
                .duration(700)
                .style("opacity", 1);
                d3.select("#header")
                .transition()
                .duration(700)
                .style("opacity", 1);
            });
        }
        
        eventwindowresize = function () {
            updatevariables();
        
            lineGraph
            .attr("d", lineFunction)
            updatepanelw();
        };
        introanimation();
});