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
import { cityChoices, yesNo, measurementSources, streetTypes, geoDirections } from "@/data/website/GeneralData";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface GeneralStepProps {
  form: UseFormReturn<any>;
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
  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
  } = form;

  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [isOpenThird, setIsOpenThird] = useState(false);

  const [markerPosition, setMarkerPosition] = useState<[number, number]>([34.7324, 36.7131]);
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
    if (isManualMode) {
      setIsManualMode(false);
    }
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
          setIsManualMode(false);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  // enable the manual mode by clicking on the button
  const enableManualMode = () => {
    setIsManualMode(true);
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
                    errors={errors}
                    label={"رقم تعريف العقار"}
                    placeholder={""}
                    name={"propertyId"}
                    type={"number"}
                    setValue={setValue}
                    trigger={trigger}
                    register={register}
                    info={"hello"}
                  />
                  <Select
                    label={"إخفاء رقم العقار"}
                    trigger={trigger}
                    setValue={setValue}
                    watch={watch}
                    choices={yesNo}
                    showValue="label"
                    keyValue="value"
                    register={register}
                    errors={errors}
                    name={"hiddenPropertyId"}
                    placeholder={"نعم"}
                    info={"hello"}
                  />
                  <Select
                    label={"المدينة"}
                    trigger={trigger}
                    setValue={setValue}
                    watch={watch}
                    choices={cityChoices}
                    showValue="label"
                    keyValue="value"
                    register={register}
                    errors={errors}
                    name={"city"}
                    placeholder={"اختر المدينة"}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"اسم الشارع"}
                    placeholder={"شارع الدبلان"}
                    name={"streetName"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"رقم الشارع"}
                    placeholder={"1234"}
                    name={"streetNumber"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Select
                    label={"نوع الشارع"}
                    trigger={trigger}
                    setValue={setValue}
                    watch={watch}
                    choices={streetTypes}
                    showValue="label"
                    keyValue="value"
                    register={register}
                    errors={errors}
                    name={"streetType"}
                    placeholder={"طريق عام"}
                    info={"hello"}
                  />
                  <Select
                    label={"الاتجاه الجغرافي السابق"}
                    trigger={trigger}
                    setValue={setValue}
                    watch={watch}
                    choices={geoDirections}
                    showValue="label"
                    keyValue="value"
                    register={register}
                    errors={errors}
                    name={"previousGeoDirection"}
                    placeholder={"شمال"}
                    info={"hello"}
                  />
                  <Select
                    label={"الاتجاه الجغرافي اللاحق"}
                    trigger={trigger}
                    setValue={setValue}
                    watch={watch}
                    choices={geoDirections}
                    showValue="label"
                    keyValue="value"
                    register={register}
                    errors={errors}
                    name={"nextGeoDirection"}
                    placeholder={"شمال"}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"الرمز البريدي"}
                    placeholder={"33914"}
                    name={"postalCode"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"نوع تصميم المبنى"}
                    placeholder={""}
                    name={"buildingDesign"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"رقم المبنى"}
                    placeholder={"47"}
                    name={"buildingNumber"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"رقم الشقة"}
                    placeholder={"02"}
                    name={"apartmentNumber"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"المنطقة الجغرافية"}
                    placeholder={""}
                    name={"geoArea"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"كود التنظيم(العقاري)"}
                    placeholder={""}
                    name={"regulatoryCode"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"المشروع العقاري"}
                    placeholder={""}
                    name={"projectName"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"رمز المجمع"}
                    placeholder={""}
                    name={"projectCode"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"اسم المجمع السكني"}
                    placeholder={""}
                    name={"projectHomeName"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"نوع الوحدة العقارية"}
                    placeholder={""}
                    name={"unitType"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"اسم المطور العقاري"}
                    placeholder={""}
                    name={"developerName"}
                    type={"text"}
                    register={register}
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
                    name="propertyStatus"
                    label="حالة العقار"
                    labelStyle="font-bold"
                    placeholder="معروض للبيع"
                    errors={errors}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    name="offeredPrice"
                    type="number"
                    label="السعر المعروض"
                    labelStyle="font-bold"
                    placeholder="1,000,000 ل.س"
                    errors={errors}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    name="yearBuilt"
                    type="number"
                    label="سنة البناء"
                    labelStyle="font-bold"
                    placeholder="2010"
                    errors={errors}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    name="totalArea"
                    type="number"
                    label="المساحة الإجمالية التقريبية"
                    labelStyle="font-bold"
                    placeholder=""
                    errors={errors}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    name="livingArea"
                    type="number"
                    label="المساحة التقريبية للمعيشة"
                    labelStyle="font-bold"
                    placeholder=""
                    errors={errors}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    name="furnished"
                    label="مفروشة"
                    labelStyle="font-bold"
                    placeholder="غير مفروشة"
                    errors={errors}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    name="bedrooms"
                    type="number"
                    label="عدد غرف النوم"
                    labelStyle="font-bold"
                    placeholder="3"
                    errors={errors}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    name="bathroomsWithShower"
                    type="number"
                    label="عدد دورات المياه (مع دش)"
                    labelStyle="font-bold"
                    placeholder="2"
                    errors={errors}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    name="bathroomsWithoutShower"
                    type="number"
                    label="عدد دورات المياه (بدون دش)"
                    labelStyle="font-bold"
                    placeholder="1"
                    errors={errors}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    name="ceilingFans"
                    type="number"
                    label="عدد مراوح السقف"
                    labelStyle="font-bold"
                    placeholder="0"
                    errors={errors}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    name="elevator"
                    label="مصعد"
                    labelStyle="font-bold"
                    placeholder="لا يوجد"
                    errors={errors}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    name="garageSpaces"
                    type="number"
                    label="عدد مواقف الكراج"
                    labelStyle="font-bold"
                    placeholder="1"
                    errors={errors}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    name="cableAvailable"
                    label="الكابل متوفر (التلفزيون/الإنترنت)"
                    labelStyle="font-bold"
                    placeholder="لا يوجد"
                    errors={errors}
                    register={register}
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
                      onClick={enableManualMode}
                      title={isManualMode ? 'تعطيل التحديد اليدوي' : 'تفعيل التحديد اليدوي'}
                      className={`rounded-xl cursor-pointer py-3 px-4 font-bold text-lg shadow-lg transition-all duration-200 transform hover:scale-105 ${isManualMode
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                      {isManualMode ? 'تعطيل التحديد اليدوي' : 'تفعيل التحديد اليدوي'}
                    </button>
                    <button
                      type="button"
                      onClick={toggleSatelliteView}
                      className={`border-2 cursor-pointer border-blue-600 text-blue-600 rounded-xl py-3 px-4 font-bold text-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 ${isSatelliteView ? 'bg-blue-600 text-white hover:bg-blue-700' : ''
                        }`}
                    >
                      {isSatelliteView ? 'عرض الخريطة العادية' : 'عرض الخريطة برؤية Google street'}
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
                        <MapClickHandler onMapClick={handleMapClick} isManualMode={isManualMode} />
                      </MapContainer>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 mr-50 mb-10 gap-x-8 gap-y-6 w-full max-w-[900px] mt-2">
                  <Input
                    errors={errors}
                    label={"خط العرض (Latitude)"}
                    placeholder={"34.7324"}
                    name={"latitude"}
                    type={"number"}
                    step={0.000001}
                    register={register}
                    onChange={handleLatitudeChange}
                    info={"أدخل خط العرض أو انقر على الخريطة"}
                  />
                  <Input
                    errors={errors}
                    label={"خط الطول (Longitude)"}
                    placeholder={"36.7131"}
                    name={"longitude"}
                    type={"number"}
                    step={0.000001}
                    register={register}
                    onChange={handleLongitudeChange}
                    info={"أدخل خط الطول أو انقر على الخريطة"}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 mr-50 mb-10 gap-x-8 gap-y-6 w-full max-w-[900px] mt-2">
                  <Select
                    label={"مصدر القياسات (مساحة الأرض)"}
                    name={"landAreaSource"}
                    setValue={setValue}
                    trigger={trigger}
                    watch={watch}
                    choices={measurementSources}
                    showValue="label"
                    keyValue="value"
                    register={register}
                    errors={errors}
                    placeholder={"اختر المصدر"}
                    info={"معلومات عن مصدر القياس"}
                  />
                  <Select
                    label={"مصدر القياسات (أبعاد الأرض)"}
                    name={"landDimensionsSource"}
                    setValue={setValue}
                    trigger={trigger}
                    watch={watch}
                    choices={measurementSources}
                    showValue="label"
                    keyValue="value"
                    register={register}
                    errors={errors}
                    placeholder={"اختر المصدر"}
                    info={"معلومات عن مصدر القياس"}
                  />
                  <Select
                    label={"مصدر القياسات (المساحة الكلية)"}
                    name={"totalAreaSource"}
                    setValue={setValue}
                    trigger={trigger}
                    watch={watch}
                    choices={measurementSources}
                    showValue="label"
                    keyValue="value"
                    register={register}
                    errors={errors}
                    placeholder={"اختر المصدر"}
                    info={"معلومات عن مصدر القياس"}
                  />
                  <Select
                    label={"مصدر القياسات (المساحة السكنية)"}
                    name={"residentialAreaSource"}
                    setValue={setValue}
                    trigger={trigger}
                    watch={watch}
                    choices={measurementSources}
                    showValue="label"
                    keyValue="value"
                    register={register}
                    errors={errors}
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