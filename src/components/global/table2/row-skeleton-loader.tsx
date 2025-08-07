import { Skeleton } from "../ui/skeleton";
import { type Table } from "@tanstack/react-table";
import { TableCell, TableRow } from "../ui/table";

interface RowSkeletonLoaderProps<TData> {
  table: Table<TData>;
}
function RowSkeletonLoader<TData>({ table }: RowSkeletonLoaderProps<TData>) {
  return (
    <TableRow>
      {table.getHeaderGroups()[0].headers.map((_header, cellIndex) => {
        // Random width between 40% and 100% of cell width
        const randomWidth = `${40 + Math.random() * 60}%`;
        return (
          <TableCell key={`skeleton-cell-${cellIndex}`}>
            <Skeleton className="h-xl" style={{ width: randomWidth }} />
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export default RowSkeletonLoader;
