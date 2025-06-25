import getRowShow from "./getRowShow";

interface SortableData {
  [key: string]: any;
}

const sortedData = (
  data: SortableData[] | undefined,
  sortedField: string | null | string[],
  sortOrder: "asc" | "desc" | "" = "asc"
): SortableData[] | undefined => {
  try {
    if (sortedField) {
      return data?.slice().sort((a, b) => {
        const aValue = getRowShow(a, sortedField);
        const bValue = getRowShow(b, sortedField);

        // Dynamically determine the data type of the field
        const dataType = typeof aValue;

        // Handle null/undefined cases first
        if (aValue == null || bValue == null) {
          return (aValue == null ? 1 : -1) * (sortOrder === "asc" ? 1 : -1);
        }

        // Perform sorting based on data type
        switch (dataType) {
          case "number": {
            return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
          }

          case "boolean": {
            // Treat true as 1 and false as 0
            const aBool = aValue ? 1 : 0;
            const bBool = bValue ? 1 : 0;
            return sortOrder === "asc" ? aBool - bBool : bBool - aBool;
          }

          default: {
            // Default to string comparison
            return sortOrder === "asc"
              ? String(aValue).localeCompare(String(bValue))
              : String(bValue).localeCompare(String(aValue));
          }
        }
      });
    } else {
      return data;
    }
  } catch (err) {
    console.log(err);
    return data;
  }
};

export default sortedData;
