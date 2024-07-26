let data, gasolineData, dieselData, electricData, tooltip;


async function init() {
 data = await d3.csv("https://flunky.github.io/cars2017.csv");

  const fuelTypes = ['Gasoline', 'Diesel', 'Electricity'];  

   gasolineData = data.filter(d => d.Fuel === 'Gasoline');
   dieselData = data.filter(d => d.Fuel === 'Diesel');
   electricData = data.filter(d => d.Fuel === 'Electricity');
  

  createChart(data)
  allChartAnnotations()
   var tooltip = d3.select("body")
    .append("div").attr('id', 'my_tooltip');
 

}

function createChart(data) {
	var svg = d3.select("svg")
   svg.selectAll("*").remove()

	const margin = {top: 50, right: 50, bottom: 50, left: 50};
  const width = 600 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;
  var og = svg.append("g").attr("transform", "translate(50,	50)");

            
const xScale = d3.scaleLog([10, d3.max(data, d => +d.AverageCityMPG)], [0, width]).base(10);
const yScale = d3.scaleLog([10, d3.max(data, d => +d.AverageHighwayMPG)],[height, 0]).base(10);            

  const yAxis = d3.axisLeft(yScale)
    .tickValues([10, 20, 50, 100])
    .tickFormat(d3.format("~s"));
  const xAxis = d3.axisBottom(xScale)
  .tickValues([10, 20, 50, 100, 150])
  .tickFormat(d3.format("~s"));

og.append("g").attr("transform", "translate(0,0)").call(yAxis).attr("text-anchor", "end").append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2 + margin.top))
    .style("text-anchor", "middle")
    .attr("fill", "#5D6971")
    .text("Populadddtion");
og.append("g").attr("transform", `translate(0, ${height})`).call(xAxis).attr("text-anchor", "end").append("text")
     .attr("transform", `translate(${width / 2 + margin.left}, ${height + margin.top + 40})`)
    .style("text-anchor", "middle")
    .text("city");


    
   var mouseover = function(d) {
    d3.select('#my_tooltip').style("opacity", 1)
    d3.select(this).transition().duration(300).attr("r", function(d) { return ((parseInt(d.EngineCylinders)) + 10); });

  }
  var mousemove = function(d) {
    d3.select('#my_tooltip')
      .html(`Average City MPG: ${d.AverageCityMPG}<br>Average Highway MPG: ${d.AverageHighwayMPG}<br>Make: ${d.Make}<br>Cylingers: ${d.EngineCylinders}`)
      .style("left", (d3.event.pageX+10) + 'px')
      .style("top", (d3.event.pageY+10) + 'px')
  }
  var mouseleave = function(event, d) {
    d3.select('#my_tooltip').style("opacity", 0);
        d3.select(this).transition().duration(300).attr("r", function(d) { return ((parseInt(d.EngineCylinders)) + 2); });

  };
  og.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("fill", "lightblue")
  .attr("cx", function (d) { return xScale(d.AverageCityMPG); } )
  .attr("cy", function (d) { return yScale(d.AverageHighwayMPG); } )
  .attr("r", function (d) { return ((parseInt(d.EngineCylinders)) + 2); 
 }).on("mouseover", mouseover).on("mousemove", mousemove ).on("mouseleave", mouseleave);
}

function allChartAnnotations(){
  const annotations = [
    {
      note: {
        label: "The electric cars are outliers they have higher average city and highway MPG.",
        title: "Electric Cars"
      },
      type: d3.annotationCalloutCircle,
      subject: {
        radius: 75,    
        radiusPadding: 20   
      },
      color: ["red"],
      x: 500,
      y: 95,
      dy: 100,
      dx: -10
    }
  ]
  const makeAnnotations = d3.annotation()
    .annotations(annotations)
  d3.select("svg")
    .append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations)
    
   d3.selectAll(".annotation-group .annotation")
    .style("pointer-events", "none");
}

function gasolineChartAnnotations(){
  const annotations = [
    {
      note: {
        label: "Lamborghini has the lowest city and low highway MPG ",
        bgPadding: 20,
        lineHeight: 0.2,
        title: "Least Fuel Efficient Car"
      },
      type: d3.annotationCalloutCircle,
      subject: {
        radius: 30,    
        radiusPadding: 10   
      },
      color: ["red"],
      x: 50,
      y: 365,
      dy: 50,
      dx: 10
    }
  ]
  const makeAnnotations = d3.annotation()
    .annotations(annotations)
  d3.select("svg")
    .append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations)
    
   d3.selectAll(".annotation-group .annotation")
    .style("pointer-events", "none");
}

function dieselChartAnnotations(){
  const annotations = [
    {
      note: {
        label: "Chevrolet and GMC have the same city and highway MPG ",
        bgPadding: 20,
        lineHeight: 0.2,
        title: "Cars with similar Fuel Efficiency"
      },
      type: d3.annotationCalloutCircle,
      subject: {
        radius: 20,    
        radiusPadding: 10   
      },
      color: ["red"],
      x: 385,
      y: 170,
      dy: 50,
      dx: 10
    }
  ]
  const makeAnnotations = d3.annotation()
    .annotations(annotations)
  d3.select("svg")
    .append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations)
    
   d3.selectAll(".annotation-group .annotation")
    .style("pointer-events", "none");
}

function electricChartAnnotations(){
  const annotations = [
    {
      note: {
        label: "Hyundai has the highest city and highway MPG ",
        bgPadding: 20,
        lineHeight: 0.2,
        title: "Most Fuel Efficient Car"
      },
      type: d3.annotationCalloutCircle,
      subject: {
        radius: 20,    
        radiusPadding: 10   
      },
      color: ["red"],
      x: 550,
      y: 50,
      dy: 100,
      dx: -10
    }
  ]
  const makeAnnotations = d3.annotation()
    .annotations(annotations)
  d3.select("svg")
    .append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations)
    
   d3.selectAll(".annotation-group .annotation")
    .style("pointer-events", "none");
}