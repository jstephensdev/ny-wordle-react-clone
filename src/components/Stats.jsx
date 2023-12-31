import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Stats = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Select the SVG container using D3
    const svg = d3.select(svgRef.current);

    // Define chart dimensions
    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerHeight])
      .padding(0.1);

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Render axes
    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis);

    svg.select('.y-axis').call(yAxis);

    // Render bars
    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', (d) => yScale(d.label))
      .attr('width', (d) => xScale(d.value))
      .attr('height', yScale.bandwidth())
      .attr('fill', 'black');
  // Add text labels above the bars
  svg
  .selectAll('.bar-label')
  .data(data)
  .join('text')
  .attr('class', 'bar-label')
  .text((d) => d.label)
  .attr('x', (d) => xScale(d.value) + 5) // Adjust the position based on your preference
  .attr('y', (d) => yScale(d.label) + yScale.bandwidth() / 2)
  .attr('dy', '0em') // Move the label above the bar
  .attr('fill', 'black') // Text color
  .attr('text-anchor', 'start');
    
  }, [data]);

  return (
    <svg ref={svgRef} width={400} height={200}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
};

export default Stats;
