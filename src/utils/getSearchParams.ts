export default function getSearchParams(
  searchParams: URLSearchParams,
  prefix: string = ""
): Record<string, string> {
  const queryParams: Record<string, string> = {};

  if (searchParams) {
    searchParams.forEach((value, key) => {
      // If prefix exists and key starts with it
      if (prefix && key.startsWith(prefix)) {
        // Remove the prefix from the key
        const finalKey = key.slice(prefix.length);
        queryParams[finalKey] = value;
      }
    });
  }

  return queryParams;
}
