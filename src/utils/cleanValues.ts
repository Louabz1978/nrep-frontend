function cleanValues<T>(keys = {}, obj: T): T {
  let finalObj = {};
  finalObj = {};
  Object.keys(keys).map((key) => {
    if (
      obj?.[key] ||
      obj?.[key] === 0 ||
      obj?.[key] === "0" ||
      obj?.[key] === false
    )
      finalObj[key] = obj?.[key];
  });
  return finalObj;
}

export default cleanValues;
