// Constant declaration
const width  = 800
const height = 600
const margin = { top: 30, bottom: 20, left: 57, right: 10, info:20}
let data2

// Creation of svg & groups
const svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height)

// Creation of constants & Axis data
const elementGroup = svg.append("g").attr("id", "elementGroup").attr("transform", `translate(${margin.left}, 0)`)
const axisGroup = svg.append("g").attr("id", "axisGroup") 
const xAxisGroup = axisGroup.append("g").attr("id", "xAxisGroup").attr("transform", `translate(${margin.left}, ${height-margin.bottom-margin.top})`)
const yAxisGroup = axisGroup.append("g").attr("id", "yAxisGroup").attr("transform", `translate(${margin.left-5}, ${0})`)

// Declaring Scale
let x = d3.scaleLinear().range([0, width - margin.left - margin.right])
let y = d3.scaleBand().range([height - margin.top - margin.bottom, margin.bottom]).padding(0.1)

// declaring Axis const
const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)

// Now we need the range of domain for the graphic
d3.csv("data.csv").then(data  => {
   
    //Nest
    data2 = d3.nest()
    .key(function(d) {
            return d.winner; 
        })
        .sortKeys(d3.ascending)
        .entries(data)

    //Nulls Filter
    data2 = data2.filter(d => d.key != "")


    x.domain([0, d3.max(data2.map(d => d.values.length))])  //Determine range of titles
    y.domain(data2.map(d => d.key))              //Determine countries
    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)
    data2.sort(function(a, b){
        return d3.ascending(a.values)})
    // Data Binding 
    // Crating graphics & axis
    elementGroup.selectAll("rect").data(data2)    
        .join("rect")
            .attr("class", d => d.key)
            .attr("height", y.bandwidth())
            .attr("x", 0)
            .attr("y", d => y(d.key)) 
            .attr("width", d => x(d.values.length))

    // Creating text inside graphics
    
    // elementGroup.selectAll("text").data(data2)
    //     .join("text")
    //         .text(d => d.values.length)
    //         .attr("x", d => x(d.values)+33)
    //         .attr("y", d => y(d.key)+35)
})