'use client'

// components/HaplotypeGraph.js
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HaplotypeGraph = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 600;
    const height = 400;

    const svg = d3.select(svgRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    const links = data.flatMap(d => d.connections.map(c => ({ source: d.id, target: c })));
    const nodes = data;

    const link = svg.selectAll('.link')
      .data(links)
      .enter().append('line')
      .attr('class', 'link');

    const node = svg.selectAll('.node')
      .data(nodes)
      .enter().append('circle')
      .attr('class', 'node')
      .attr('r', 10);

    simulation.nodes(nodes);
    simulation.force('link').links(links);
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });
  }, [data]);

  return <div ref={svgRef}></div>;
};

export default HaplotypeGraph;
