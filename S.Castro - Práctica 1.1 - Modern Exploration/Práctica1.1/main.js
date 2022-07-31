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
    data.map(d => {d.titles = +d.titles}) //Convert to string
    data2 = data

    // filter empty data on winner "name"
    //data2 = data2.filter(datanull => datanull != null)

    // // Conversion winner "name" to "times it appears"
    // var groupedData = d3.nest()
    // .key(function (d) { return d.manufactured; })

    // // sorting keys in ascending order
    // .sortKeys(d3.ascending)
    // .entries(cars);
    // console.log("ArrayData :", groupedData);




    x.domain([0, d3.max(data.map(d => d.titles))])  //Determine range of titles
    y.domain(data.map(d => d.country))              //Determine countries
    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)
    
    // Data Binding 
    // Crating graphics & axis
    elementGroup.selectAll("rect").data(data)    
        .join("rect")
            .attr("class", d => d.country)
            .attr("x", 0)
            .attr("y", d => y(d.country))
            .attr("width", d => x(d.titles))
            .attr("height", y.bandwidth())

    // Creating text inside graphics
    elementGroup.selectAll("text").data(data)
        .join("text")
            .text(d => d.titles)
            .attr("x", d=> x(d.titles)+3)
            .attr("y", d=> y(d.country)+35)
})