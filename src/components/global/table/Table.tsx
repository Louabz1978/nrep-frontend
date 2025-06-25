import { useState } from "react";
import Pagination from "./Pagination";
import Loader from "../loader/Loader";
import checkFilter from "@/utils/checkFilter";
import EmptyContent from "../emptyContent/EmptyContent";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { RxCaretSort } from "react-icons/rx";
import getRowShow from "@/utils/getRowShow";
import ErrorComponent from "../error/ErrorComponent";
import Card from "./Card";
import sortedData from "@/utils/sortedData";
import { type UseQueryResult } from "@tanstack/react-query";

interface Field {
  title: string;
  width?: string;
  justify?: string;
  showKey?: string[] | string;
  component?: ({ row, index }: { row: any; index: number }) => React.ReactNode;
}

interface TableProps {
  fields: Field[];
  data: any[] | undefined;
  paginationData?: {
    last_page: number;
  };
  isPagination?: boolean;
  CardComponent?: React.ComponentType<any>;
  isTable?: boolean;
  cardProps?: Record<string, any>;
  emptyContent?: React.ReactNode;
  filter?: Record<string, any>;
  cardsContainerStyle?: string;
  query?: UseQueryResult;
  setPage?: (page: number) => void;
  page?: number;
  setSize?: (size: number) => void;
  size?: number;
  addingHeaderStyle?: string;
  filterKeys?: Record<string, any>;
  filterOperations?: Record<string, any>;
  keyValue?: string | boolean;
  actionKey?: string;
}

