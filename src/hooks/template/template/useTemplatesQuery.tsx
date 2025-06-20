import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getTemplates, {
  type Gender,
} from "@/api/template/template/getTemplates";
import getTemplateDetails from "@/api/template/template/getTemplateDetails";
import { useState } from "react";
import { debounce } from "lodash";

interface templatesFilterType {
  age?: number;
  name?: string;
  gender?: Gender;
}

function useTemplatesQuery() {
  // current page that will be requested
  const [page, setPage] = useState(1);

  // size of data in one page that will be requested
  const [size, setSize] = useState(10);

  // filter of request
  const [filter, setFilter] = useState<templatesFilterType>({});

  // get templates
  const templates = useQuery({
    queryKey: [QUERY_KEYS?.templates?.query, filter, page, size],
    queryFn: ({ queryKey }) => getTemplates({ queryKey }),
    retry: false,
    refetchOnWindowFocus: false,
  });
  // debounce fetch templates on change filter values
  async function fetchTemplatesFilter(filter: templatesFilterType) {
    setPage(1);
    setFilter(filter);
  }
  const debouncedFetch = debounce(fetchTemplatesFilter, 300);
  // debounce fetch templates on change size values
  async function fetchTemplatesSize(size: number) {
    setPage(1);
    setSize(size);
  }
  const debounceSize = debounce(fetchTemplatesSize, 300);

  // current template details
  const [currentTemplate, setCurrentTemplate] = useState<number | null>(null);

  // get template details
  const templateDetails = useQuery({
    queryKey: [QUERY_KEYS?.templates?.details, currentTemplate],
    queryFn: ({ queryKey }) => getTemplateDetails({ queryKey }),
    enabled: !!currentTemplate,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    filter,
    templates,
    page,
    setPage,
    size,
    setSize: debounceSize,
    setFilter: debouncedFetch,
    templateDetails,
    setCurrentTemplate,
    currentTemplate,
  };
}

export default useTemplatesQuery;
