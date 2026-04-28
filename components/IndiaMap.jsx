'use client';
import { useMemo } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import topology from "world-atlas/countries-110m.json";
import * as topojson from "topojson-client";

const mapCities = [
  { name: "Chennai", coordinates: [80.2707, 13.0827] },
  { name: "Mumbai", coordinates: [72.8777, 19.0760] },
  { name: "Delhi", coordinates: [77.2090, 28.6139] },
  { name: "Hyderabad", coordinates: [78.4867, 17.3850] },
  { name: "Bangalore", coordinates: [77.5946, 12.9716] },
  { name: "Goa", coordinates: [74.1240, 15.2993] },
  { name: "Coimbatore", coordinates: [76.9558, 11.0168] },
  { name: "Kolkata", coordinates: [88.3639, 22.5726] },
];

export default function IndiaMap() {
  const projection = useMemo(() => 
    geoMercator()
      .scale(1000)
      .center([80.5, 22.5])
      .translate([400, 300]), // SVG width/2, height/2
  []);

  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection]);

  const indiaGeo = useMemo(() => {
    // topology is world-atlas countries-110m
    const countries = topojson.feature(topology, topology.objects.countries);
    return countries.features.find(f => f.properties.name === "India");
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <svg 
        viewBox="0 0 800 600" 
        preserveAspectRatio="xMidYMid meet" 
        style={{ width: "100%", height: "100%", display: 'block' }}
      >
        {indiaGeo && (
          <path
            d={pathGenerator(indiaGeo)}
            fill="transparent"
            stroke="var(--red)"
            strokeWidth={0.8}
            style={{ transition: "all 250ms" }}
          />
        )}
        {mapCities.map(({ name, coordinates }) => {
          const projected = projection(coordinates);
          if (!projected) return null;
          const [x, y] = projected;
          
          return (
            <g key={name} transform={`translate(${x}, ${y})`}>
              <circle r={4} fill="var(--red)" />
              <circle r={4} fill="var(--red)" opacity={0.6}>
                <animate attributeName="r" from="4" to="20" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
              <text
                textAnchor="middle"
                y={-14}
                style={{
                  fontFamily: "var(--font-body)",
                  fill: "var(--gray-light)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  pointerEvents: "none"
                }}
              >
                {name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
