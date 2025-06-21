import useTemplatesQuery from "@/hooks/template/template/useTemplatesQuery";
import Template from "./Template";
import { Route, Routes } from "react-router-dom";
import { useUser } from "@/stores/useUser";
import TemplateForm from "./components/TemplateForm";
import useTemplatesMutation from "@/hooks/template/template/useTemplateMutation";
import { TEMPLATE_FORM_SCHEMA_INITIAL_VALUES } from "@/data/template/template/templateFormSchema";

function TemplateLogic() {
  // check permissions methods
  const { checkPermissions } = useUser();

  // templates query methods
  const {
    templates,
    page,
    setPage,
    size,
    setSize,
    templateDetails,
    setCurrentTemplate,
    currentTemplate,
    setFilter,
  } = useTemplatesQuery();

  // templates mutation methods
  const {
    handleAddTemplate,
    addTemplate,
    handleEditTemplate,
    editTemplate,
    handleDeleteTemplate,
    deleteTemplate,
  } = useTemplatesMutation();

  return (
    <Routes>
      {/* index page */}
      <Route
        path=""
        element={
          checkPermissions([]) ? (
            <Template
              templates={templates}
              page={page}
              setPage={setPage}
              size={size}
              setSize={setSize}
              templateDetails={templateDetails}
              setCurrentTemplate={setCurrentTemplate}
              currentTemplate={currentTemplate}
              setFilter={setFilter}
              deleteTemplate={deleteTemplate}
              handleDeleteTemplate={handleDeleteTemplate}
            />
          ) : (
            <>not allowed</>
          )
        }
      />

      {/* add page */}
      <Route
        path="/add"
        element={
          checkPermissions([]) ? (
            <TemplateForm
              addTemplate={addTemplate}
              editTemplate={editTemplate}
              data={TEMPLATE_FORM_SCHEMA_INITIAL_VALUES}
              handleAdd={handleAddTemplate}
              handleEdit={handleEditTemplate}
            />
          ) : (
            <>not allowed</>
          )
        }
      />
    </Routes>
  );
}

export default TemplateLogic;
