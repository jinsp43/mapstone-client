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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { pin } from "../../utils/pin.mjs";
import PlacesList from "../../components/PlacesList/PlacesList";
import Profile from "../../components/Profile/Profile";
import MapHeader from "../../components/MapHeader/MapHeader";
import MembersList from "../../components/MembersList/MembersList";
import Header from "../../components/Header/Header";
import GroupsList from "../../components/GroupsList/GroupsList";

const MapPage = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

  const navigate = useNavigate();

  const mapContainer = useRef(null);
  const map = useRef(null);
  const searchControl = useRef(null);
  const featureMarker = useRef(null);

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

  // Define the custom marker element
  const markerElement = document.createElement("div");
  markerElement.innerHTML = pin;

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

    // marker used for when a feature is selected
    featureMarker.current = new mapboxgl.Marker({ element: markerElement });

    // excluding orange, which is default/backup colour
    const markerColours = [
      "blue",
      "green",
      "grey",
      "light-blue",
      "light-green",
      "pink",
      "purple",
      "red",
      "yellow",
    ];

    const loadAddImage = (colour) => {
      map.current.loadImage(
        `http://localhost:5050/images/marker-${colour}.png`,
        (error, image) => {
          if (error) throw error;
          map.current.addImage(`${colour}-marker`, image);
        }
      );
    };

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
                ["==", ["get", "marker_colour"], "light-green"],
                "light-green-marker",
                ["==", ["get", "marker_colour"], "light-blue"],
                "light-blue-marker",
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
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ["poi-label", "transit-label", "points"],
      });

      // if user clicks somewhere that isn't a POI, close feature toast
      noFeature();

      if (features.length) {
        const feature = features[0];
        setFeature(feature);
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
      zoom: 18.7,
      flyTo: { speed: 1.6 },
    });

    map.current.addControl(searchControl.current, "top-left");

    setSearchAdded(true);
  }, [lat, lng, zoom, markerElement]);

  const [showSearch, setShowSearch] = useState(false);

  // fly to and add marker when feature is selected
  useEffect(() => {
    if (!feature) {
      featureMarker.current.remove();
      return;
    }

    featureMarker.current
      .setLngLat(feature.geometry.coordinates)
      .addTo(map.current);

    const currentZoom = map.current.getZoom();

    map.current.flyTo({
      center: [
        feature.geometry.coordinates[0],
        feature.geometry.coordinates[1],
      ],
      zoom: currentZoom > 15 ? currentZoom : 15,
      speed: 0.8,
    });
  }, [feature]);

  // Search functionality
  useEffect(() => {
    if (!searchAdded) return;

    if (showSearch) {
      closeAll();

      map.current.addControl(searchControl.current, "top-left");
      searchControl.current.clear();

      searchControl.current.on("result", (e) => {
        setFeature();
        map.current.once("moveend", () => {
          // convert latLng coords to screen coords
          const pixelCoords = map.current.project(e.result.center);

          // reduce search area to reduce amount of features to loop through
          const bbox = [
            [pixelCoords.x - 125, pixelCoords.y - 125],
            [pixelCoords.x + 125, pixelCoords.y + 125],
          ];

          const searchFeatures = map.current.queryRenderedFeatures(bbox, {
            layers: ["poi-label", "transit-label", "points"],
          });

          // loop through the searchFeatures and find the wanted feature by name
          const searchFeature = searchFeatures.find(
            (feature) => feature.properties.name === e.result.text
          );

          setFeature(searchFeature);
        });
      });
    } else {
      map.current.removeControl(searchControl.current);
    }
  }, [showSearch, searchAdded]);

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
            user_id: marker.user_id,
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
  const searchParams = new URLSearchParams(window.location.search);
  const searchParamsId = Number(searchParams.get("id"));

  useEffect(() => {
    const getFeatureFromParams = () => {
      if (searchParamsId && map.current.getSource("points")) {
        const features = map.current.getSource("points")._data.features;
        const feature = features.find(
          (feature) => feature.id === searchParamsId
        );

        if (feature) {
          feature.layer = { id: "points" };
          setFeature(feature);
        }
      }
    };

    getFeatureFromParams();
  }, [markersAdded, searchParamsId]);

  // === MODALS ===
  const location = useLocation();

  const closeAll = () => {
    setHideGroups(true);
    setShowMembers(false);
    setShowPlacesList(false);
    setShowProfile(false);
  };

  const [hideGroups, setHideGroups] = useState(true);

  const [showMembers, setShowMembers] = useState(false);

  const [showPlacesList, setShowPlacesList] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  // open corresponding modal depending on params
  useEffect(() => {
    closeAll();

    const modalToOpen = location.pathname.split("/")[3];

    if (modalToOpen === "members") {
      setShowMembers(true);
    } else if (modalToOpen === "places") {
      setShowPlacesList(true);
    } else if (modalToOpen === "profile") {
      setShowProfile(true);
    } else if (modalToOpen === "groups") {
      setHideGroups(false);
    }
  }, [location]);

  return (
    <>
      <main className="map-page">
        <Header groupId={groupId} icons={true} map={true} />
        <MapHeader groupId={groupId} />

        <GroupsList modal={hideGroups} />

        <MembersList show={showMembers} />

        <PlacesList groupId={groupId} show={showPlacesList} markers={markers} />

        <Profile groupId={groupId} show={showProfile} />

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
      <MobileNav
        groupId={groupId}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
    </>
  );
};

export default MapPage;
