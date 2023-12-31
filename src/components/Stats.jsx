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
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) + 30])
      .range([innerHeight, 0]);

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
      .attr('x', (d) => xScale(d.label))
      .attr('y', (d) => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => innerHeight - yScale(d.value))
      .attr('fill', 'black');

    // Add values above the bars
    svg
      .selectAll('.bar-value')
      .data(data)
      .join('text')
      .attr('class', 'bar-value')
      .text((d) => d.value)
      .attr('x', (d) => xScale(d.label) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.value) - 5) // Adjust the position based on your preference
      .attr('dy', '-0.5em')
      .attr('text-anchor', 'middle')
      .attr('fill', 'black');
  }, [data]);

  return (
    <svg ref={svgRef} width={400} height={200}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
};

export default Stats;
