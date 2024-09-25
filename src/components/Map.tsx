import dynamic from 'next/dynamic';
import React from 'react';

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

const ClientSideMap = dynamic(() => import('./ClientSideMap'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

const TravelMap: React.FC<TravelMapProps> = ({ initialCountries, currentLocation }) => {
  return <ClientSideMap initialCountries={initialCountries} currentLocation={currentLocation} />;
};

export default TravelMap;