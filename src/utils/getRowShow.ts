import { isArray } from "lodash";
import type { ReactNode } from "react";

// cell show content
function getRowShow(
  row: Record<string, string>,
  showKey: string | string[]
): ReactNode {
  if (typeof showKey == "string") return row?.[showKey];
  else if (isArray(showKey)) {
    let res: Record<string, ReactNode> | ReactNode = row;
    showKey.map((key) => {
      res = (res as Record<string, ReactNode>)?.[key] as
        | Record<string, ReactNode>
        | ReactNode;
    });
    return res as unknown as ReactNode;
  }
}

export default getRowShow;
