import type { TemplateType } from "@/api/template/template/getTemplates";
import Actions from "@/components/global/actions/Actions";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import RefetchLoader from "@/components/global/refetchLoader/RefetchLoader";
import Table from "@/components/global/table/Table";
import { type TemplatesFilterType } from "@/hooks/template/template/useTemplatesQuery";
import { useState, type Dispatch } from "react";
import TemplatesHeader from "./components/TemplatesHeader";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { PaginationData } from "@/types/global/pagination";
import type { TemplateDetailsType } from "@/api/template/template/getTemplateDetails";
import type { DebouncedFunc } from "lodash";
import type { deleteTemplateFunctionProps } from "@/api/template/template/deleteTemplate";

interface TemplateProps {
  templates: UseQueryResult<
    {
      data: TemplateType[];
    } & PaginationData,
    Error
  >;
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
  size: number;
  setSize: DebouncedFunc<(size: number) => Promise<void>>;
  templateDetails: UseQueryResult<TemplateDetailsType, Error>;
  setCurrentTemplate: Dispatch<React.SetStateAction<number | null>>;
  currentTemplate: number | null;
  setFilter: DebouncedFunc<(filter: TemplatesFilterType) => Promise<void>>;
  deleteTemplate: UseMutationResult<
    any,
    Error,
    deleteTemplateFunctionProps,
    unknown
  >;
  handleDeleteTemplate: (id: number) => Promise<void>;
}
function Template({
  templates,
  page,
  setPage,
  size,
  setSize,
  templateDetails,
  setCurrentTemplate,
  currentTemplate,
  deleteTemplate,
  handleDeleteTemplate,
  setFilter,
}: TemplateProps) {
  const [currentLayout, setCurrentLayout] = useState<boolean>(true);

  type rowType = { row: TemplateType };

  const fields = [
    {
      width: "15%", // Increased from 20%
      title: "الاسم",
      showKey: "name",
    },
    {
      width: "15%", // Same as original
      title: "رقم الهاتف",
      showKey: "phone",
    },
    {
      width: "15%", // Same as original
      title: "البريد الإلكتروني",
      showKey: "email",
    },
    {
      width: "5%", // Reduced from 10%
      title: "العمر",
      showKey: "age",
    },
    {
      width: "10%", // Same as original
      title: "الجنس",
      component: ({ row }: rowType) => {
        return row?.gender === "male"
          ? "ذكر"
          : row?.gender === "female"
          ? "أنثى"
          : "غير محدد";
      },
    },
    {
      width: "20%", // Increased from 10%
      title: "العنوان",
      showKey: "address",
    },
    {
      width: "5%", // Reduced from 10%
      title: "الحالة",
      component: ({ row }: rowType) => {
        return row?.isActive ? "نشط" : "غير نشط";
      },
    },
    {
      width: "10%", // Same as original
      title: "تاريخ الإنشاء",
      showKey: "createdAt",
    },
    {
      width: "5%", // Same as original
      title: "الإجراءات",
      component: ({ row }: rowType) => {
        const actions = [
          {
            title: "التفاصيل",
            onClick: () => setCurrentTemplate(row?.id),
            permissions: [],
          },
          // {
          //   title: "تعديل",
          //   onClick: () => setIsOpen(row),
          //   permissions: ["Edit Template"],
          // },
          {
            title: "حذف",
            onClick: () => handleDeleteTemplate(row?.id),
            permissions: [],
          },
        ];
        return <Actions actions={actions} pageName={"templates"} />;
      },
    },
  ];

  return (
    <PageContainer permissions={[]}>
      {/* header */}
      <TemplatesHeader
        setFilter={setFilter}
        setCurrentLayout={setCurrentLayout}
        currentLayout={currentLayout}
      />

      {/* table */}
      <Table
        data={templates?.data?.data}
        fields={fields}
        isTable={currentLayout}
        paginationData={templates?.data}
        isPagination={true}
        query={templates}
        setPage={setPage}
        page={page}
        setSize={setSize}
        size={size}
        cardProps={{
          pageName: "templates",
          // setIsOpen: setIsOpen,
          deleteTemplate: deleteTemplate,
          handleDeleteTemplate: handleDeleteTemplate,
          setCurrentTemplate: setCurrentTemplate,
        }}
        // CardComponent={TemplateCard}
        cardsContainerStyle={
          "grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10"
        }
      />

      {/* refetch loader */}
      <RefetchLoader
        flag={templates?.isRefetching}
        isError={templates?.isRefetchError}
      />
    </PageContainer>
  );
}

export default Template;
