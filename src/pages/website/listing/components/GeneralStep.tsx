import PageContainer from "@/components/global/pageContainer/PageContainer";
import NextButton from "@/components/global/form/button/NextButton";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import Accrodion from "@/components/global/accrodion/Accrodion";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
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
import PreviouseButton from "@/components/global/form/button/PreviouseButton";
import { FaRegListAlt } from "react-icons/fa";
import { TbBuildingCommunity } from "react-icons/tb";
import { FaMapLocationDot } from "react-icons/fa6";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import AccordionSubmit from "@/components/global/form/button/AccordionSubmit";
import Textarea from "@/components/global/form/textarea/Textarea";
import { Button } from "@/components/global/form/button/Button";

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
  const [isOpenFirst, setIsOpenFirst] = useState(true);
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
    <PageContainer className="flex-1 h-full overflow-auto">
      <form
        id="general_step_form"
        className="flex flex-col p-[48px] gap-[80px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* accordions container */}
        <div className="w-full flex flex-col gap-[48px] flex-1">
          <Accrodion
            onClick={toggleStateFirst}
            title="معلومات عامة عن العقار"
            icon={FaRegListAlt}
            isOpen={isOpenFirst}
            accordionFields={[]}
            form={form}
          >
            <div className="p-[40px] pt-[24px] grid md:grid-cols-2 gap-x-[160px] gap-y-[24px]">
              <FormSectionHeader>معلومات المنطقة</FormSectionHeader>

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

              <FormSectionHeader>معلومات البناء</FormSectionHeader>

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
              {/* <Input
                form={form}
                label={"اسم المطور العقاري"}
                placeholder={""}
                name={"developerName"}
                info={"hello"}
              /> */}

              <Textarea
                form={form}
                label={"اسم المطور العقاري"}
                placeholder={""}
                name={"developerName"}
                info={"hello"}
              />
              <div className="col-span-full flex justify-center">
                <AccordionSubmit<GeneralStepType>
                  trigger={trigger}
                  onValid={() => {
                    setIsOpenFirst(false);
                    setIsOpenSecond(true);
                  }}
                  validationArray={[]}
                />
              </div>
            </div>
          </Accrodion>

          <Accrodion
            onClick={toggleStateSecond}
            title="فئة العقار : سكني"
            icon={TbBuildingCommunity}
            isOpen={isOpenSecond}
            accordionFields={[]}
            form={form}
          >
            <div className="p-[40px] pt-[24px] grid md:grid-cols-2 gap-x-[160px] gap-y-[24px]">
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
              {/* <Input
                form={form}
                name="cableAvailable"
                label="الكابل متوفر (التلفزيون/الإنترنت)"
                labelStyle="font-bold"
                placeholder="لا يوجد"
                info={"hello"}
              /> */}

              <Textarea
                form={form}
                name="cableAvailable"
                label="الكابل متوفر (التلفزيون/الإنترنت)"
                labelStyle="font-bold"
                placeholder="لا يوجد"
                info={"hello"}
              />

              <div className="col-span-full flex justify-center">
                <AccordionSubmit<GeneralStepType>
                  trigger={trigger}
                  onValid={() => {
                    setIsOpenSecond(false);
                    setIsOpenThird(true);
                  }}
                  validationArray={[]}
                />
              </div>
            </div>
          </Accrodion>

          <Accrodion
            onClick={toggleStateThird}
            title="المعلومات الجغرافية و المستندات"
            icon={FaMapLocationDot}
            isOpen={isOpenThird}
            accordionFields={[]}
            form={form}
          >
            <div className="p-[48px] flex flex-col gap-[32px]">
              {/* map */}
              <div className="flex gap-[22px] px-[52px] justify-center items-center">
                {/* map view */}
                <div className="w-[55%] rounded-[15px] h-[470px] overflow-hidden relative">
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

                {/* map control */}
                <div className="flex flex-col w-[45%] p-[10px] gap-[23px]">
                  <Button onClick={getUserLocation}>
                    الحصول على خطوط الطول/العرض من العنوان
                  </Button>
                  <Button onClick={toggleManualMode}>
                    {isManualMode
                      ? "تعطيل التحديد اليدوي"
                      : "تفعيل التحديد اليدوي"}
                  </Button>
                  <Button onClick={toggleSatelliteView}>
                    {isSatelliteView
                      ? "عرض الخريطة العادية"
                      : "عرض الخريطة برؤية Google street"}
                  </Button>
                </div>
              </div>

              {/* inputs */}
              <div className="grid md:grid-cols-2 gap-x-[160px] gap-y-[24px]">
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

                {/* buttons */}
                <div className="col-span-full flex justify-center mt-[12px]">
                  <AccordionSubmit<GeneralStepType>
                    trigger={trigger}
                    onValid={() => {
                      setIsOpenThird(false);
                    }}
                    validationArray={[]}
                  />
                </div>
              </div>
            </div>
          </Accrodion>
        </div>

        {/* buttons */}
        <div className="flex justify-between w-full gap-4 px-[107px]">
          <PreviouseButton setCurrentStep={setCurrentStep} />
          <NextButton id={"general_step_form"} />
        </div>
      </form>
    </PageContainer>
  );
}

export default GeneralStep;
