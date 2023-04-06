import "./MapPage.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useRef, useEffect, useState, useCallback } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MobileNav from "../../components/MobileNav/MobileNav";
import LocationToast from "../../components/LocationToast/LocationToast";
import {
  DELETE_MARKER,
  GET_MARKERS,
  POST_MARKER,
} from "../../utils/apiCalls.mjs";
import { useParams } from "react-router-dom";

const MapPage = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

  const mapContainer = useRef(null);
  const map = useRef(null);

  const authToken = sessionStorage.getItem("authToken");

  const { groupId } = useParams();

  // default map position set at BStn
  const [lng, setLng] = useState(-0.081);
  const [lat, setLat] = useState(51.5263);
  const [zoom, setZoom] = useState(15);

  const [markers, setMarkers] = useState([]);
  const [feature, setFeature] = useState();

  // state to check if
  const [isSourceActive, setIsSourceActive] = useState(false);

  // Get the markers from DB

  const getMarkers = useCallback(async () => {
    try {
      const { data } = await GET_MARKERS(groupId, authToken);

      setMarkers(data);
    } catch (error) {
      console.log(error.message);
    }
  }, [authToken, groupId]);

  useEffect(() => {
    getMarkers();
  }, [authToken, groupId, getMarkers]);

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
      // Marker image from our API
      map.current.loadImage(
        "http://localhost:5050/images/marker-orange.png",
        (error, image) => {
          if (error) throw error;
          map.current.addImage("custom-marker", image);
          // Add GeoJSON source for markers
          map.current.addSource("points", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [],
            },
          });
          // Once source has been added, update state
          setIsSourceActive(true);

          // Add a symbol layer
          map.current.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              // get the name from the source's "name" property
              "text-field": ["get", "name"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 0.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });

    map.current.on("click", (e) => {
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ["poi-label", "transit-label", "points"],
      });

      // if user clicks somewhere that isn't a POI, close feature toast
      setFeature();
      window.history.pushState({}, "", window.location.pathname);

      if (features.length) {
        const feature = features[0];
        console.log(feature);
        setFeature(feature);
      }
    });
  });

  // add a new marker to markers array
  const addMarker = async (name, longitude, latitude) => {
    try {
      const newMarker = {
        name: name,
        longitude: longitude,
        latitude: latitude,
      };

      const addedMarker = await POST_MARKER(groupId, newMarker, authToken);

      getMarkers();

      return addedMarker;
    } catch (error) {
      console.log(error);
    }
  };

  // delete a marker
  const deleteMarker = async (markerId) => {
    try {
      await DELETE_MARKER(markerId, authToken);

      getMarkers();
    } catch (error) {
      console.log(error);
    }
  };

  const [markersAdded, setMarkersAdded] = useState(false);

  // Dynamically update markers on map when markers are changed
  useEffect(() => {
    // on first load, source is not active yet
    if (!map.current.getSource("points")) return;

    // convert markers to required GeoJSON format
    const addMarkers = () => {
      const ourFeatures = markers.map((marker) => {
        return {
          id: marker.id,
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [marker.longitude, marker.latitude],
          },

          properties: {
            name: marker.name,
          },
        };
      });

      const markersData = {
        type: "FeatureCollection",
        features: ourFeatures,
      };

      map.current.getSource("points").setData(markersData);
      setMarkersAdded(true);
    };

    addMarkers();
  }, [markers, isSourceActive]);

  // Pre-loading a feature if params in link
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = Number(searchParams.get("id"));

    if (id && map.current.getSource("points")) {
      let features = map.current.getSource("points")._data.features;
      let feature = features.find((feature) => feature.id === id);

      if (feature) {
        feature.layer = { id: "points" };
        setFeature(feature);
      }
    }
  }, [markersAdded]);

  return (
    <>
      <main className="map-page">
        <div ref={mapContainer} className="map-container" />

        {feature && (
          <LocationToast
            id={feature.id}
            locName={feature.properties.name}
            lng={feature.geometry.coordinates[0]}
            lat={feature.geometry.coordinates[1]}
            layer={feature.layer.id}
            addMarker={addMarker}
            deleteMarker={deleteMarker}
          />
        )}
      </main>
      <MobileNav />
    </>
  );
};

export default MapPage;
