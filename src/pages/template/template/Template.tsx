import type { TemplateType } from "@/api/template/template/getTemplates";
import Actions from "@/components/global/actions/Actions";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import RefetchLoader from "@/components/global/refetchLoader/RefetchLoader";
import Table from "@/components/global/table/Table";
import { useTheme } from "@/hooks/global/useTheme";
import useTemplatesQuery from "@/hooks/template/template/useTemplatesQuery";
import { useState } from "react";

function Template() {
  // templates query methods
  const {
    filter,
    setFilter,
    templates,
    page,
    setPage,
    size,
    setSize,
    templateDetails,
    setCurrentTemplate,
    currentTemplate,
  } = useTemplatesQuery();

  const { toggleTheme, theme } = useTheme();

  // templates mutation methods
  // const {
  //   handleAddTemplate,
  //   addTemplate,
  //   handleEditTemplate,
  //   editTemplate,
  //   handleDeleteTemplate,
  //   deleteTemplate,
  // } = useTemplatesMutation();

  console.log(templates?.data?.data);

  const [currentLayout, setCurrentLayout] = useState(true);

  type rowType = { row: TemplateType };

  const fields = [
    {
      width: "20%", // Increased from 20%
      title: "الاسم",
      showKey: "name",
    },
    {
      width: "15%", // Same as original
      title: "رقم الهاتف",
      showKey: "phone",
    },
    {
      width: "10%", // Same as original
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
      width: "15%", // Increased from 10%
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
      width: "10%", // Same as original
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
          // {
          //   title: "حذف",
          //   onClick: () => handleDeleteTemplate(row?.id),
          //   permissions: ["Delete Template"],
          // },
        ];
        return <Actions actions={actions} pageName={"templates"} />;
      },
    },
  ];

  return (
    <PageContainer permissions={[]}>
      <div className="flex items-center p-2 gap-3 border-b border-border">
        <span
          className="cursor-pointer"
          onClick={() => setCurrentLayout((prev) => !prev)}
        >
          طريقة العرض
        </span>

        <div
          className="dark:text-red-600 text-blue-600"
          onClick={() => {
            toggleTheme();
          }}
        >{`toggle ${theme}`}</div>
      </div>
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
          // deleteTemplate: deleteTemplate,
          // handleDeleteTemplate: handleDeleteTemplate,
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
