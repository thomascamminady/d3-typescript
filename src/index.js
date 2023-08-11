import * as d3 from "d3";
var l = console.log;
d3.csv("data.csv").then(function (csv) {
    var data = csv.map(function (d) {
        return {
            x: parseInt(d.x),
            y: parseInt(d.y)
        };
    });
    draw(data);
}, function (fail) { return l(fail); });
function draw(data) {
    var chart = d3.select("#container")
        .append("svg");
    var h = 300;
    var w = 700;
    chart
        .attr("width", w)
        .attr("height", h);
}
//# sourceMappingURL=index.js.map