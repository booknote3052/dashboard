import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import React from "react";
import "../../assets/css/App.css";

const Maps = () =>   {
  const [allcase, setAllcase] = React.useState();
  const center = useMemo(() => ({ lat: 13.7884586, lng: 100.6083957}), []);
  React.useEffect(() => {
    async function getJSON() {
      let arr = [];
      const response = await fetch("http://localhost:3333/getmap", {
        method: "GET", // or 'PUT'
      });

      const sum = await response.json();
      for(let i=0;i<sum.length;i++ ){
        const obj = {lat :parseFloat(sum[i].lat),lng :parseFloat(sum[i].lng)};
     
        arr.push(obj);
      }
      setAllcase(arr);
    }
    getJSON();
  }, []);
 
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:"AIzaSyBJNF1WF1PZ072rIlzasimj-wEVnaCu2WY",
  });
 

  const onLoad = (map) => {
   
    const bounds = new google.maps.LatLngBounds();
    allcase?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  return (
    <div className="Maps">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap mapContainerClassName="map-container" center={center} zoom={10}>
          {allcase?.map(({ lat, lng }) => (
            <Marker position={{ lat, lng }} />
          ))}
          
        </GoogleMap>
      )}
    </div>
  );
};
export default Maps;


