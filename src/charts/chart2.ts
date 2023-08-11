import * as d3 from "d3";
import { defaultChartConfig, addStyledAxis, createSvg } from "./chartConfig";

export function drawChart2() {
    const config = defaultChartConfig;

    const svg = createSvg("#my_dataviz", config);

    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
        function (d) {
            return { date: d3.timeParse("%Y-%m-%d")(d.date), value: +d.value };
        }).then(function (data) {

            // X axis
            const x = d3.scaleTime()
                .domain(d3.extent(data, d => d.date))
                .range([config.marginLeft, config.width - config.marginRight]);

            // Y axis
            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => +d.value)])
                .range([config.height - config.marginBottom, config.marginTop]);

            // Use the styling function for the axes
            addStyledAxis(svg, x, y, config);

            // Line path
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line<{ date: Date; value: number; }>()
                    .x(d => x(d.date))
                    .y(d => y(d.value)));
        });
}
