'use client';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import topology from "world-atlas/countries-110m.json";

const branchNodes = [
  { name: "Chennai", coordinates: [80.2707, 13.0827], id: "NODE_01" },
  { name: "Bangalore", coordinates: [77.5946, 12.9716], id: "NODE_02" },
  { name: "Goa", coordinates: [74.1240, 15.2993], id: "NODE_03" },
  { name: "Coimbatore", coordinates: [76.9558, 11.0168], id: "NODE_04" },
  { name: "Kolkata", coordinates: [88.3639, 22.5726], id: "NODE_05" },
  { name: "Hyderabad", coordinates: [78.4867, 17.3850], id: "NODE_06" },
  { name: "Delhi", coordinates: [77.2090, 28.6139], id: "NODE_07" },
  { name: "Mumbai", coordinates: [72.8777, 19.0760], id: "NODE_08" },
];

export default function WorldMap() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 150,
          center: [20, 10]
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={topology}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="transparent"
                stroke="var(--border)"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "rgba(232,0,28,0.05)", outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
        {branchNodes.map(({ name, coordinates, id }) => (
          <Marker key={id} coordinates={coordinates}>
            <circle r={2} fill="var(--red)" />
            <circle r={2} fill="var(--red)" opacity={0.6}>
              <animate attributeName="r" from="2" to="8" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.6" to="0" dur="3s" repeatCount="indefinite" />
            </circle>
          </Marker>
        ))}
      </ComposableMap>
      
      {/* Background Grid Pattern Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.2
        }}
      />
    </div>
  );
}
