"use client";

import { useState, type ReactNode } from "react";
import { FaRegImage, FaTrash } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { MdEdit } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { BiSolidFolderOpen } from "react-icons/bi";
import getError from "@/utils/getErrors";
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import Toggle from "../toggle/Toggle";

/**
 * Represents an image file with its metadata
 */
interface ImageFile {
  id: number; // Unique identifier for the file
  path: string | File; // Can be either a File object or a path string
  mode?: "edit" | "delete"; // Optional flag for file state
}

/**
 * Props for the ImagesInput component
 */
interface ImagesInputProps<T extends FieldValues> {
  form: UseFormReturn<T>; // form control methods
  name: Path<T>; // Form field name
  addable?: boolean; // Whether new files can be added
  editable?: boolean; // Whether existing files can be edited
  deletable?: boolean; // Whether existing files can be deleted
  acceptTypes?: string; // Accepted file types (e.g., "image/*")
  className?: string; // Additional CSS for add button
  containerClassName?: string; // Additional CSS for container
  imagesContainerClassName?: string; // Addition CSS for images container
  label?: string; // Label text
  customErrorStyle?: string; // Custom CSS for error messages
  max?: number; // Maximum number of allowed files
  disabled?: boolean; // disabled flag
  info?: string | ReactNode; // info content
  toggle?: Path<T>; // toggle field name
  required?: boolean; // required flag to show red star
  labelStyle?: string; // label className
}

/**
 * A reusable multi-image input component with preview, edit, and delete functionality
 */
