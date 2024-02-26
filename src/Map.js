import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";

const Map = () => {
  const hamiltonPosition = [43.2557, -79.8711]; // Hamilton, Ontario coordinates

  const [points, setPoints] = useState([]);
  const [autofillAddresses, setAutofill] = useState(null);
  // Custom icon options
  const customIcon = new Icon({
    iconUrl: require("./icon.png"),
    iconSize: [30, 30],
  });
  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent the default context menu

    // Add your custom functionality here
    console.log("Custom function triggered on right-click!");
  };

  const handleClick = (e) => {
    // Get the coordinates of the clicked location
    const { lat, lng } = e.latlng;

    // Set the coordinates in the state
    console.log(e);
    // Display the coordinates (you can replace this with your desired logic)
    alert(`Latitude: ${lat}\nLongitude: ${lng}`);
  };

  const LocationFind = () => {
    const map = useMapEvent({
      click(e) {
        console.log(e.latlng.lat);
        console.log(points);
        setPoints([...points, [e.latlng.lat, e.latlng.lng]]);
      },
    });
    return null;
  };

  const onInputChange = async (e) => {
    let inputValue = e.target.value;
    if (!inputValue) {
      setAutofill(null);
      return;
    }
    console.log(process.env.REACT_APP_LOCATIONIQ_URL);

    const options = { method: "GET", headers: { accept: "application/json" } };
    const res = await fetch(
      `${process.env.REACT_APP_LOCATIONIQ_URL}key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${inputValue}&limit=4&countrycodes=CA`,
      options,
    )
      .then((response) => response.json())
      .then((response) => {
        setAutofill(
          response.map((x) => ({
            name: x.display_place,
            address: x.display_name,
            lat: x.lat,
            lon: x.lon,
          })),
        );
      })
      .catch((err) => console.error(err));

    console.log("HERE", res);
  };
  const addMarker = (lat, lon) => {
    setPoints([...points, [lat, lon]]);
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="flex justify-between bg-slate-100 px-10">
        <p className="text-2xl">Brians App</p>
        <div className="my-auto flex gap-5">
          <p>Menu</p>
          <p>Contact</p>
          <p>Help</p>
        </div>
      </div>
      <div className="relative w-full flex-1">
        <MapContainer
          center={hamiltonPosition}
          zoom={13}
          className="h-full w-full"
          //style={{ height: "100%", width: "100%" }}
          onClick={handleClick}
        >
          <LocationFind />
          <TileLayer
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {points.map((pos, index) => (
            <Marker key={index} position={pos} icon={customIcon}>
              <Popup>
                Hamilton, Ontario
                <br />
                Latitude: {pos[0]}
                <br />
                Longitude: {pos[1]}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        <div className="absolute right-2 top-3 z-[10000] w-72 max-w-72 rounded-t px-2 py-1">
          <input
            className="w-full rounded px-2 py-1 shadow"
            placeholder="Search..."
            onChange={onInputChange}
          />
          <div className="rounded-b bg-white ">
            {autofillAddresses &&
              autofillAddresses.map(({ name, address, lat, lon }) => (
                <div
                  onClick={() => addMarker(lat, lon)}
                  className="rounded px-2 py-1 hover:bg-gray-100"
                >
                  <p className=" text-sm">{name}</p>
                  <p className="truncate text-xs text-gray-500">{address}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
