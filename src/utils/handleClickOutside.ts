import { type RefObject } from "react";

// function that used to catch clicking out of component to close it
// the first parameter is reference to that component .. second is method to close it .. third is id of component that i want to prevent close component on click on it
const handleClickOutside = (
  ref: RefObject<HTMLElement> | null | any,
  setIsOpen: (isOpen: boolean) => void,
  prevent?: string | null
) => {
  function handleClickOutsideFunction(event: MouseEvent) {
    // ignore clicks on the opened component and prevent close component
    if (
      ref?.current &&
      !ref.current.contains(event.target as Node) &&
      (event.target as HTMLElement).id != prevent
    ) {
      setIsOpen(false);
    } else if (ref == null && (event.target as HTMLElement).id != prevent) {
      setIsOpen(false);
    }
  }

  // add event listener on click to run passed method
  document.addEventListener("mousedown", handleClickOutsideFunction);

  // if the event is previously listened dont repeat event listener
  return () => {
    document.removeEventListener("mousedown", handleClickOutsideFunction);
  };
};

export default handleClickOutside;
