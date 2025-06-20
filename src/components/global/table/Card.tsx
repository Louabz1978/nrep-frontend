import { Fragment } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { RxCaretSort } from "react-icons/rx";

function Card({
  index,
  data,
  props,
  fields,
  getRowShow,
  emptyContent,
  withRanking = true,
  handleTitleClick,
  sortOrder,
  sortedField,
  actionKey,
}) {
  return (
    <Fragment key={index}>
      {/* {groupKey &&
  ele?.[groupKey] &&
  (!sortedData()?.[i - 1] ||
    sortedData()?.[i - 1]?.[groupKey] !=
      ele?.[groupKey]) ? (
    <div
      className={`border-2 border-solid border-secondColor text-center relative h-full w-full flex flex-col justify-center bg-secondColor items-center p-4 rounded-md`}
    >
      {
        groupsData?.find(
          (element) => element?.id == ele?.[groupKey]
        )?.name
      }
    </div>
  ) : null} */}
      <div
        className={` relative h-full w-full flex flex-col justify-start bg-blockBackgroundColor items-center p-4 pb-[50px] border-2 shadow-shadow border-solid border-borderColor rounded-md`}
      >
        {/* count of this card */}
        {withRanking ? (
          <div className="absolute flex justify-center items-center text-fontColor w-[20px] h-[20px] text- border-2 border-solid border-borderColor bottom-4 left-4 rounded-full">
            {index + 1}
          </div>
        ) : null}

        {/* action dots area */}
        {actionKey ? <div className="h-[20px]"></div> : null}

        {/* map over fields */}
        {fields.map((field, index) => {
          if (field?.title == actionKey)
            return (
              <div
                key={index}
                className="absolute top-2 left-5 border border-solid border-borderColor p-[2px] rounded-full"
              >
                {field?.component
                  ? field?.component({ row: data, index })
                  : getRowShow(data, field.showKey) ||
                    getRowShow(data, field.showKey) === 0 ||
                    getRowShow(data, field.showKey) === "0"
                  ? getRowShow(data, field.showKey)
                  : emptyContent}
              </div>
            );

          return (
            <div
              key={index}
              className={`relative w-full flex gap-2 items-start justify-start py-[4px] group border-b border-solid border-borderColor hover:bg-cardHoverColor`}
            >
              <>
                {/* title */}
                <div className=" text-secondColor text-size15 w-max text-nowrap">{`${field.title}: `}</div>
                {/* value */}
                <div
                  className="text-size14"
                  style={{
                    overflow: "auto",
                    width: "100%",
                  }}
                >
                  {field?.component
                    ? field?.component({ row: data, index })
                    : getRowShow(data, field.showKey) ||
                      getRowShow(data, field.showKey) === 0 ||
                      getRowShow(data, field.showKey) === "0"
                    ? getRowShow(data, field.showKey)
                    : emptyContent}
                </div>

                {/* sort */}
                {field?.showKey ? (
                  <div
                    className="text-fontColor text-opacity-60 cursor-pointer text-size10 w-[30px] min-w-[30px] max-w-[30px] flex items-center justify-center h-full mr-auto"
                    onClick={() => handleTitleClick(field)}
                  >
                    {sortOrder === "" || field.showKey !== sortedField ? (
                      <RxCaretSort className="text-size20" />
                    ) : sortOrder === "asc" ? (
                      <FaAngleUp className="text-size12" />
                    ) : (
                      <FaAngleDown className="text-size12" />
                    )}
                  </div>
                ) : null}
              </>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}

export default Card;
