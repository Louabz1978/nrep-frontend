import { isArray } from "lodash";

// cell show content
function getRowShow(row: Record<string, any>, showKey: string | string[]): any {
  if (typeof showKey == "string") return row?.[showKey];
  else if (isArray(showKey)) {
    let res = row;
    showKey.map((key) => {
      res = res?.[key];
    });
    return res;
  }
}

export default getRowShow;
