import { columns } from "@/components/global/table2/dummy-columns";
import { dummyData } from "@/components/global/table2/dummy-data";
import { DataTable } from "@/components/global/table2/table";

function TestTable() {
  return (
    <div className=" mt-[40px]">
      <DataTable
        prefix="home"
        columns={columns}
        data={dummyData}
        totalPageCount={10}
        filters={[
          {
            id: "1",
            type: "date",
            label: "Date filter",
            title: "Date",
            searchKey: "date",
          },
          {
            id: "2",
            type: "text",
            label: "Text filter",
            title: "Text",
            searchKey: "text",
          },
          {
            id: "3",
            type: "select",
            label: "Select filter",
            title: "Select",
            searchKey: "select",
            options: [
              { value: "1", label: "option 1" },
              { value: "2", label: "option 2" },
              { value: "3", label: "option 3" },
            ],
          },
          {
            id: "4",
            type: "multi-select",
            label: "Multi Select filter",
            title: "Multi Select ",
            searchKey: "multi-select",
            options: [
              { value: "1", label: "option 1" },
              { value: "2", label: "option 2" },
              { value: "3", label: "option 3" },
            ],
          },
        ]}
      />
    </div>
  );
}

export default TestTable;
