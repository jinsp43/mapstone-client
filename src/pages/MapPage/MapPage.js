import "./MapPage.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MobileNav from "../../components/MobileNav/MobileNav";

const MapPage = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

  const mapContainer = useRef(null);
  const map = useRef(null);

  // default map position set at BStn
  const [lng, setLng] = useState(-0.081);
  const [lat, setLat] = useState(51.5263);
  const [zoom, setZoom] = useState(16.2);

  // the state way
  const [markers, setMarkers] = useState([
    {
      title: "Keu!",
      longitude: -0.0815,
      latitude: 51.5266,
    },
    {
      title: "Island Poke",
      longitude: -0.0807,
      latitude: 51.5248,
    },
    {
      title: "Subway",
      longitude: -0.081,
      latitude: 51.5249,
    },
  ]);

  // example markers array - the vanilla way
  //   const markers = [
  //     {
  //       title: "Keu!",
  //       longitude: -0.0815,
  //       latitude: 51.5266,
  //     },
  //     {
  //       title: "Island Poke",
  //       longitude: -0.0807,
  //       latitude: 51.5248,
  //     },
  //     {
  //       title: "Subway",
  //       longitude: -0.081,
  //       latitude: 51.5249,
  //     },
  //   ];

  let features;
  let markersData;

  // convert markers to required GeoJSON format
  const markersToData = () => {
    features = markers.map((marker) => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [marker.longitude, marker.latitude],
        },

        properties: {
          title: marker.title,
        },
      };
    });

    markersData = {
      type: "FeatureCollection",
      features: features,
    };
  };

  markersToData();

  // Initial load of map
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", () => {
      // Add an image to use as a custom marker
      map.current.loadImage(
        "http://localhost:5050/images/marker-orange.png",
        (error, image) => {
          if (error) throw error;
          map.current.addImage("custom-marker", image);
          // Add a GeoJSON source
          map.current.addSource("points", {
            type: "geojson",
            data: markersData,
          });

          // Add a symbol layer
          map.current.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              // get the title name from the source's "title" property
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });
  });

  const clickHandler = () => {
    // markers.push({
    //   title: "BrainStation",
    //   longitude: -0.081,
    //   latitude: 51.5263,
    // });

    setMarkers([
      ...markers,
      {
        title: "BrainStation",
        longitude: -0.081,
        latitude: 51.5263,
      },
    ]);

    // === the vanilla way
    // loop over markers to turn them into needed format
    // markersToData();

    // console.log(markersData.features);
    // map.current.getSource("points").setData(markersData);
  };

  // === the state & useEffect way
  useEffect(() => {
    if (!map.current.getSource("points")) return;
    markersToData();
    console.log(markersData.features);
    map.current.getSource("points").setData(markersData);
  }, [markers]);

  return (
    <>
      <main className="map-page">
        <div ref={mapContainer} className="map-container" />
      </main>
      <MobileNav addPlace={clickHandler} />
    </>
  );
};

export default MapPage;