function Table({
  fields,
  data,
  paginationData,
  isPagination = true,
  CardComponent = Card,
  isTable = true,
  cardProps = {},
  emptyContent = "---",
  filter = {},
  cardsContainerStyle = "grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10",
  query,
  setPage = () => {},
  page = 1,
  setSize = () => {},
  size = 10,
  addingHeaderStyle = "",
  filterKeys = {},
  filterOperations = {},
  keyValue = false,
  actionKey,
}: TableProps) {
  const [sortedField, setSortedField] = useState<string | null | string[]>(
    null
  );
  const [sortOrder, setSortOrder] = useState<"desc" | "asc" | "">("");

  const handleTitleClick = (field: Field) => {
    if (field.showKey) {
      if (field.showKey && sortedField === field.showKey) {
        if (sortOrder === "asc") {
          setSortOrder("desc");
        } else if (sortOrder === "desc") {
          setSortOrder("");
          setSortedField(null);
        }
      } else {
        setSortedField(field.showKey);
        setSortOrder("asc");
      }
    }
  };

  return (
    <div className={`flex-1 flex flex-col justify-between`}>
      {query?.isPending ? (
        <Loader isFull={true} />
      ) : query?.isError ? (
        <ErrorComponent />
      ) : (
        <>
          {/* table container */}
          <div
            className={`w-full ${
              isTable ? "lg:flex" : "lg:hidden"
            } hidden flex-col flex-1 `}
          >
            {/* table header */}
            <div
              className={`w-full bg-block-background text-primary-foreground rounded-md p-4 flex items-center mb-2 ${addingHeaderStyle}`}
            >
              {fields?.map((field, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: field.width ?? "10%",
                      minWidth: field.width ?? "10%",
                      maxWidth: field.width ?? "10%",
                    }}
                    className={`flex items-center ${
                      field?.justify ? field.justify : "justify-center"
                    } ${field.showKey ? "cursor-pointer" : ""}`}
                    onClick={() => handleTitleClick(field)}
                  >
                    {field.title}
                    {field.showKey && (
                      <span className="flex items-center w-max">
                        {sortOrder === "" || field.showKey !== sortedField ? (
                          <RxCaretSort className="text-size20" />
                        ) : sortOrder === "asc" ? (
                          <FaAngleUp className="text-size12" />
                        ) : (
                          <FaAngleDown className="text-size12" />
                        )}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* table body */}
            {sortedData(data, sortedField, sortOrder)?.filter((row: any) => {
              return (
                Object.keys(filter)?.filter((ele) =>
                  checkFilter(
                    ele,
                    filter,
                    row,
                    false,
                    false,
                    "",
                    filterKeys,
                    filterOperations
                  )
                )?.length == Object.keys(filter)?.length
              );
            })?.length == 0 ? (
              <div className="flex-1">
                <EmptyContent />
              </div>
            ) : (
              sortedData(data, sortedField, sortOrder)?.map(
                (row: any, rowIndex: number) => {
                  if (
                    Object.keys(filter)?.filter((ele) =>
                      checkFilter(
                        ele,
                        filter,
                        row,
                        false,
                        false,
                        "",
                        filterKeys,
                        filterOperations
                      )
                    )?.length == Object.keys(filter)?.length
                  )
                    return (
                      <div
                        key={keyValue ? row?.[keyValue as string] : rowIndex}
                        className={`w-full p-2 flex items-center text-primary-foreground border-b border-solid row-parent border-border`}
                      >
                        {fields?.map((field, index) => {
                          return (
                            <div
                              key={index}
                              style={{
                                width: field.width ?? "10%",
                                minWidth: field.width ?? "10%",
                                maxWidth: field.width ?? "10%",
                              }}
                              className={`flex items-center text-center ${
                                field?.justify
                                  ? field.justify
                                  : "justify-center"
                              }`}
                            >
                              {field?.component
                                ? field?.component({ row, index })
                                : getRowShow(
                                    row,
                                    field?.showKey as string[] | string
                                  ) ||
                                  getRowShow(
                                    row,
                                    field?.showKey as string[] | string
                                  ) === 0 ||
                                  getRowShow(
                                    row,
                                    field?.showKey as string[] | string
                                  ) === "0"
                                ? getRowShow(
                                    row,
                                    field?.showKey as string[] | string
                                  )
                                : emptyContent}
                            </div>
                          );
                        })}
                      </div>
                    );
                }
              )
            )}
          </div>

          {/* cards container */}
          <div
            className={`${!isTable ? "lg:grid" : "lg:hidden"} ${
              isPagination ? "pb-4" : ""
            } ${cardsContainerStyle} ${
              sortedData(data, sortedField, sortOrder)?.filter((row: any) => {
                return (
                  Object.keys(filter)?.filter((ele) =>
                    checkFilter(
                      ele,
                      filter,
                      row,
                      false,
                      false,
                      "",
                      filterKeys,
                      filterOperations
                    )
                  )?.length == Object.keys(filter)?.length
                );
              })?.length == 0
                ? "flex-1"
                : ""
            }`}
          >
            {sortedData(data, sortedField, sortOrder)?.filter((row: any) => {
              return (
                Object.keys(filter)?.filter((ele) =>
                  checkFilter(
                    ele,
                    filter,
                    row,
                    false,
                    false,
                    "",
                    filterKeys,
                    filterOperations
                  )
                )?.length == Object.keys(filter)?.length
              );
            })?.length == 0 ? (
              <div className="col-span-full h-full flex-1">
                <EmptyContent />
              </div>
            ) : (
              sortedData(data, sortedField, sortOrder)?.map(
                (card: any, index: number) => {
                  if (
                    Object.keys(filter)?.filter((ele) =>
                      checkFilter(
                        ele,
                        filter,
                        card,
                        false,
                        false,
                        "",
                        filterKeys,
                        filterOperations
                      )
                    )?.length == Object.keys(filter)?.length
                  )
                    return (
                      <CardComponent
                        key={keyValue ? card?.[keyValue as string] : index}
                        index={index}
                        data={card}
                        emptyContent={emptyContent}
                        fields={fields}
                        getRowShow={getRowShow}
                        handleTitleClick={handleTitleClick}
                        sortOrder={sortOrder}
                        sortedField={sortedField}
                        actionKey={actionKey}
                        {...cardProps}
                      />
                    );
                }
              )
            )}
          </div>
        </>
      )}

      {isPagination ? (
        <Pagination
          data={data}
          paginationData={paginationData}
          page={page}
          isFetching={query?.isFetching ?? false}
          setPage={setPage}
          size={size}
          setSize={setSize}
        />
      ) : null}
    </div>
  );
}

export default Table;
