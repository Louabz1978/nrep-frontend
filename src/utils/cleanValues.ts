function cleanValues(keys = {}, obj: any) {
  let finalObj = {};
  finalObj = {};
  Object.keys(keys).map((key) => {
    if (obj?.[key] || obj?.[key] == 0 || obj?.[key] == "0")
      finalObj[key] = obj?.[key];
  });
  return finalObj;
}

export default cleanValues;
