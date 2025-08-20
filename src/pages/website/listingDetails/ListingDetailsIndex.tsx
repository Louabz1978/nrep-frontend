import { useParams } from "react-router-dom";
import useListingDetails from "@/hooks/website/listing/useListingDetails";
import StatusManager from "@/components/global/statusManager/StatusManager";
import ListingDetailsSkeleton from "./ListingDetailsSkeleton";
import ListingDetails from "./ListingDetails";
// import { AnimatePresence } from "framer-motion";
// import PopupContainer from "@/components/global/popupContainer/PopupContainer";
// import { useState } from "react";

function ListingDetailsIndex() {
  // listing id
  const { id } = useParams<{ id: string }>();
  const listingId = Number(id);

  // get listing details
  const { listingDetails, listingDetailsQuery } = useListingDetails(listingId);

  // const [isOpen, setIsOpen] = useState<boolean | null | number>(true);
  // return (
  //   <AnimatePresence>
  //     {isOpen ? (
  //       <PopupContainer setIsOpen={setIsOpen}>
  //         <div className="w-[100vw] h-[100svh] flex justify-center items-center pointer-events-none">
  //           <div className="w-[90vw] h-[90svh] border-2 shadow-accordion-shadow z-0 border-secondary-border rounded-md overflow-auto relative pointer-events-auto">
  //             <img
  //               src="https://picsum.photos/500/1000"
  //               className="size-full object-contain"
  //             />
  //             <img
  //               src="https://picsum.photos/1500/1000"
  //               className="size-full object-cover blur-2xl absolute top-0 right-0 z-[-1]"
  //             />
  //           </div>
  //         </div>
  //       </PopupContainer>
  //     ) : null}
  //   </AnimatePresence>
  // )
  // return (
  //   <AnimatePresence>
  //     {isOpen ? (
  //       <PopupContainer setIsOpen={setIsOpen}>
  //         <div className="w-[100vw] h-[100svh] flex justify-center items-center pointer-events-none">
  //           <div className="w-[90vw] h-[90svh]">
  //             <img
  //               src="https://picsum.photos/1500/1000"
  //               className="size-full object-contain"
  //             />
  //           </div>
  //         </div>
  //       </PopupContainer>
  //     ) : null}
  //   </AnimatePresence>
  // );
  return (
    <StatusManager query={listingDetailsQuery} Loader={ListingDetailsSkeleton}>
      {!listingDetails ? null : (
        <ListingDetails key={listingId} data={listingDetails} />
      )}
    </StatusManager>
  );
}

export default ListingDetailsIndex;
