import PageContainer from "@/components/global/pageContainer/PageContainer";
import NextButton from "@/components/global/form/button/NextButton";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import Accrodion from "@/components/global/accrodion/Accrodion";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import { FiMapPin } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdRealEstateAgent } from "react-icons/md";
import type { GeneralStepType } from "@/data/website/schema/ListingFormSchema";
import {
  cityChoices,
  yesNo,
  measurementSources,
  streetTypes,
  geoDirections,
} from "@/data/website/GeneralData";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface GeneralStepProps {
  form: UseFormReturn<GeneralStepType, any, GeneralStepType>;
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
    click: ({ latlng }) => {
      // if the manual mode is disabled, don't do anything
      if (!isManualMode) return;
      // if the manual mode is enabled, call the onMapClick function
      onMapClick(latlng.lat, latlng.lng);
    },
  });
  return null;
}

// general step component
function GeneralStep({ form, setCurrentStep }: GeneralStepProps) {
  // extract form utils
  const { handleSubmit, watch, setValue, trigger } = form;

  // State for each accordion section
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [isOpenThird, setIsOpenThird] = useState(false);

  const [markerPosition, setMarkerPosition] = useState<[number, number]>([
    34.7324, 36.7131,
  ]);
  const [isSatelliteView, setIsSatelliteView] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);

  const toggleStateFirst = () => setIsOpenFirst((prev) => !prev);
  const toggleStateSecond = () => setIsOpenSecond((prev) => !prev);
  const toggleStateThird = () => setIsOpenThird((prev) => !prev);

  const onSubmit = () => {
    setCurrentStep((prev) => prev + 1);
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

  useEffect(() => {
    const lat = watch("latitude");
    const lng = watch("longitude");

    if (lat && lng && !isNaN(Number(lat)) && !isNaN(Number(lng))) {
      setMarkerPosition([Number(lat), Number(lng)]);
    }
  }, [watch("latitude"), watch("longitude")]);

  return (
    <PageContainer className="h-full overflow-auto">
      <form id="general_step_form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row bg-[#FDF9EF]">
          <div className="min-h-100 flex w-full">
            <div className="rounded-lg text-black w-full mt-3">
              <Accrodion
                onClick={toggleStateFirst}
                title="معلومات عامة عن العقار"
                icon={<MdRealEstateAgent />}
                isOpen={isOpenFirst}
              >
                <div className="ps-[39px] pe-[71px] pb-[30px] grid lg:grid-cols-3 md:grid-cols-2 gap-x-[72px] gap-y-[56px]">
                  <Input
                    form={form}
                    label={"رقم تعريف العقار"}
                    placeholder={""}
                    name={"propertyId"}
                    type={"number"}
                    info={"hello"}
                  />
                  <Select
                    form={form}
                    label={"إخفاء رقم العقار"}
                    choices={yesNo}
                    showValue="label"
                    keyValue="value"
                    name={"hiddenPropertyId"}
                    placeholder={"نعم"}
                    info={"hello"}
                  />
                  <Select
                    form={form}
                    label={"المدينة"}
                    choices={cityChoices}
                    showValue="label"
                    keyValue="value"
                    name={"city"}
                    placeholder={"اختر المدينة"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"اسم الشارع"}
                    placeholder={"شارع الدبلان"}
                    name={"streetName"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"رقم الشارع"}
                    placeholder={"1234"}
                    name={"streetNumber"}
                    info={"hello"}
                  />
                  <Select
                    form={form}
                    label={"نوع الشارع"}
                    choices={streetTypes}
                    showValue="label"
                    keyValue="value"
                    name={"streetType"}
                    placeholder={"طريق عام"}
                    info={"hello"}
                  />
                  <Select
                    form={form}
                    label={"الاتجاه الجغرافي السابق"}
                    choices={geoDirections}
                    showValue="label"
                    keyValue="value"
                    name={"previousGeoDirection"}
                    placeholder={"شمال"}
                    info={"hello"}
                  />
                  <Select
                    form={form}
                    label={"الاتجاه الجغرافي اللاحق"}
                    choices={geoDirections}
                    showValue="label"
                    keyValue="value"
                    name={"nextGeoDirection"}
                    placeholder={"شمال"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"الرمز البريدي"}
                    placeholder={"33914"}
                    name={"postalCode"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"نوع تصميم المبنى"}
                    placeholder={""}
                    name={"buildingDesign"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"رقم المبنى"}
                    placeholder={"47"}
                    name={"buildingNumber"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"رقم الشقة"}
                    placeholder={"02"}
                    name={"apartmentNumber"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"المنطقة الجغرافية"}
                    placeholder={""}
                    name={"geoArea"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"كود التنظيم(العقاري)"}
                    placeholder={""}
                    name={"regulatoryCode"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"المشروع العقاري"}
                    placeholder={""}
                    name={"projectName"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"رمز المجمع"}
                    placeholder={""}
                    name={"projectCode"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"اسم المجمع السكني"}
                    placeholder={""}
                    name={"projectHomeName"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"نوع الوحدة العقارية"}
                    placeholder={""}
                    name={"unitType"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"اسم المطور العقاري"}
                    placeholder={""}
                    name={"developerName"}
                    info={"hello"}
                  />
                </div>
              </Accrodion>

              <Accrodion
                onClick={toggleStateSecond}
                title="فئة العقار : سكني"
                icon={<HiOutlineBuildingOffice2 />}
                isOpen={isOpenSecond}
              >
                <div className="ps-[39px] pe-[71px] pb-[30px] grid lg:grid-cols-3 md:grid-cols-2 gap-x-[72px] gap-y-[56px]">
                  <Input
                    form={form}
                    name="propertyStatus"
                    label="حالة العقار"
                    labelStyle="font-bold"
                    placeholder="معروض للبيع"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="offeredPrice"
                    type="number"
                    label="السعر المعروض"
                    labelStyle="font-bold"
                    placeholder="1,000,000 ل.س"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="yearBuilt"
                    type="number"
                    label="سنة البناء"
                    labelStyle="font-bold"
                    placeholder="2010"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="totalArea"
                    type="number"
                    label="المساحة الإجمالية التقريبية"
                    labelStyle="font-bold"
                    placeholder=""
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="livingArea"
                    type="number"
                    label="المساحة التقريبية للمعيشة"
                    labelStyle="font-bold"
                    placeholder=""
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="furnished"
                    label="مفروشة"
                    labelStyle="font-bold"
                    placeholder="غير مفروشة"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="bedrooms"
                    type="number"
                    label="عدد غرف النوم"
                    labelStyle="font-bold"
                    placeholder="3"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="bathroomsWithShower"
                    type="number"
                    label="عدد دورات المياه (مع دش)"
                    labelStyle="font-bold"
                    placeholder="2"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="bathroomsWithoutShower"
                    type="number"
                    label="عدد دورات المياه (بدون دش)"
                    labelStyle="font-bold"
                    placeholder="1"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="ceilingFans"
                    type="number"
                    label="عدد مراوح السقف"
                    labelStyle="font-bold"
                    placeholder="0"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="elevator"
                    label="مصعد"
                    labelStyle="font-bold"
                    placeholder="لا يوجد"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="garageSpaces"
                    type="number"
                    label="عدد مواقف الكراج"
                    labelStyle="font-bold"
                    placeholder="1"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="cableAvailable"
                    label="الكابل متوفر (التلفزيون/الإنترنت)"
                    labelStyle="font-bold"
                    placeholder="لا يوجد"
                    info={"hello"}
                  />
                </div>
              </Accrodion>

              <Accrodion
                onClick={toggleStateThird}
                title="البيانات الجغرافية و المستندات"
                icon={<FiMapPin />}
                isOpen={isOpenThird}
              >
                <div className="flex flex-col lg:flex-row-reverse items-start w-full gap-6 p-6">
                  <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[280px] mb-4">
                    <button
                      type="button"
                      onClick={getUserLocation}
                      className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white rounded-xl py-3 px-4 font-bold text-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      الحصول على خطوط الطول/العرض من العنوان
                    </button>
                    <button
                      type="button"
                      onClick={toggleManualMode}
                      title={
                        isManualMode
                          ? "تعطيل التحديد اليدوي"
                          : "تفعيل التحديد اليدوي"
                      }
                      className={`rounded-xl cursor-pointer py-3 px-4 font-bold text-lg shadow-lg transition-all duration-200 transform hover:scale-105 ${
                        isManualMode
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {isManualMode
                        ? "تعطيل التحديد اليدوي"
                        : "تفعيل التحديد اليدوي"}
                    </button>
                    <button
                      type="button"
                      onClick={toggleSatelliteView}
                      className={`border-2 cursor-pointer border-blue-600 text-blue-600 rounded-xl py-3 px-4 font-bold text-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 ${
                        isSatelliteView
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : ""
                      }`}
                    >
                      {isSatelliteView
                        ? "عرض الخريطة العادية"
                        : "عرض الخريطة برؤية Google street"}
                    </button>
                  </div>

                  <div className="w-full lg:flex-1">
                    <div className="w-160 h-[350px] rounded-2xl overflow-hidden shadow-2xl mb-6 relative border-2 border-gray-200">
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
                        <Marker
                          position={markerPosition}
                          icon={regularMarkerIcon}
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 mr-50 mb-10 gap-x-8 gap-y-6 w-full max-w-[900px] mt-2">
                  <Input
                    form={form}
                    label={"خط العرض (Latitude)"}
                    placeholder={"34.7324"}
                    name={"latitude"}
                    type={"number"}
                    numberRegex={/^\d*.\d*$/}
                    onChange={handleLatitudeChange}
                    info={"أدخل خط العرض أو انقر على الخريطة"}
                  />
                  <Input
                    form={form}
                    label={"خط الطول (Longitude)"}
                    placeholder={"36.7131"}
                    name={"longitude"}
                    type={"number"}
                    numberRegex={/^\d*.\d*$/}
                    onChange={handleLongitudeChange}
                    info={"أدخل خط الطول أو انقر على الخريطة"}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 mr-50 mb-10 gap-x-8 gap-y-6 w-full max-w-[900px] mt-2">
                  <Select
                    form={form}
                    label={"مصدر القياسات (مساحة الأرض)"}
                    name={"landAreaSource"}
                    choices={measurementSources}
                    showValue="label"
                    keyValue="value"
                    placeholder={"اختر المصدر"}
                    info={"معلومات عن مصدر القياس"}
                  />
                  <Select
                    form={form}
                    label={"مصدر القياسات (أبعاد الأرض)"}
                    name={"landDimensionsSource"}
                    choices={measurementSources}
                    showValue="label"
                    keyValue="value"
                    placeholder={"اختر المصدر"}
                    info={"معلومات عن مصدر القياس"}
                  />
                  <Select
                    form={form}
                    label={"مصدر القياسات (المساحة الكلية)"}
                    name={"totalAreaSource"}
                    choices={measurementSources}
                    showValue="label"
                    keyValue="value"
                    placeholder={"اختر المصدر"}
                    info={"معلومات عن مصدر القياس"}
                  />
                  <Select
                    form={form}
                    label={"مصدر القياسات (المساحة السكنية)"}
                    name={"residentialAreaSource"}
                    choices={measurementSources}
                    showValue="label"
                    keyValue="value"
                    placeholder={"اختر المصدر"}
                    info={"معلومات عن مصدر القياس"}
                  />
                </div>
              </Accrodion>

              <div className="flex justify-center w-full gap-4 mb-4 mt-3">
                <NextButton title={"التالي"} id={"general_step_form"} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </PageContainer>
  );
}

export default GeneralStep;
