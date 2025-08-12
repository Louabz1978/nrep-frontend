import { isArray } from "lodash";

export function hasValue(value: any): boolean {
  return (
    (!isArray(value) && value) ||
    (isArray(value) && value?.length) ||
    value === 0 ||
    value === false
  );
}

export function cleanParams(params: {}) {
  let finalParams: any = { ...params };
  finalParams = { ...params };
  Object.keys(params)?.map((key) => {
    if (!hasValue(params[key as keyof typeof params])) {
      delete finalParams[key as keyof typeof finalParams];
    }
    if (isArray(params[key as keyof typeof params])) {
      finalParams[key as keyof typeof finalParams] = (
        finalParams[key as keyof typeof finalParams] as []
      )?.join(",");
    }
  });

  return finalParams;
}
