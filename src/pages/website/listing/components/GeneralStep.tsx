import PageContainer from "@/components/global/pageContainer/PageContainer";
import NextButton from "@/components/global/form/button/NextButton";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import Accrodion from "@/components/global/accrodion/Accrodion";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import {
  firstSectionFields,
  secondSectionFields,
  thirdSectionFields,
  type GeneralStepType,
} from "@/data/website/schema/ListingFormSchema";
import {
  cityChoices,
  measurementSources,
  streetTypes,
  geoDirections,
  StatusType,
  bedrooms,
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
import AccordionSubmit, {
  AccordionButtonsContainer,
  AccordionCancel,
} from "@/components/global/form/button/AccordionSubmit";
import Textarea from "@/components/global/form/textarea/Textarea";
import { Button } from "@/components/global/form/button/Button";
import { GUESTROOM } from "@/data/global/select";

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
            accordionFields={firstSectionFields}
            requiredFields={firstSectionFields}
            form={form}
          >
            <div className="p-[40px] pt-[24px] grid md:grid-cols-2 gap-x-[160px] gap-y-[24px]">
              <FormSectionHeader>معلومات المنطقة</FormSectionHeader>
              <Select
                form={form}
                label="المدينة"
                choices={cityChoices}
                showValue="label"
                keyValue="value"
                name="city"
                placeholder="اختر المدينة"
                info="اختر المدينة التي يقع فيها العقار"
              />
              <Input
                form={form}
                label="المنطقة"
                placeholder="مثال: حي الغوطة"
                name="district"
                info="ادخل اسم المنطقة أو الحي"
              />
              <Select
                form={form}
                label="المنطقة الجغرافية"
                choices={cityChoices}
                keyValue="value"
                showValue="label"
                name="geoArea"
                placeholder="اختر المنطقة الجغرافية"
                info="حدد المنطقة الجغرافية للعقار"
              />
              <Select
                form={form}
                label="المقاطعة"
                choices={cityChoices}
                showValue="label"
                keyValue="value"
                name="province"
                placeholder="اختر المقاطعة"
                info="اختر المقاطعة التي يتبع لها العقار"
              />
              <Input
                form={form}
                label="النطاق"
                placeholder="مثال: النطاق الشرقي"
                name="zone"
                info="ادخل نطاق العقار (اختياري)"
              />

              <Input
                form={form}
                label="اسم الشارع"
                placeholder="شارع الدبلان"
                name="streetName"
                info="ادخل اسم الشارع الرئيسي للعقار"
              />
              <Input
                form={form}
                label="رقم الشارع"
                placeholder="1234"
                name="streetNumber"
                info="ادخل رقم الشارع إن وجد"
              />
              <Select
                form={form}
                label="نوع الشارع"
                choices={streetTypes}
                showValue="label"
                keyValue="value"
                name="streetType"
                placeholder="طريق عام"
                info="حدد نوع الشارع"
              />

              <Input
                form={form}
                label="اسم الشقة/الفرع"
                placeholder="مثال: شقة 2 أو فرع ب"
                name="branchName"
                info="ادخل اسم الشقة أو الفرع (إن وجد)"
              />
              <Input
                form={form}
                label="رمز الفرع"
                placeholder="مثال: ب"
                name="branchCode"
                info="ادخل رمز الفرع (إن وجد)"
              />

              <Select
                form={form}
                label="اتجاه البداية"
                choices={geoDirections}
                showValue="label"
                keyValue="value"
                name="startDirection"
                placeholder="شمال"
                info="حدد اتجاه بداية العقار"
              />
              <Select
                form={form}
                label="اتجاه النهاية"
                choices={geoDirections}
                showValue="label"
                keyValue="value"
                name="endDirection"
                placeholder="جنوب"
                info="حدد اتجاه نهاية العقار"
              />

              <Input
                form={form}
                label="الرمز البريدي"
                placeholder="33914"
                name="postalCode"
                info="ادخل الرمز البريدي للعنوان"
              />

              <Input
                form={form}
                label="التطوير"
                placeholder="مثال: تطوير خاص"
                name="development"
                info="ادخل اسم أو نوع التطوير (إن وجد)"
              />

              <FormSectionHeader>معلومات البناء</FormSectionHeader>

              <Select
                form={form}
                label="نوع تصميم المبنى"
                placeholder="مثال: فيلا، عمارة، شقة"
                name="buildingDesign"
                choices={cityChoices}
                keyValue="value"
                showValue="label"
                info="حدد نوع تصميم المبنى"
              />
              <Input
                form={form}
                label="رقم البناء"
                placeholder="مثال: 47"
                name="buildingNumber"
                info="ادخل رقم البناء"
              />
              <Input
                form={form}
                label="اسم البناء"
                placeholder="مثال: برج الشام"
                name="buildingName"
                info="ادخل اسم البناء (إن وجد)"
              />
              <Input
                form={form}
                label="عدد الطوابق الكلي في الملكية"
                placeholder="مثال: 10"
                name="totalFloorsInOwnership"
                type="number"
                info="ادخل عدد الطوابق الكلي في الملكية"
              />
              <Input
                form={form}
                label="عدد الطوابق الكلي في العقار"
                placeholder="مثال: 5"
                name="totalFloorsInProperty"
                type="number"
                info="ادخل عدد الطوابق الكلي في العقار"
              />
              <Input
                form={form}
                label="رقم الطابق"
                placeholder="مثال: 2"
                name="propertyFloor"
                type="number"
                info="ادخل رقم الطابق الذي يقع فيه العقار"
              />
              <Input
                form={form}
                label="عدد العقارات في البناء"
                placeholder="مثال: 20"
                name="unitsInBuilding"
                type="number"
                info="ادخل عدد العقارات في البناء"
              />
              <Input
                form={form}
                label="عدد العقارات في المجمع"
                placeholder="مثال: 100"
                name="unitsInCompound"
                type="number"
                info="ادخل عدد العقارات في المجمع (إن وجد)"
              />
              <Input
                form={form}
                label="سنة البناء"
                placeholder="مثال: 2010"
                name="yearBuilt"
                type="number"
                info="ادخل سنة بناء العقار"
              />
              <FormSectionHeader>المعلومات القانونية</FormSectionHeader>

              {/* الوصف القانوني */}
              <Textarea
                form={form}
                label="الوصف القانوني :"
                placeholder="النص هنا"
                name="legalDescription"
                info="الوصف القانوني للعقار"
                addingStyle="col-span-full"
              />

              <Input
                form={form}
                label="القسم"
                placeholder=""
                name="section"
                info="ادخل رقم القسم"
              />
              <Input
                form={form}
                label="البلدية"
                placeholder=""
                name="municipality"
                info="ادخل اسم البلدية"
              />
              <Input
                form={form}
                label="الوحدة القانونية"
                placeholder=""
                name="legalUnit"
                info="ادخل الوحدة القانونية"
              />
              <Input
                form={form}
                label="المجال"
                placeholder=""
                name="field"
                info="ادخل المجال"
              />
              <Input
                form={form}
                label="الكتلة"
                placeholder=""
                name="block"
                info="ادخل الكتلة"
              />
              <Input
                form={form}
                label="الأرض / الوحدة العقارية"
                placeholder=""
                name="landUnit"
                info="ادخل رقم الأرض أو الوحدة العقارية"
              />

              <FormSectionHeader>خيارات إضافية</FormSectionHeader>
              <div className="col-span-full flex justify-center">
                <Select
                  form={form}
                  keyValue="value"
                  showValue="label"
                  choices={GUESTROOM}
                  name={"moreGeneralOptions"}
                  placeholder={"اختر مواصفات إضافية للعقار"}
                  multiple={true}
                  addingStyle="!w-[60%]"
                  info={"hello"}
                />
              </div>

              <AccordionButtonsContainer>
                <AccordionSubmit<GeneralStepType>
                  trigger={trigger}
                  onValid={() => {
                    setIsOpenFirst(false);
                    setIsOpenSecond(true);
                  }}
                  validationArray={firstSectionFields}
                />
                <AccordionCancel setIsOpen={setIsOpenFirst} />
              </AccordionButtonsContainer>
            </div>
          </Accrodion>

          <Accrodion
            onClick={toggleStateSecond}
            title="فئة العقار : سكني"
            icon={TbBuildingCommunity}
            isOpen={isOpenSecond}
            accordionFields={secondSectionFields}
            requiredFields={secondSectionFields}
            form={form}
          >
            <div className="p-[40px] pt-[24px] grid md:grid-cols-2 gap-x-[160px] gap-y-[24px]">
              <FormSectionHeader>معلومات الغرف</FormSectionHeader>
              <Select
                form={form}
                label={"نوع الحالة"}
                name={"propertyStatus"}
                choices={StatusType}
                showValue="label"
                keyValue="value"
                placeholder={"اختر نوع الحالة"}
                info={"معلومات عن الحالة"}
              />
              <Input
                form={form}
                name="offeredPrice"
                type="number"
                label="سعر العرض"
                labelStyle="font-bold"
                placeholder="ادخل سعر العرض"
                info={"سعر العقار"}
              />
              <Select
                form={form}
                label={"غرف النوم"}
                name={"bedrooms"}
                choices={bedrooms}
                showValue="label"
                keyValue="value"
                placeholder={"اختر عدد غرف النوم"}
                info={"اختر عدد غرف النوم"}
              />
              <Input
                form={form}
                name="completeBathrooms"
                type="number"
                label="الحمامات الكاملة"
                labelStyle="font-bold"
                placeholder="ادخل عدد الحمامات الكاملة"
                info={" عدد الحمامات الكاملة"}
              />
              <Input
                form={form}
                name="partialBathrooms"
                type="number"
                label="الحمامات الجزئية "
                labelStyle="font-bold"
                placeholder="ادخل عدد الحمامات الجزئية"
                info={"عدد الحمامات الجزئية"}
              />
              <Input
                form={form}
                name="TheApproximateAreaOfTheResidentialZone"
                type="number"
                label="المساحة التقريبية لنطاق السكني"
                labelStyle="font-bold"
                placeholder="ادخل المساحة التقريبية لنطاق السكني"
                info={"ادخل المساحة التقريبية لنطاق السكني"}
              />
              <Input
                form={form}
                name="TheApproximateAreaOfTheTotalRange"
                type="number"
                label="المساحة التقريبية للنطاق الكلي"
                labelStyle="font-bold"
                placeholder="ادخل المساحة التقريبية للنطاق الكلي"
                info={"المساحة التقريبية للنطاق الكلي"}
              />
              <Input
                form={form}
                name="NumberOfCeilingFans"
                type="number"
                label="عدد المراوح السقفية "
                labelStyle="font-bold"
                placeholder="ادخل عدد المراوح السقفية"
                info={"عدد المراوح السقفية"}
              />
              <Input
                form={form}
                name="GarageSpaces"
                type="number"
                label="مساحات المرائب"
                labelStyle="font-bold"
                placeholder="ادخل مساحات المرآب"
                info={"مساحات المرائب"}
              />
              <Select
                form={form}
                label={"وصف المرآب"}
                name={"DescriptionOfTheGarage"}
                choices={bedrooms}
                showValue="label"
                keyValue="value"
                placeholder={"اختر وصف المرآب"}
                info={"وصف المرآب"}
              />
              <Select
                form={form}
                label={"المفروشات"}
                name={"Furniture"}
                choices={bedrooms}
                showValue="label"
                keyValue="value"
                placeholder={"اختر المفروشات"}
                info={"المفروشات"}
              />
              <Select
                form={form}
                label={"المصعد"}
                name={"Elevator"}
                choices={bedrooms}
                showValue="label"
                keyValue="value"
                placeholder={"اختر للمصعد"}
                info={"المصعد"}
              />
              <Input
                form={form}
                name="ParkingLotArea"
                type="number"
                label="مساحة مصفّات السيارات"
                labelStyle="font-bold"
                placeholder="ادخل مساحة مصفّات السيارات"
                info={"مساحة مصفّات السيارات "}
              />
              <Select
                form={form}
                label={"وصف مصفّ السيارات"}
                name={"CarParkDescription"}
                choices={bedrooms}
                showValue="label"
                keyValue="value"
                placeholder={"اختر وصف مصّف السيارات"}
                info={"وصف مصفّ السيارات"}
              />
              {/* <Input
                form={form}
                name="cableAvailable"
                label="الكابل متوفر (التلفزيون/الإنترنت)"
                labelStyle="font-bold"
                placeholder="لا يوجد"
                info={"hello"}
              /> */}
              <FormSectionHeader>الحيوانات الأليفة</FormSectionHeader>
              <Select
                form={form}
                label={"الحيوانات الأليفة"}
                name={"Pets"}
                choices={bedrooms}
                showValue="label"
                keyValue="value"
                placeholder={"اختر عدد الحيوانات الأليفة"}
                info={"الحيوانات الأليفة"}
              />
              <Input
                form={form}
                name="maxPetWeight"
                type="number"
                label="الحد الأعلى لوزن الحيوان "
                labelStyle="font-bold"
                placeholder="ادخل الحد الأعلى لوزن الحيوان"
                info={"الحد الأعلى لوزن الحيوان "}
              />
              <Input
                form={form}
                name="maxPetCount"
                type="number"
                label="الحد الأعلى لعدد الحيوانات"
                labelStyle="font-bold"
                placeholder="ادخل الحدالأعلى للحيوانات"
                info={"الحد الأعلى لعدد الحيوانات"}
              />
              <Input
                form={form}
                name="maxPetBreeding"
                type="number"
                label="الحد الأعلى لتكاثر الحيوانات"
                labelStyle="font-bold"
                placeholder="ادخل الحد الأعلى لتكاثر الحيوانات"
                info={"الحد الأعلى لتكاثر الحيوانات"}
              />
              <Input
                form={form}
                name="maxPetTypes"
                type="number"
                label="الحد الأعلى لأنواع الحيوانات"
                labelStyle="font-bold"
                placeholder="ادخل الحد الأعلى لأنواع الحيوانات"
                info={"الحد الأعلى لأنواع الحيوانات"}
              />
              <FormSectionHeader>معلومات الأرض</FormSectionHeader>
              <Input
                form={form}
                name="landSize"
                type="number"
                label="حجم الأرض (بالفدان)"
                labelStyle="font-bold"
                placeholder="ادخل حجم الأرض (بالفدان)"
                info={"حجم الأرض (بالفدان)"}
              />
              <Input
                form={form}
                name="landBack"
                type="number"
                label="الجزء الخلفي من الأرض"
                labelStyle="font-bold"
                placeholder="ادخل الجزء الخلفي من الأرض "
                info={"الجزء الخلفي من الأرض"}
              />
              <Input
                form={form}
                name="landFront"
                type="number"
                label="الواجهة الأمامية من الأرض"
                labelStyle="font-bold"
                placeholder="ادخل الواجهة الأمامية من الأرض"
                info={"الواجهة الأمامية من الأرض"}
              />
              <Input
                form={form}
                name="landLeft"
                type="number"
                label="يسارية الأرض"
                labelStyle="font-bold"
                placeholder="ادخل يسارية الأرض"
                info={"يسارية الأرض"}
              />
              <Input
                form={form}
                name="landRight"
                type="number"
                label="يمينية الأرض"
                labelStyle="font-bold"
                placeholder="ادخل يمينية الأرض"
                info={"يمينية الأرض "}
              />
              <Select
                form={form}
                label={"اتجاه الواجهة الخلفية"}
                name={"backDirection"}
                choices={bedrooms}
                showValue="label"
                keyValue="value"
                placeholder={"اختر اتجاه الواجهة الخلفية"}
                info={"اتجاه الواجهة الخلفية"}
              />
              <Input
                form={form}
                name="virtualTour1"
                type="text"
                label="رابط الجولة الإفتراضية"
                labelStyle="font-bold"
                placeholder="ادخل رابط الجولة الأفتراضية"
                info={"رابط الجولة الإفتراضية"}
              />
              <Input
                form={form}
                name="virtualTour2"
                type="text"
                label="رابط الجولة الإفتراضية 2"
                labelStyle="font-bold"
                placeholder="ادخل رابط الجولة الإفتراضية 2"
                info={"رابط الجولة الإفتراضية 2"}
              />
              <Input
                form={form}
                name="ownerName"
                type="text"
                label="اسم المالك"
                labelStyle="font-bold"
                placeholder="اختر اسم المالك"
                info={"اسم المالك"}
              />
              <Select
                form={form}
                label={"وصف المُلكية"}
                name={"propertyDescription"}
                choices={bedrooms}
                showValue="label"
                keyValue="value"
                placeholder={"اختر عدد وصف المُلكية"}
                info={"وصف المُلكية"}
              />
              <Input
                form={form}
                name="primarySchool"
                type="text"
                label="المدرسة الإبتدائية"
                labelStyle="font-bold"
                placeholder="ادخل المدرسة الإبتدائية"
                info={"المدرسة الإبتدائية"}
              />
              <Input
                form={form}
                name="middleSchool"
                type="text"
                label="المدرسة الإعدادية"
                labelStyle="font-bold"
                placeholder="ادخل المدرسة الإعدادية"
                info={"المدرسة الإعدادية"}
              />
              <Input
                form={form}
                name="highSchool"
                type="text"
                label="المدرسة الثانوية"
                labelStyle="font-bold"
                placeholder="ادخل المدرسة الثانوية"
                info={"المدرسة الثانوية"}
              />
              <FormSectionHeader>خيارات إضافية</FormSectionHeader>
              <div className="col-span-full flex justify-center">
                <Select
                  form={form}
                  keyValue="value"
                  showValue="label"
                  choices={GUESTROOM}
                  name={"moreCategoryOptions"}
                  placeholder={"اختر مواصفات إضافية للعقار"}
                  multiple={true}
                  addingStyle="!w-[60%]"
                  info={"hello"}
                />
              </div>

              <AccordionButtonsContainer>
                <AccordionSubmit<GeneralStepType>
                  trigger={trigger}
                  onValid={() => {
                    setIsOpenSecond(false);
                    setIsOpenThird(true);
                  }}
                  validationArray={secondSectionFields}
                />
                <AccordionCancel setIsOpen={setIsOpenSecond} />
              </AccordionButtonsContainer>
            </div>
          </Accrodion>

          <Accrodion
            onClick={toggleStateThird}
            title="المعلومات الجغرافية و المستندات"
            icon={FaMapLocationDot}
            isOpen={isOpenThird}
            accordionFields={thirdSectionFields}
            requiredFields={["latitude", "longitude"]}
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
                  <Button variant={"semi-round"} onClick={getUserLocation}>
                    الحصول على خطوط الطول/العرض من العنوان
                  </Button>
                  <Button variant={"semi-round"} onClick={toggleManualMode}>
                    {isManualMode
                      ? "تعطيل التحديد اليدوي"
                      : "تفعيل التحديد اليدوي"}
                  </Button>
                  <Button
                    variant={"semi-round-outline"}
                    onClick={toggleSatelliteView}
                  >
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
                <AccordionButtonsContainer>
                  <AccordionSubmit<GeneralStepType>
                    trigger={trigger}
                    onValid={() => {
                      setIsOpenThird(false);
                    }}
                    validationArray={thirdSectionFields}
                  />
                  <AccordionCancel setIsOpen={setIsOpenThird} />
                </AccordionButtonsContainer>
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
