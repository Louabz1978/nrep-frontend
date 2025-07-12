export default function jsonParse(
  string: string | { [key: string]: unknown }
): { [key: string]: unknown } {
  let res = string;

  try {
    while (typeof res == "string") {
      res = JSON.parse(res);
    }
  } catch (err) {
    console.log(err);
    return res as { [key: string]: unknown };
  }

  return res;
}
