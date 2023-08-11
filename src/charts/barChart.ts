import * as d3 from "d3";
import { barChartConfig, addStyledAxis, createSvg } from "./chartConfig";

export function drawBarChart() {
    const config = barChartConfig;

    // Sample data
    const data = [
        { label: 'A', value: 45 },
        { label: 'B', value: 60 },
        { label: 'C', value: 30 },
        { label: 'D', value: 50 },
        { label: 'E', value: 40 },
    ];

    const x = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([config.marginLeft, config.width - config.marginRight])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, 100]) // Assuming max value is 100; adjust accordingly
        .range([config.height - config.marginBottom, config.marginTop]);

    const svg = createSvg("#barChart", config);
    addStyledAxis(svg, x, y, config);

    // Bars
    svg.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("x", d => x(d.label))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => y(0) - y(d.value))
        .attr("fill", config.barColor)
        .on("mouseover", function () { d3.select(this).attr("fill", config.barHoverColor); }) // On hover, darken the bar
        .on("mouseout", function () { d3.select(this).attr("fill", config.barColor); }); // On mouseout, revert to original color
}
