import { NuqsAdapter } from "nuqs/adapters/react-router/v6";

import React from "react";

export default function NuqsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
