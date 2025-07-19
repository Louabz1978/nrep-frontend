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
import PageContainer from "@/components/global/pageContainer/PageContainer";
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
  };
  // change the latitude when the user edits on the input field
  const handleLatitudeChange = () => {
    const lat = watch("latitude");
    if (lat && !isNaN(Number(lat))) {
      setMarkerPosition([Number(lat), markerPosition[1]]);
    }
  };

  // change the longitude when the user edits on the input field
  const handleLongitudeChange = () => {
    const lng = watch("longitude");
    if (lng && !isNaN(Number(lng))) {
      setMarkerPosition([markerPosition[0], Number(lng)]);
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

  const lat = watch("latitude");
  const lng = watch("longitude");
  useEffect(() => {
    if (lat && lng && !isNaN(Number(lat)) && !isNaN(Number(lng))) {
      setMarkerPosition([Number(lat), Number(lng)]);
    }
  }, [watch, lat, lng]);

  return (
    <PageContainer className="h-full overflow-auto ">
      <form
        id="features_step_form"
        className="mb-10 flex flex-col gap-[40px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="p-[40px] pt-[24px] flex flex-col gap-[40px]">
          <FormSectionHeader textSize="text-size40">
            معلومات الموقع
          </FormSectionHeader>

          <div>
            <div className="w-full flex justify-center items-center mb-10">
              <div className="w-[980px] h-[480px] flex items-center justify-center">
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
                  <Marker position={markerPosition} icon={regularMarkerIcon}>
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
            <div className="flex items-center justify-center flex-row w-full p-[10px] gap-[23px]">
              <Button
                variant={"semi-round"}
                style={{ width: "310px" }}
                onClick={getUserLocation}
              >
                الحصول على خطوط الطول/العرض من العنوان
              </Button>
              <Button
                style={{ width: "310px" }}
                variant={"semi-round-outline"}
                onClick={toggleSatelliteView}
              >
                {isSatelliteView
                  ? "عرض الخريطة العادية"
                  : "عرض الخريطة برؤية Google street"}
              </Button>
              <Button
                style={{ width: "310px" }}
                variant={"semi-round"}
                onClick={toggleManualMode}
              >
                {isManualMode ? "تعطيل التحديد اليدوي" : "تفعيل التحديد اليدوي"}
              </Button>
            </div>
          </div>

          {/* Second row: Inputs, 2 per row */}
          <div className="grid  lg:grid-cols-3 md:grid-cols-2 gap-x-[40px] gap-y-[24px]">
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
        <div className="flex justify-between w-full gap-4 px-[107px]">
          <PreviouseButton setCurrentStep={setCurrentStep} />
          <NextButton id={"general_step_form"} />
        </div>
      </form>
    </PageContainer>
  );
}

export default LocationStep;
