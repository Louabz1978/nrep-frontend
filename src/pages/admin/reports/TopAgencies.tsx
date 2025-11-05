import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { TopAgencyReport } from "@/types/admin/reports";
import useGetTopAgencies from "@/hooks/admin/reports/useGetTopAgencies";
import { useForm, useWatch } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  topAgenciesReportFormSchema,
  topAgenciesReportInitialValues,
  type TopAgenciesReportFormType,
} from "@/data/admin/schema/TopAgenciesReportSchema";
import Select from "@/components/global/form/select/Select";

const monthsChoices = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: `الشهر: ${i + 1}`,
}));

const now = new Date();
const baseYear = now.getFullYear();
const yearsChoices = [baseYear - 1, baseYear].map((y) => ({
  value: String(y),
  label: `السنة: ${y}`,
}));

const TopAgencies = () => {
  const form = useForm<TopAgenciesReportFormType>({
    resolver: joiResolver(topAgenciesReportFormSchema),
    defaultValues: topAgenciesReportInitialValues,
    mode: "onChange",
  });

  const Month = useWatch({ control: form.control, name: "month" });
  const Year = useWatch({ control: form.control, name: "year" });

  console.log(Month)
  const month = Month?.value ?? String(now.getMonth() + 1);
  const year = Year?.value ?? String(now.getFullYear());

  const currentMonth = now.getMonth() + 1;
  const isCurrentYear = year === String(baseYear);

  const filteredMonthsChoices = useMemo(() => {
    return monthsChoices.filter((m) =>
      isCurrentYear ? Number(m.value) <= currentMonth : true
    );
  }, [isCurrentYear, currentMonth]);

  const { topAgenciesQuery, topAgencies } = useGetTopAgencies({
    month: String(month),
    year: String(year),
  });

  const selectedAgency = form.watch("agency");
  const filteredAgencies = useMemo((): TopAgencyReport[] => {
    if (!topAgencies) return [] ;
    const selectedId = selectedAgency?.value ? String(selectedAgency.value) : null;
    if (!selectedId) return topAgencies;
    return topAgencies.filter((agnecy) => String(agnecy.agency_id) === selectedId);
  }, [topAgencies, selectedAgency]);

  const columns: ColumnDef<TopAgencyReport>[] = useMemo(
    () => [
      { accessorKey: "agency_id", header: "معرف الشركة العقارية", size: 20 },
      { accessorKey: "agency_name", header: "اسم الشركة العقارية", size: 35 },
      {
        accessorKey: "total_properties_sold",
        header: "مجموع العقارات المباعة",
        size: 20,
        cell: ({ getValue }) => (getValue() as number).toLocaleString(),
      },
      {
        accessorKey: "total_sales_amount",
        header: "مجموع أسعار المبيعات",
        size: 25,
        cell: ({ getValue }) => (getValue() as number).toLocaleString(),
      },
    ],
    []
  );

  return (
    <AnimateContainer>
      <PageContainer>
        <div className="mb-6">
          <div className="flex sm:flex-row items-end sm:justify-between gap-4 border-b pb-2">
            <div className="flex w-full items-end justify-between gap-4">
              <h1 className="text-size24 sm:text-size30 font-medium mb-md sm:mb-xl text-center sm:text-right">
                تقرير أفضل عشر شركات عقارية
              </h1>
              <div>
                <Select
                  form={form}
                  name="agency"
                  placeholder="اختر الشركة العقارية"
                  choices={topAgencies.map((agency: TopAgencyReport) => ({
                    value: String(agency.agency_id),
                    label: agency.agency_name,
                  }))}
                  showValue="label"
                  keyValue="value"
                  addingSelectStyle="min-w-[220px]"
                  addingInputStyle="!h-2lg !py-0 !px-2 bg-white border border-gray-300 rounded-xl !text-size16"
                />
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <Select
                form={form}
                name="month"
                placeholder="اختر الشهر"
                choices={filteredMonthsChoices}
                showValue="label"
                keyValue="value"
                addingSelectStyle="min-w-[140px]"
                addingInputStyle="!h-9 !py-0 !px-2 bg-white border border-gray-300 rounded-xl"
              />

              <Select
                form={form}
                name="year"
                placeholder="اختر السنة"
                choices={yearsChoices}
                showValue="label"
                keyValue="value"
                addingSelectStyle="min-w-[140px]"
                addingInputStyle="!h-9 !py-0 !px-2 bg-white border border-gray-300 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-x-auto">
          <DataTable
            report={true}
            prefix={TABLE_PREFIXES.top_agencies}
            columns={columns}
            data={filteredAgencies}
            query={topAgenciesQuery}
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default TopAgencies;
