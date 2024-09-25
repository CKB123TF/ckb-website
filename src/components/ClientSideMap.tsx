'use client'

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Tooltip, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon if needed
//delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Country {
  name: string;
  coordinates: L.LatLngExpression;
  geojson?: GeoJSON.GeoJsonObject;
  description?: string;
}

interface TravelMapProps {
  initialCountries: Country[];
  currentLocation: L.LatLngExpression;
}

const TravelMap: React.FC<TravelMapProps> = ({ initialCountries, currentLocation }) => {
  const [visitedCountries, setVisitedCountries] = useState<Country[] | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const fetchedCountries = await Promise.all(
        initialCountries.map(async (country) => {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?country=${country.name}&format=json&polygon_geojson=1`);
          const data = await response.json();
          if (data.length > 0 && data[0].geojson) {
            return { ...country, geojson: data[0].geojson as GeoJSON.GeoJsonObject };
          }
          return null;
        })
      );
      const visited = fetchedCountries.filter((country) => country !== null)
      //Getting a strange type error for what this returns that may or may not be relevant
      // @ts-ignore
      setVisitedCountries(visited);
    };

    fetchCountries();
  }, [initialCountries]);

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {!!visitedCountries && visitedCountries.map((country, index) => (
        country.geojson && (
            <GeoJSON
            key={index}
            data={country.geojson}
            style={{
              fillColor: "#ff7800",
              fillOpacity: 0.5,
              weight: 2,
              color: "#000"
            }}
          >
            <Tooltip sticky>
              <div>
                <h3>{country.name}</h3>
                <p>{country.description}</p>
              </div>
            </Tooltip>
          </GeoJSON>
        )
      ))}
      <Marker position={currentLocation}>
        <Popup>I am here now!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default TravelMap;