function ImagesInput<T extends FieldValues>({
  form,
  name,
  addable = true,
  editable = true,
  deletable = true,
  acceptTypes = "image/*",
  imagesContainerClassName = "",
  containerClassName = "",
  label,
  max,
  className,
  disabled,
  // info,
  toggle,
  required,
  labelStyle,
}: ImagesInputProps<T>) {
  //   Extract methods from form control methods
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = form;

  // State for generating unique IDs for new files
  const [customFileId, setCustomFileId] = useState(-1);

  // is disabled
  const isDisabled = disabled || (toggle && !watch(toggle));

  // Tracks which file's options are being shown on hover
  const [showOptions, setShowOptions] = useState<number | false>(false);

  /**
   * Handles adding multiple files to the form state
   * @param e The file input change event
   */
  const handleAddMultiFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let initFiles = watch(name) as (
      | { id: number; path: File }
      | PathValue<T, Path<T>>[number]
    )[];
    let newId = customFileId - 1;

    if (e.target.files) {
      await Promise.all(
        Array.from(e.target.files).map((file) => {
          initFiles = [...initFiles, { id: newId, path: file }];
          newId -= 1;
        })
      );
    }

    setValue(name, initFiles as PathValue<T, Path<T>>);
    setCustomFileId((prev) => prev - 1);
    trigger(name);
  };

  /**
   * Handles editing an existing file
   * @param e The file input change event
   * @param fileId The ID of the file being edited
   */
  const handleEditMultiFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fileId: number
  ) => {
    const initFiles = watch(name).map((file: { id: number }) => {
      if (file.id !== fileId) return file;
      return {
        id: file.id,
        path: e.target.files?.[0] as File,
        mode: "edit" as const,
      };
    });

    setValue(name, initFiles);
    trigger(name);
  };

  /**
   * Handles marking a file for deletion (soft delete)
   * @param fileId The ID of the file to delete
   */
  const handleDeleteMultiFile = async (fileId: number) => {
    const initFiles = watch(name).map((file: ImageFile) => {
      if (file.id !== fileId) return file;
      return { ...file, mode: "delete" as const };
    });

    setValue(name, initFiles);
    trigger(name);
  };

  // Filter out deleted files for display
  const currentFiles = watch(name)?.filter(
    (item: { mode: "delete" | "edit" }) => item.mode !== "delete"
  );
  // Check if more files can be added
  const canAddMore = !max || currentFiles?.length < max;

  return (
    <div className={`${containerClassName}`}>
      {/* Field label */}
      {label ? (
        <label
          htmlFor={name}
          className={`text-size22 flex items-center gap-[16px] font-medium cursor-pointer ${labelStyle} ${
            isDisabled ? "text-placeholder" : " text-primary-fg"
          } transition-all`}
        >
          <div>
            {label}
            {required && !isDisabled ? (
              <span className="text-size22 text-error">{" *"}</span>
            ) : null}
          </div>

          {toggle ? (
            <Toggle form={form} name={toggle} onChange={() => trigger(name)} />
          ) : null}
        </label>
      ) : null}

      {/* Main container for image previews and add button */}
      <div
        className={`grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] ${imagesContainerClassName}`}
      >
        {/* Map through existing files to display previews */}
        {currentFiles?.map((item: ImageFile, i: number) => (
          <div className="flex flex-col">
            <div key={i} className="w-full h-[300px] rounded-full">
              {/* Hidden file input for editing */}
              <input
                type="file"
                id={`${name}__added_image_${i}`}
                multiple={false}
                onChange={async (e) => {
                  e.preventDefault();
                  await handleEditMultiFile(e, item.id);
                  e.target.value = "";
                }}
                accept={acceptTypes}
                className="hidden"
              />

              {/* File preview container */}
              <div
                className="flex justify-center items-center w-full h-[300px] border border-solid border-border rounded-[10px] overflow-hidden shrink-0 cursor-pointer relative"
                onMouseEnter={() => setShowOptions(i)}
                onMouseLeave={() => setShowOptions(false)}
              >
                {/* The actual image preview */}
                <div className="w-full h-[300px]">
                  <img
                    src={
                      typeof item.path === "object"
                        ? URL.createObjectURL(item.path)
                        : `${process.env.BACKEND_BASE_URL}/images/${item.path}`
                    }
                    className="size-full object-cover"
                  />
                </div>

                {/* Animated options that appear on hover */}
                <AnimatePresence>
                  {showOptions === i && (
                    <motion.div
                      initial={{ translate: "0 100%" }}
                      animate={{ translate: 0 }}
                      exit={{ translate: "0 100%" }}
                      transition={{ ease: "linear", duration: 0.3 }}
                      className="absolute flex gap-2 justify-center items-center right-0 top-0 h-full w-full bg-primary-overlay backdrop-blur-[6px] text-primary-fg rounded-[10px] cursor-auto text-size20 font-bold"
                    >
                      {/* Edit button (only shown if editable) */}
                      {editable && (
                        <label
                          title="تعديل"
                          htmlFor={`${name}__added_image_${i}`}
                          className="text-primary-fg shadow-shadow bg-tertiary-bg/80 backdrop-blur-[6px] flex justify-center items-center p-[5px] rounded-full cursor-pointer"
                        >
                          <MdEdit className="shadow-shadow size-[24px]" />
                        </label>
                      )}

                      {/* Delete button (only shown if deletable) */}
                      {deletable && (
                        <span
                          title="حذف"
                          className="text-error shadow-shadow bg-tertiary-bg/80 backdrop-blur-[6px] flex justify-center items-center p-[5px] rounded-full cursor-pointer"
                          onMouseDown={async () => {
                            await handleDeleteMultiFile(item.id);
                          }}
                        >
                          <FaTrash className="shadow-shadow size-[24px]" />
                        </span>
                      )}

                      {/* Open file button */}
                      <span
                        className="text-primary-fg shadow-shadow bg-tertiary-bg/80 backdrop-blur-[6px] flex justify-center items-center p-[5px] rounded-full cursor-pointer"
                        title="عرض"
                        onMouseDown={async () => {
                          const fileUrl =
                            typeof item.path === "object"
                              ? URL.createObjectURL(item.path)
                              : `${process.env.BACKEND_BASE_URL}/images/${item.path}`;
                          window.open(fileUrl);
                        }}
                      >
                        <BiSolidFolderOpen className="shadow-shadow size-[24px]" />
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Display error message under each image */}
            {getError(errors, `${name}.${i}.path` as Path<T>) ? (
              <span className="text-error font-medium text-size16">
                {
                  (
                    getError(errors, `${name}.${i}.path` as Path<T>) as {
                      message: string;
                    }
                  )?.message
                }
              </span>
            ) : null}
          </div>
        ))}

        {/* Add new file button (only shown if canAddMore is true) */}
        {canAddMore &&
          (addable ? (
            <>
              {/* Hidden file input for adding new files */}
              <input
                type="file"
                id={`${name}__adding_mode`}
                multiple={true}
                onChange={async (e) => {
                  e.preventDefault();
                  await handleAddMultiFile(e);
                  e.target.value = "";
                }}
                className="hidden"
                accept={acceptTypes}
              />
              {/* Visible add button that triggers the file input */}
              <label
                htmlFor={`${name}__adding_mode`}
                className={`flex flex-col gap-[20px] justify-center items-center w-full h-[300px] border border-solid border-border rounded-[10px] overflow-hidden shrink-0 cursor-pointer ${className} text-primary-fg/50 bg-tertiary-bg`}
              >
                <FaRegImage className="size-[100px]" />
                <span className="text-size22 font-medium">
                  إدخال صور العقار
                </span>
              </label>
            </>
          ) : (
            // Show disabled state if not addable
            <div
              className={`flex justify-center items-center w-full h-[300px] border border-solid border-border rounded-[10px] overflow-hidden shrink-0 cursor-pointer ${className} text-primary-fg/50 text-size44 bg-tertiary-bg`}
            >
              <FcCancel title="ليست لديك صلاحية" className="" />
            </div>
          ))}
      </div>

      {/* Error message display */}
      {getError(errors, name) ? (
        <span className="text-error font-medium text-size16">
          {(getError(errors, name) as { message: string })?.message}
        </span>
      ) : null}
    </div>
  );
}

export default ImagesInput;
