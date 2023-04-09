import "./MapPage.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useRef, useEffect, useState, useCallback } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MobileNav from "../../components/MobileNav/MobileNav";
import LocationToast from "../../components/LocationToast/LocationToast";
import {
  DELETE_MARKER,
  GET_MARKERS,
  POST_MARKER,
} from "../../utils/apiCalls.mjs";
import { useNavigate, useParams } from "react-router-dom";

const MapPage = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

  const navigate = useNavigate();

  const mapContainer = useRef(null);
  const map = useRef(null);
  const searchControl = useRef(null);

  const authToken = sessionStorage.getItem("authToken");

  if (!authToken) {
    navigate("/login");
  }

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
      if (error.response.status === 401) {
        navigate("/login");
      }
      console.log(error.message);
    }
  }, [authToken, groupId, navigate]);

  useEffect(() => {
    getMarkers();
  }, [authToken, groupId, getMarkers]);

  const noFeature = () => {
    setFeature();
    window.history.pushState({}, "", window.location.pathname);
  };

  const [searchAdded, setSearchAdded] = useState(false);

  // Initial load of map
  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    const loadAddImage = (colour) => {
      map.current.loadImage(
        `http://localhost:5050/images/marker-${colour}.png`,
        (error, image) => {
          if (error) throw error;
          map.current.addImage(`${colour}-marker`, image);
        }
      );
    };

    // excluding orange, which is default/backup colour
    const markerColours = [
      "pink",
      "blue",
      "grey",
      "purple",
      "red",
      "yellow",
      "green",
    ];

    map.current.on("load", () => {
      markerColours.forEach((colour) => {
        loadAddImage(colour);
      });

      map.current.setLayoutProperty("poi-label", "text-optional", true);

      // Marker image from our API
      map.current.loadImage(
        "http://localhost:5050/images/marker-orange.png",
        (error, image) => {
          if (error) throw error;
          map.current.addImage("orange-marker", image);
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
              "icon-image": [
                "case",
                ["==", ["get", "marker_colour"], "blue"],
                "blue-marker",
                ["==", ["get", "marker_colour"], "grey"],
                "grey-marker",
                ["==", ["get", "marker_colour"], "pink"],
                "pink-marker",
                ["==", ["get", "marker_colour"], "purple"],
                "purple-marker",
                ["==", ["get", "marker_colour"], "red"],
                "red-marker",
                ["==", ["get", "marker_colour"], "yellow"],
                "yellow-marker",
                ["==", ["get", "marker_colour"], "green"],
                "green-marker",
                "orange-marker",
              ],
              "icon-size": 0.125,
              // get the name from the source's "name" property
              "text-field": ["get", "name"],
              "text-font": [
                "Rubik Regular",
                "DIN Offc Pro Medium",
                "Arial Unicode MS Bold",
              ],
              "text-size": 12,
              "text-offset": [1, 1.5],
              "text-variable-anchor": ["top", "left", "right"],
              "icon-allow-overlap": true,
              // "icon-ignore-placement": true,
              "icon-padding": 0,
              "text-optional": true,
            },
            paint: {
              "text-opacity": ["step", ["zoom"], 0, 12.5, 1],
            },
          });
        }
      );
    });

    map.current.on("click", (e) => {
      console.log(e.point);
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ["poi-label", "transit-label", "points"],
      });

      console.log(features);

      // if user clicks somewhere that isn't a POI, close feature toast
      noFeature();

      const currentZoom = map.current.getZoom();
      console.log(currentZoom);

      if (features.length) {
        const feature = features[0];
        setFeature(feature);

        map.current.flyTo({
          center: [
            feature.geometry.coordinates[0],
            feature.geometry.coordinates[1],
          ],
          zoom: currentZoom > 15 ? currentZoom : 15,
          speed: 0.8,
        });
      }
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(7));
      setLat(map.current.getCenter().lat.toFixed(7));
      setZoom(map.current.getZoom().toFixed(2));
    });

    // Add geolocate control to the map.
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      }),
      "bottom-right"
    );

    searchControl.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      proximity: "ip",
      types: "poi, postcode, address",
      marker: false,
      zoom: 18,
    });

    map.current.addControl(searchControl.current, "top-left");

    setSearchAdded(true);
  }, [lat, lng, zoom]);

  const [showSearch, setShowSearch] = useState(false);

  // Search functionality
  useEffect(() => {
    if (!searchAdded) return;

    if (showSearch) {
      map.current.addControl(searchControl.current, "top-left");
      searchControl.current.clear();

      searchControl.current.on("result", (e) => {
        map.current.once("moveend", () => {
          // convert latLng coords to screen coords
          const pixelCoords = map.current.project(e.result.center);

          // reduce search area to reduce amount of features to loop through
          const bbox = [
            [pixelCoords.x - 100, pixelCoords.y - 100],
            [pixelCoords.x + 100, pixelCoords.y + 100],
          ];

          const searchFeatures = map.current.queryRenderedFeatures(bbox, {
            layers: ["poi-label", "transit-label", "points"],
          });

          // loop through the searchFeatures and find the wanted feature by name

          console.log(searchFeatures);
        });
      });
    } else {
      map.current.removeControl(searchControl.current);
    }
  }, [showSearch, searchAdded]);

  // add a new marker to markers array
  const addMarker = async (name, longitude, latitude, type, username) => {
    try {
      const newMarker = {
        name: name,
        longitude: longitude,
        latitude: latitude,
        type: type,
        username: username,
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
            username: marker.username,
            name: marker.name,
            type: marker.type,
            marker_colour: marker.marker_colour,
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

        const currentZoom = map.current.getZoom();

        map.current.flyTo({
          center: [
            feature.geometry.coordinates[0],
            feature.geometry.coordinates[1],
          ],
          zoom: currentZoom > 15 ? currentZoom : 15,
          speed: 0.8,
        });
      }
    }
  }, [markersAdded]);

  return (
    <>
      <main className="map-page">
        <div ref={mapContainer} className="map-container"></div>

        {feature && (
          <LocationToast
            feature={feature}
            addMarker={addMarker}
            deleteMarker={deleteMarker}
            setFeature={setFeature}
            noFeature={noFeature}
          />
        )}
      </main>
      <MobileNav showSearch={showSearch} setShowSearch={setShowSearch} />
    </>
  );
};

export default MapPage;
