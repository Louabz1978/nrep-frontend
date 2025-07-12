import getRowShow from "./getRowShow";

function checkFilter(
  ele: string,
  filter: Record<string, string | Record<string, string>>,
  row: Record<string, string | Record<string, string>>,
  isArray: boolean = false,
  isObject: boolean = false,
  objectKey: string = "",
  filterKeys?: Record<string, string>,
  filterOperations: Record<string, string> = {}
): boolean {
  const operation = filterOperations[ele] === "equal" ? "equals" : "includes";
  const compare = (a: string, b: string) =>
    operation === "equals"
      ? (a + "").toLowerCase() === (b + "").toLowerCase()
      : (a + "").toLowerCase().includes((b + "").toLowerCase());

  const isEmptyFilter = (value: unknown) =>
    !value && value !== 0 && value !== "0";

  if (isArray) {
    return operation === "equals"
      ? row?.[ele] === filter?.[ele]
      : (row?.[ele] as string)?.includes(filter?.[ele] as string);
  }

  if (isObject) {
    return (
      compare(
        (row?.[ele] as Record<string, string>)?.[objectKey],
        (filter?.[ele] as Record<string, string>)?.[objectKey]
      ) || isEmptyFilter((filter?.[ele] as Record<string, string>)?.[objectKey])
    );
  }

  const valueToCompare = filterKeys?.[ele]
    ? getRowShow(row as Record<string, string>, filterKeys[ele])
    : row?.[ele];

  return (
    compare(valueToCompare as string, filter?.[ele] as string) ||
    isEmptyFilter(filter?.[ele])
  );
}

export default checkFilter;
