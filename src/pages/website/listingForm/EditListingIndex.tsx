import { useParams } from "react-router-dom";
import ListingForm from "./ListingForm";
import useListingDetails from "@/hooks/website/listing/useListingDetails";
import StatusManager from "@/components/global/statusManager/StatusManager";
import { ListingFormSkeleton } from "./components/ListingFormSkeleton";
import {
  cityChoices,
  PROPERTY_TYPE,
  STATUS,
  TransType,
  WATERLINE,
} from "@/data/global/select";
import {
  additionalInfoStepInitialValues,
  generalStepInitialValues,
} from "@/data/website/schema/ListingFormSchema";
import NotAllowedPage from "@/components/global/notAllowed/NotAllowedPage";
import { useUser } from "@/stores/useUser";

function EditListingIndex() {
  // user information
  const { user } = useUser();

  // listing id
  const { id } = useParams<{ id: string }>();
  const listingId = Number(id);

  // get listing details
  const { listingDetails, listingDetailsQuery } = useListingDetails(listingId);

  return (
    <StatusManager query={listingDetailsQuery} Loader={ListingFormSkeleton}>
      {!listingDetails ? null : listingDetails?.created_by_user?.user_id ==
        (user?.user_id ?? user?.data?.user_id) ? (
        <ListingForm
          key={listingId}
          id={listingId}
          defaultValues={{
            general: {
              livable: true,
              sellers: [],
              trans_type: {
                value: listingDetails.trans_type,
                label:
                  TransType.find((s) => s.value === listingDetails.trans_type)
                    ?.label || "",
              },
              exp_date:
                listingDetails?.exp_date || generalStepInitialValues?.exp_date,
              show_inst:
                listingDetails?.show_inst ||
                generalStepInitialValues?.show_inst,
              building_num: listingDetails?.address.building_num + "",
              street: listingDetails?.address.street,
              floor: listingDetails?.address.floor,
              apt: listingDetails?.address.apt
                ? Number(listingDetails?.address.apt)
                : undefined,
              area: listingDetails?.address.area, // Assuming 'area' maps to 'district'
              area_space: listingDetails?.area_space,
              bedrooms: listingDetails?.bedrooms,
              bathrooms: listingDetails?.bathrooms,
              price: listingDetails?.price,
              property_realtor_commission:
                listingDetails?.property_realtor_commission,
              buyer_realtor_commission:
                listingDetails?.buyer_realtor_commission,
              year_built: listingDetails?.year_built,
              description: listingDetails?.description,
              country: {
                value: listingDetails?.address.county,
                label:
                  cityChoices.find(
                    (c) => c.value === listingDetails.address.county
                  )?.label || "",
              },
              city: {
                value: listingDetails.address.city,
                label:
                  cityChoices.find(
                    (c) => c.value === listingDetails.address.city
                  )?.label || "",
              },
              property_type: {
                value: listingDetails.property_type,
                label:
                  PROPERTY_TYPE.find(
                    (p) => p.value === listingDetails.property_type
                  )?.label || "",
              },
              status: {
                value: listingDetails.status,
                label:
                  STATUS.find((s) => s.value === listingDetails.status)
                    ?.label || "",
              },
            },
            additionalInfo: {
              hasBalcony:
                listingDetails?.additional?.balcony > 0 ||
                additionalInfoStepInitialValues?.hasBalcony,
              hasFans:
                listingDetails?.additional?.fan_number > 0 ||
                additionalInfoStepInitialValues?.hasFans,
              elevator:
                listingDetails?.additional?.elevator ||
                additionalInfoStepInitialValues?.elevator,
              ac:
                listingDetails?.additional?.ac ||
                additionalInfoStepInitialValues?.ac,
              garage:
                listingDetails?.additional?.garage ||
                additionalInfoStepInitialValues?.garage,
              garden:
                listingDetails?.additional?.garden ||
                additionalInfoStepInitialValues?.garden,
              jacuzzi:
                listingDetails?.additional?.jacuzzi ||
                additionalInfoStepInitialValues?.jacuzzi,
              solar_system:
                listingDetails?.additional?.solar_system ||
                additionalInfoStepInitialValues?.solar_system,
              pool:
                listingDetails?.additional?.pool ||
                additionalInfoStepInitialValues?.pool,
              balcony:
                listingDetails?.additional?.balcony ||
                additionalInfoStepInitialValues?.balcony,
              fan_number:
                listingDetails?.additional?.fan_number ||
                additionalInfoStepInitialValues?.fan_number,
              water:
                WATERLINE?.find(
                  (item) => item?.value == listingDetails?.additional?.water
                ) || additionalInfoStepInitialValues?.water,
            },
            location: {
              latitude: listingDetails?.latitude,
              longitude: listingDetails?.longitude,
              address: "",
              landAreaSource: "",
              landDimensionsSource: "",
            },
            propertyImages: {
              photos: listingDetails?.images_urls
                ? listingDetails.images_urls?.map((item, index) => ({
                    id: index + 1,
                    path: item?.url,
                    mode: "normal",
                    isMain: item?.is_main,
                  }))
                : [],
              mode: "edit",
            },
          }}
        />
      ) : (
        <NotAllowedPage />
      )}
    </StatusManager>
  );
}

export default EditListingIndex;
