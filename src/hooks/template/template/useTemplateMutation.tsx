import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import MESSAGES from "@/data/global/messages";
import { showApiErrors } from "@/utils/showApiErrors";
import QUERY_KEYS from "@/data/global/queryKeys";
import deleteTemplateFunction from "@/api/template/template/deleteTemplate";
import editTemplateFunction from "@/api/template/template/editTemplate";
import addTemplateFunction from "@/api/template/template/addTemplate";
import Swal from "sweetalert2";
import ALERT_STYLE from "@/libs/swal/alertStyle";
import type { TemplateFormType } from "@/data/template/template/templateFormSchema";
import { useNavigate } from "react-router-dom";

function useTemplatesMutation() {
  // query client that will used for mutation previous queries
  const queryClient = useQueryClient();

  // navigate method
  const navigate = useNavigate();

  // add template
  const addTemplate = useMutation({
    mutationFn: addTemplateFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.templates.query] });
      navigate("/template/main");
    },
  });

  async function handleAddTemplate(data: TemplateFormType) {
    toast.promise(addTemplate.mutateAsync({ data }), {
      loading: MESSAGES?.templates?.add?.loading,
      // change the toast status and message when successfully response
      success: MESSAGES?.templates?.add?.success,
      error: (error) => {
        //toast the api returned errors
        return showApiErrors(error);
      },
    });
  }

  // edit template
  const editTemplate = useMutation({
    mutationFn: editTemplateFunction,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.templates.query] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.templates.details, id],
      });
      navigate("/template/main");
    },
  });

  async function handleEditTemplate(id: number, data: TemplateFormType) {
    toast.promise(editTemplate.mutateAsync({ id, data }), {
      loading: MESSAGES?.templates?.edit?.loading,
      // change the toast status and message when successfully response
      success: MESSAGES?.templates?.edit?.success,
      error: (error) => {
        //toast the api returned errors
        return showApiErrors(error);
      },
    });
  }

  // delete template
  const deleteTemplate = useMutation({
    mutationFn: deleteTemplateFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.templates.query] });
    },
  });

  async function handleDeleteTemplate(id: number) {
    // confirmation popup
    await Swal.fire({
      ...ALERT_STYLE,
      title: MESSAGES?.templates?.delete?.confirmTitle,
      text: MESSAGES?.templates?.delete?.confirmText,
    }).then(async (result) => {
      if (result.isConfirmed) {
        toast.promise(deleteTemplate.mutateAsync({ id }), {
          loading: MESSAGES?.templates?.delete?.loading,
          // change the toast status and message when successfully response
          success: MESSAGES?.templates?.delete?.success,
          error: (error) => {
            //toast the api returned errors
            return showApiErrors(error);
          },
        });
      }
    });
  }

  return {
    handleAddTemplate,
    addTemplate,
    handleEditTemplate,
    editTemplate,
    handleDeleteTemplate,
    deleteTemplate,
  };
}

export default useTemplatesMutation;
