function cleanValues<T extends Record<string, unknown>>(keys: T, obj: T): T {
  const finalObj: Partial<T> = {};

  (Object.keys(keys) as Array<keyof T>).forEach((key) => {
    const value = obj[key];
    if (
      (value !== undefined && value !== null && value !== "") || // empty string
      value === 0 ||
      value === "0" ||
      value === false
    ) {
      finalObj[key] = value;
    }
  });

  return finalObj as T;
}

export default cleanValues;
