import * as d3 from "d3";
import { defaultChartConfig, addStyledAxis, createSvg } from "./chartConfig";

export function drawChart1() {
    const config = defaultChartConfig;

    const x = d3.scaleTime()
        .domain([new Date("2023-01-01"), new Date("2024-01-01")])
        .range([config.marginLeft, config.width - config.marginRight]);

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([config.height - config.marginBottom, config.marginTop]);

    const svg = createSvg("#viz1", config);
    addStyledAxis(svg, x, y, config);
}
