export default function jsonParse(string: any) {
  let res = string;

  try {
    while (typeof res == "string") {
      res = JSON.parse(res);
    }
  } catch (err) {
    return res;
  }

  return res;
}
