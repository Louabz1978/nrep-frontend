import getRowShow from "./getRowShow";

function checkFilter(
  ele,
  filter,
  row,
  isArray = false,
  isObject = false,
  objectKey = "",
  filterKeys,
  filterOperations = {}
) {
  const operation = filterOperations[ele] === "equal" ? "equals" : "includes";
  const compare = (a, b) =>
    operation === "equals"
      ? (a + "").toLowerCase() === (b + "").toLowerCase()
      : (a + "").toLowerCase().includes((b + "").toLowerCase());

  const isEmptyFilter = (value) => !value && value !== 0 && value !== "0";

  if (isArray) {
    return operation === "equals"
      ? row?.[ele] === filter?.[ele]
      : row?.[ele]?.includes(filter?.[ele]);
  }

  if (isObject) {
    return (
      compare(row?.[ele]?.[objectKey], filter?.[ele]?.[objectKey]) ||
      isEmptyFilter(filter?.[ele]?.[objectKey])
    );
  }

  const valueToCompare = filterKeys?.[ele]
    ? getRowShow(row, filterKeys[ele])
    : row?.[ele];

  return compare(valueToCompare, filter?.[ele]) || isEmptyFilter(filter?.[ele]);
}

export default checkFilter;
