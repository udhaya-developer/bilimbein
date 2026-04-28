'use client';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import topology from "world-atlas/countries-110m.json";

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
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1250,
          center: [80.5, 22.5] // Center of India
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={topology}>
          {({ geographies }) =>
            geographies
              .filter(geo => geo.properties.name === "India")
              .map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="transparent"
                stroke="var(--red)"
                strokeWidth={0.8}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "rgba(232,0,28,0.1)", outline: "none", transition: "all 250ms" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
        {mapCities.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates}>
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
                letterSpacing: "0.05em"
              }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}
