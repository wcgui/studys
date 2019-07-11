var data = [30,85,178,281,303,365];

d3.select(".chart")
  .selectAll("div")
  .data(data)
  .enter()
  .append("div")
  .style("width",function(d){
      return d + "px";
  })
  .text(function(d){
      return "$ " + d;
  });
  console.log(d3.select(".chart").selectAll("div"));
  d3.selectAll("section")
  .attr("class", "special")
.append("div")
  .html("Hello, world!");