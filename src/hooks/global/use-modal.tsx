import {
  closeAllModalsAtom,
  closeModalAtom,
  openModalAfterAtom,
  openModalAtom,
  openModalsAtom,
} from "@/stores/modals";
import { useAtom } from "jotai";

export const useModal = () => {
  const [openModals] = useAtom(openModalsAtom);
  const [, openModal] = useAtom(openModalAtom);
  const [, openModalAfter] = useAtom(openModalAfterAtom);
  const [, closeModal] = useAtom(closeModalAtom);
  const [, closeAllModals] = useAtom(closeAllModalsAtom);

  return {
    openModals,
    openModal,
    openModalAfter: (newId: string, afterId: string) =>
      openModalAfter({ newId, afterId }),
    closeModal,
    closeAllModals,
  };
};
