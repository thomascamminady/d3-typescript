import * as d3 from "d3";
import { defaultChartConfig } from "./chartConfig";  // Adjust the path accordingly

export function drawChart2() {

    const { width, height, marginTop, marginRight, marginBottom, marginLeft } = defaultChartConfig;


    // append the svg object to the body of the page
    const svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + marginLeft + marginRight)
        .attr("height", height + marginTop + marginBottom)
        .append("g")
        .attr("transform", `translate(${marginLeft},${marginTop})`);

    //Read the data
    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

        // When reading the csv, I must format variables:
        function (d) {
            return { date: d3.timeParse("%Y-%m-%d")(d.date), value: +d.value }; // Note the + before d.value
        }).then(

            // Now I can use this dataset:
            function (data) {

                // Add X axis --> it is a date format
                const x = d3.scaleTime()
                    .domain(d3.extent(data, function (d) { return d.date; }))
                    .range([0, width]);
                svg.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x));

                // Add Y axis
                const y = d3.scaleLinear()
                    .domain([0, d3.max(data, function (d) { return +d.value; })])
                    .range([height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y));

                svg.append("path")
                    .datum(data)
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", 1.5)
                    .attr("d", d3.line<{ date: Date; value: number; }>()
                        .x(function (d) { return x(d.date); })
                        .y(function (d) { return y(d.value); })
                    );


            })
}