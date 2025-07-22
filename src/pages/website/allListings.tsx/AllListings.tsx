import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import useAllListings from "@/hooks/website/listing/useAllListings";
import type { Listing } from "@/types/website/listings";

function AllListings() {
  // get all listings
  const { allListings, allListingsQuery, totalPages } = useAllListings();

  return (
    <AnimateContainer>
      <PageContainer>
        <DataTable
          prefix={TABLE_PREFIXES.allListings}
          columns={[]}
          filters={[]}
          data={allListings as Listing[]}
          query={allListingsQuery}
          totalPageCount={totalPages}
        />
      </PageContainer>
    </AnimateContainer>
  );
}

export default AllListings;
