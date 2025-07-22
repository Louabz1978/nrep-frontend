import { atom } from "jotai";

// Atoms
const openModalsAtom = atom<string[]>([]);

// Derived atoms
const openModalAtom = atom(null, (get, set, id: string) => {
  const current = get(openModalsAtom);
  set(openModalsAtom, [...current.filter((modalId) => modalId !== id), id]);
});

const openModalAfterAtom = atom(
  null,
  (get, set, { newId, afterId }: { newId: string; afterId: string }) => {
    const current = get(openModalsAtom);
    const withoutNew = current.filter((id) => id !== newId);
    const index = withoutNew.indexOf(afterId);

    set(
      openModalsAtom,
      index === -1
        ? [...withoutNew, newId]
        : [
            ...withoutNew.slice(0, index + 1),
            newId,
            ...withoutNew.slice(index + 1),
          ]
    );
  }
);

const closeModalAtom = atom(null, (get, set, id: string) => {
  set(
    openModalsAtom,
    get(openModalsAtom).filter((modalId) => modalId !== id)
  );
});

const closeAllModalsAtom = atom(null, (_get, set) => {
  set(openModalsAtom, []);
});

export {
  closeAllModalsAtom,
  closeModalAtom,
  openModalAfterAtom,
  openModalAtom,
  openModalsAtom,
};
