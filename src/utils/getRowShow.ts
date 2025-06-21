import { isArray } from "lodash";

// cell show content
function getRowShow(row, showKey) {
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
