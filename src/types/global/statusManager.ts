import { type UseQueryResult } from "@tanstack/react-query";
import { type FC, type ReactNode } from "react";

export interface StatusManagerProps {
  children: ReactNode;
  Loader: FC;
  loaderInSlider?: boolean;
  loaderCount?: number;
  query?: UseQueryResult;
  isEmpty?: boolean;
  emptyContent?: ReactNode;
}
