// chartConfig.ts
import * as d3 from "d3";

export const defaultChartConfig = {
    width: 1400,
    height: 400,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 200,
    marginLeft: 200,
    axisColor: "var(--main-font-color)",    // Changed to match main-font-color
    tickColor: "var(--secondary-font-color)",  // Changed to match secondary-font-color
    gridColor: "#eee",
    fontFamily: "'Inter', sans-serif",
    mainFontSize: "var(--main-font-size)",  // Added from CSS variables
    headingFontSize: "var(--heading-font-size)",  // Added from CSS variables
    tickFontSize: "var(--tick-font-size)",
    secondaryFontSize: "var(--secondary-font-size)",  // Added from CSS variables
    mainMargin: "var(--main-margin)",    // Added from CSS variables
    mainPadding: "var(--main-padding)"   // Added from CSS variables
};

export function addStyledAxis(svg, x, y, config) {


    // X-axis
    svg.append("g")
        .attr("transform", `translate(0,${config.height - config.marginBottom})`)
        .call(d3.axisBottom(x)
            .tickSize(-config.height + config.marginTop + config.marginBottom)
            .tickPadding(10)
            .tickFormat(d3.timeFormat("%b %Y")))
        .attr("color", config.axisColor)
        .attr("font-family", config.fontFamily)
        .attr("font-size", config.tickFontSize)   // Set font size for X-axis labels
        .selectAll(".tick line")
        .attr("stroke", config.gridColor);

    // Y-axis
    svg.append("g")
        .attr("transform", `translate(${config.marginLeft},0)`)
        .call(d3.axisLeft(y)
            .tickSize(-config.width + config.marginLeft + config.marginRight)
            .tickPadding(10))
        .attr("color", config.axisColor)
        .attr("font-family", config.fontFamily)
        .attr("font-size", config.tickFontSize)   // Set font size for Y-axis labels
        .selectAll(".tick line")
        .attr("stroke", config.gridColor);

    // Remove domain lines
    svg.selectAll(".domain").remove();
}

export function createSvg(selector, config) {
    return d3.select(selector)
        .append("svg")
        .attr("width", config.width + config.marginLeft + config.marginRight)
        .attr("height", config.height + config.marginTop + config.marginBottom);
}
