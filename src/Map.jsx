import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Data from './Data';
import Card from './Card';
import axios from 'axios';

const Map = () => {
  const mapRef = useRef();
  const [searchValue, setSearchValue] = useState('');
  const [country, setCountry] = useState([]);

  const handleSearch = () => {
    axios
      .get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchValue}`)
      .then((response) => {
        if (response.data.length > 0) {
          const countryData = response.data[0];
          const countryCoordinates = [parseFloat(countryData.lat), parseFloat(countryData.lon)];
          setCountry({ name: countryData.display_name, coordinates: countryCoordinates });
          mapRef.current.flyTo(countryCoordinates, 5);
        } else {
          setCountry(null);
          alert('Country not found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
      });
  };

  const SearchControl = () => {
    useMapEvents({
      search: (e) => {
        setSearchValue(e.text);
        handleSearch();
      },
    });
    return null;
  };

  return (
    <div>
      <div className='map-div1'>
        <select className='map-select'
          value={searchValue}
          onChange={(e)=>setSearchValue(e.target.value)}
          style={{ width: 200, marginRight: 10 }}
          dropdownRender={(menu) => (
            <div>
              {menu}
            </div>
          )}
        >
          <option hidden>Select a Country</option>
          <option className='map-option' key="1" value="United States">United States</option>
          <option className='map-option' key="2" value="India">India</option>
          <option className='map-option' key="3" value="United Kingdom">United Kingdom</option>
        </select>
        <button className='map-btn' onClick={handleSearch}>Search</button>
      </div>
      <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }} ref={mapRef}>
        <SearchControl />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      {Data.map((x)=>{
          return <div>{x.namee===country.name && <Card
            id={x.key}
            namee={x.namee}
            currency={x.currency}
            speed={x.speed}
            distance={x.distance}
            volume={x.volume}
            timezone={x.timezone}
          />}</div>}
      )}
    </div>
  );
};
export default Map;