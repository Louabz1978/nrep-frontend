import { useParams } from "react-router-dom";
import ListingForm from "./ListingForm";
import useListingDetails from "@/hooks/website/listing/useListingDetails";
import StatusManager from "@/components/global/statusManager/StatusManager";
import { ListingFormSkeleton } from "./components/ListingFormSkeleton";
import {
  cityChoices,
  PROPERTY_TYPE,
  STATUS,
  WATERLINE,
} from "@/data/global/select";

function EditListingIndex() {
  // listing id
  const { id } = useParams<{ id: string }>();
  const listingId = Number(id);

  // get listing details
  const { listingDetails, listingDetailsQuery } = useListingDetails(listingId);

  return (
    <StatusManager query={listingDetailsQuery} Loader={ListingFormSkeleton}>
      {!listingDetails ? null : (
        <ListingForm
          key={listingId}
          id={listingId}
          defaultValues={{
            general: {
              building_num: listingDetails?.address.building_num,
              street: listingDetails?.address.street,
              floor: listingDetails?.address.floor,
              apt: listingDetails?.address.apt
                ? Number(listingDetails?.address.apt)
                : undefined,
              district: listingDetails?.address.area, // Assuming 'area' maps to 'district'
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
              hasBalcony: false, // Default values since not in API
              hasFans: false,
              elevator: false,
              ac: false,
              parking: false,
              garden: false,
              jacuzzi: false,
              solar: false,
              pool: false,
              balcony: 0,
              fans: 0,
              waterLine: WATERLINE[0],
            },
            location: {
              latitude: listingDetails?.latitude,
              longitude: listingDetails?.longitude,
              address: "",
              landAreaSource: "",
              landDimensionsSource: "",
            },
            propertyImages: {
              photos: listingDetails?.image_url
                ? [
                    {
                      id: -1,
                      path: listingDetails?.image_url,
                    },
                  ]
                : [],
            },
          }}
        />
      )}
    </StatusManager>
  );
}

export default EditListingIndex;
