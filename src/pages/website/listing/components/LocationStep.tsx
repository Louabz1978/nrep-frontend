import { useState, useEffect, type Dispatch } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { type UseFormReturn } from "react-hook-form";
import type { LocationStepType } from "@/data/website/schema/ListingFormSchema";
import type { SetStateAction } from "jotai";
import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PreviouseButton from "@/components/global/form/button/PreviouseButton";
import NextButton from "@/components/global/form/button/NextButton";

interface LocationStepProps {
  form: UseFormReturn<LocationStepType>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

// handle the map click event
function MapClickHandler({
  onMapClick,
  isManualMode,
}: {
  onMapClick: (lat: number, lng: number) => void;
  isManualMode: boolean;
}) {
  useMapEvents({
    click: (e: { latlng: { lat: number; lng: number } }) => {
      if (!isManualMode) return;
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function LocationStep({ form, setCurrentStep }: LocationStepProps) {
  // extract form utils
  const { handleSubmit, watch, setValue, trigger } = form;

  const [markerPosition, setMarkerPosition] = useState<[number, number]>([
    34.7324273, 36.7136959,
  ]);
  const [isSatelliteView, setIsSatelliteView] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const [address, setAddress] = useState<string>("");

  // fetch address from coordinates
  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=ar`
      );
      const data = await response.json();
      const fetchedAddress = data.display_name || "";
      setAddress(fetchedAddress);
      setValue("address", fetchedAddress); // set in form
    } catch (error) {
      setAddress("");
      setValue("address", "");
    }
  };

  // handle submit form
  const onSubmit = (data: LocationStepType) => {
    setCurrentStep((prev) => prev + 1);
    console.log(data);
  };

  // choose the location on the map by clicking on the map
  const handleMapClick = (lat: number, lng: number) => {
    setMarkerPosition([lat, lng]);
    setValue("latitude", lat);
    setValue("longitude", lng);
    void trigger(["latitude", "longitude"]);
    fetchAddress(lat, lng);
  };
  // change the latitude when the user edits on the input field
  const handleLatitudeChange = () => {
    const lat = watch("latitude");
    if (lat && !isNaN(Number(lat))) {
      setMarkerPosition([Number(lat), markerPosition[1]]);
      fetchAddress(Number(lat), markerPosition[1]);
    }
  };

  // change the longitude when the user edits on the input field
  const handleLongitudeChange = () => {
    const lng = watch("longitude");
    if (lng && !isNaN(Number(lng))) {
      setMarkerPosition([markerPosition[0], Number(lng)]);
      fetchAddress(markerPosition[0], Number(lng));
    }
  };

  // get the user location by clicking on the button
  const getUserLocation = () => {
    // check if the browser supports geolocation
    if (navigator.geolocation) {
      // get the user location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition([latitude, longitude]);
          setValue("latitude", latitude);
          setValue("longitude", longitude);
          void trigger(["latitude", "longitude"]);
          fetchAddress(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  // toggle the manual mode by clicking on the button
  const toggleManualMode = () => {
    setIsManualMode((prev) => !prev);
  };

  // toggle the satellite view by clicking on the button
  const toggleSatelliteView = () => {
    setIsSatelliteView(!isSatelliteView);
  };

  // fix the leaflet icon for the marker
  useEffect(() => {
    // @ts-expect-error - Leaflet icon fix for Vite/React
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });
  }, []);

  // create the regular marker icon
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

  const latitude = watch("latitude");
  const longitude = watch("longitude");
  useEffect(() => {
    if (latitude && longitude && !isNaN(Number(latitude)) && !isNaN(Number(longitude))) {
      setMarkerPosition([Number(latitude), Number(longitude)]);
      fetchAddress(Number(latitude), Number(longitude));
    }
  }, [latitude, longitude]);

  return (
    <AnimateContainer>
      <form
        id="location_step_form"
        className="flex flex-col flex-1 gap-6xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* inputs */}
        <div className="flex-1">
          <div className="flex flex-col gap-3xl">
            <FormSectionHeader>معلومات الموقع</FormSectionHeader>

            {/* map */}
            <div className="flex flex-col lg:gap-5xl gap-2xl lg:px-[150px] px-0">
              {/* map view */}
              <div className="w-full flex justify-center items-center">
                <div className="w-full h-[480px] flex items-center justify-center">
                  <MapContainer
                    center={markerPosition}
                    zoom={10}
                    className="w-full h-full"
                    scrollWheelZoom={true}
                    attributionControl={false}
                    zoomControl={true}
                  >
                    <TileLayer
                      attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url={
                        isSatelliteView
                          ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                          : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      }
                    />
                    {/* Marker for the selected location on the map */}
                    <Marker
                      position={markerPosition}
                      icon={regularMarkerIcon}
                      draggable={isManualMode} // Allow dragging if manual mode is enabled
                      eventHandlers={{
                        // When the marker is dragged and dropped
                        dragend: (e) => {
                          const marker = e.target;
                          const position = marker.getLatLng();
                          // Update marker position state
                          setMarkerPosition([position.lat, position.lng]);
                          // Update form values for latitude and longitude
                          setValue("latitude", position.lat);
                          setValue("longitude", position.lng);
                          // Trigger validation for latitude and longitude fields
                          void trigger(["latitude", "longitude"]);
                          // Fetch address for the new coordinates
                          fetchAddress(position.lat, position.lng);
                        },
                      }}
                    >
                      <Popup>
                        الموقع المحدد
                        <br />
                        خط العرض: {markerPosition[0].toFixed(6)}
                        <br />
                        خط الطول: {markerPosition[1].toFixed(6)}
                      </Popup>
                    </Marker>
                    <MapClickHandler
                      onMapClick={handleMapClick}
                      isManualMode={isManualMode}
                    />
                  </MapContainer>
                </div>
              </div>
              {/* buttons */}
              <div className="flex justify-center lg:flex-row flex-col w-full lg:gap-2xl gap-lg">
                <Button
                  variant={"semi-round"}
                  className="lg:flex-1 max-lg:w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    getUserLocation();
                  }}
                >
                  الحصول على خطوط الطول/العرض من العنوان
                </Button>
                <Button
                  className="lg:flex-1 max-lg:w-full"
                  variant={"semi-round-outline"}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSatelliteView();
                  }}
                >
                  {isSatelliteView
                    ? "عرض الخريطة العادية"
                    : "عرض الخريطة برؤية Google street"}
                </Button>
                <Button
                  className="lg:flex-1 max-lg:w-full"
                  variant={"semi-round"}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleManualMode();
                  }}
                >
                  {isManualMode
                    ? "تعطيل التحديد اليدوي"
                    : "تفعيل التحديد اليدوي"}
                </Button>
              </div>
            </div>

            {/* Second row: Inputs, 2 per row */}
            <div className="mt-xl grid xl:grid-cols-3 md:grid-cols-2 gap-x-5xl gap-y-3xl">
              <Input
                form={form}
                label={"خط العرض (Latitude)"}
                placeholder={"34.7324"}
                name={"latitude"}
                type={"number"}
                numberRegex={/^\d*\.?\d*$/}
                onChange={handleLatitudeChange}
                info={"أدخل خط العرض أو انقر على الخريطة"}
              />
              <Input
                form={form}
                label={"خط الطول (Longitude)"}
                placeholder={"36.7131"}
                name={"longitude"}
                type={"number"}
                numberRegex={/^\d*\.?\d*$/}
                onChange={handleLongitudeChange}
                info={"أدخل خط الطول أو انقر على الخريطة"}
              />
              <Input
                form={form}
                label={"العنوان (Address)"}
                placeholder={"محافظة حمص"}
                name={"address"}
                type={"text"}
                info={"يمكنك تعديل العنوان أو تركه تلقائياً"}
              />
              <Select
                form={form}
                label={"مصدر القياسات (مساحة الأرض)"}
                name={"landAreaSource"}
                placeholder={"اختر المصدر"}
                info={"معلومات عن مصدر القياس"}
              />
              <Select
                form={form}
                label={"مصدر القياسات (أبعاد الأرض)"}
                name={"landDimensionsSource"}
                placeholder={"اختر المصدر"}
                info={"معلومات عن مصدر القياس"}
              />
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="flex justify-between w-full gap-xl">
          <PreviouseButton setCurrentStep={setCurrentStep} />
          <NextButton id={"location_step_form"} />
        </div>
      </form>
    </AnimateContainer>
  );
}

export default LocationStep;
