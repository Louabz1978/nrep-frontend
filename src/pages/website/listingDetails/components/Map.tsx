import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useState } from "react";
import { FaMap, FaSatelliteDish } from "react-icons/fa6";

type RenderMapTabProps = {
  dummyProperty: {
    latitude?: number | string;
    longitude?: number | string;
    DimensionsOfTheEarth?: number | string;
    propertyArea?: number | string;
  };
};

const RenderMapTab = ({ dummyProperty }: RenderMapTabProps) => {
  const [isSatellite, setIsSatellite] = useState(false);
  const [rotate, setRotate] = useState(false);

  const regularMarkerIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });

  const lat = dummyProperty.latitude
    ? Number(dummyProperty.latitude)
    : 34.7324273;
  const lng = dummyProperty.longitude
    ? Number(dummyProperty.longitude)
    : 36.7136959;
  const markerPosition = [lat, lng] as [number, number];

  return (
    <div className="p-3xl border-quaternary-border border-2 sticky">
      <div className="rounded-3xl max-w-200 m-auto">
        <div className="flex justify-end mb-2">
          <button
            data-html2canvas-ignore={true}
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-primary bg-tertiary-bg text-primary cursor-pointer shadow transition"
            onClick={() => {
              setRotate(true);
              setIsSatellite((prev) => !prev);
            }}
          >
            <span
              className={rotate ? "animate-rotate" : ""}
              onAnimationEnd={() => setRotate(false)}
            >
              {isSatellite ? (
                <FaMap size={20} />
              ) : (
                <FaSatelliteDish size={20} />
              )}
            </span>
          </button>
        </div>
        <div className="w-full h-96 rounded-md overflow-hidden">
          <MapContainer
            center={markerPosition}
            zoom={10}
            className="w-full h-full"
            scrollWheelZoom={true}
            attributionControl={false}
            zoomControl={true}
          >
            {isSatellite ? (
              <TileLayer
                attribution="Tiles © Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            ) : (
              <TileLayer
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            )}
            <Marker position={markerPosition} icon={regularMarkerIcon}>
              <Popup>
                الموقع المحدد
                <br />
                خط العرض: {lat.toFixed(2)}
                <br />
                خط الطول: {lng.toFixed(2)}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="flex justify-between items-center mt-[var(--spacing-4xl)] font-bold">
          <span>
            مصدر القياسات ( أبعاد الأرض ) :{dummyProperty.DimensionsOfTheEarth}
          </span>
          <span>
            مصدر القياسات ( مساحة الأرض ) :{dummyProperty.propertyArea}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RenderMapTab;
