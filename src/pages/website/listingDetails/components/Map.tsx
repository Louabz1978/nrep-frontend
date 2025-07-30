
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

type RenderMapTabProps = {
  dummyProperty: {
    latitude?: number | string;
    longitude?: number | string;
    DimensionsOfTheEarth?: number | string;
    propertyArea?: number | string;
  };
};

const RenderMapTab = ({ dummyProperty }: RenderMapTabProps) => {
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

  const lat =
    dummyProperty?.latitude !== undefined && dummyProperty?.latitude !== null
      ? Number(dummyProperty.latitude)
      : 34.7324273;
  const lng =
    dummyProperty?.longitude !== undefined && dummyProperty?.longitude !== null
      ? Number(dummyProperty.longitude)
      : 36.7136959;
  const markerPosition = [lat, lng] as [number, number];

  return (
    <div className="p-[var(--spacing-3xl)] border-quaternary-border border-2">
      <div className="rounded-3xl max-w-200 m-auto">
        <div className="w-full h-96 rounded-md overflow-hidden">
          <MapContainer
            center={markerPosition}
            zoom={15}
            className="w-full h-full rounded-2xl"
            scrollWheelZoom={true}
            attributionControl={false}
            zoomControl={true}
          >
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
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
            مصدر القياسات ( أبعاد الأرض ) :
            {dummyProperty.DimensionsOfTheEarth}
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
