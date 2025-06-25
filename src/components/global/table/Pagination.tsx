import {
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
} from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";

interface PaginationProps {
  data: any[] | undefined;
  isFetching: boolean;
  paginationData?: {
    last_page: number;
  };
  page: number;
  setPage: (page: number) => void;
  size: number;
  setSize: (size: number) => void;
}

const buttonStyles = {
  border: "1px solid #eee",
  borderRadius: "4px",
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
  fontWeight: "400",
  textAlign: "center",
};

function Pagination({
  data,
  isFetching,
  paginationData,
  page,
  setPage,
  size,
  setSize,
}: PaginationProps) {
  const [pagination, setPagination] = useState({
    currentPage: page,
    lastPage: page,
    prevPage: page,
    nextPage: page,
    firstPage: 1,
  });

  useEffect(() => {
    if (page && paginationData) {
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        lastPage: paginationData?.last_page,
        prevPage: Math.max(1, page - 1),
        nextPage: Math.min(paginationData?.last_page, page + 1),
      }));
    }
  }, [page, paginationData]);

  const rerunDataFunc = async (pageNumber: number) => {
    setPage(pageNumber);
  };

  const { firstPage, prevPage, nextPage, currentPage, lastPage } = pagination;

  useEffect(() => {
    if (data && data?.length == 0 && prevPage >= firstPage && !isFetching) {
      rerunDataFunc(prevPage);
    }
  }, [data?.length]);

  return (
    <div className="relative p-4 flex gap-4 items-center justify-center bg-block-background text-primary-foreground border-t border-solid border-border ">
      <div className="absolute top-0 h-full p-4 right-0">
        <input
          className="bg-block-background text-primary-foreground"
          type="text"
          value={size}
          step={1}
          min={1}
          max={1000}
          onChange={(e) => {
            if (
              /^\d*$/.test(e.target.value) &&
              Number(e.target.value) <= 1000 &&
              Number(e.target.value) >= 1
            ) {
              setSize(Number(e.target.value));
            }
          }}
          style={
            { ...buttonStyles } as DetailedHTMLProps<
              ButtonHTMLAttributes<HTMLButtonElement>,
              HTMLButtonElement
            >
          }
        />
      </div>
      <button
        style={
          { ...buttonStyles } as DetailedHTMLProps<
            ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
          >
        }
        onClick={() => rerunDataFunc(firstPage)}
      >
        <FaAnglesRight />
      </button>
      <button
        style={
          { ...buttonStyles } as DetailedHTMLProps<
            ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
          >
        }
        onClick={() => rerunDataFunc(prevPage)}
      >
        <FaAngleRight />
      </button>

      <div className="flex gap-2 text-xl ">
        {/* first page number  */}
        {firstPage !== currentPage && currentPage && (
          <span
            className="cursor-pointer"
            onClick={() => rerunDataFunc(firstPage)}
          >
            {firstPage}
          </span>
        )}
        {prevPage > firstPage + 1 && <span>...</span>}

        {/* prev page number  */}
        {prevPage > 0 && prevPage !== firstPage && (
          <span
            className="cursor-pointer"
            onClick={() => rerunDataFunc(prevPage)}
          >
            {prevPage}
          </span>
        )}

        {/* current page number  */}
        {currentPage ? (
          <span className="cursor-pointer bg-primary px-2 rounded-sm text-white aspect-square w-fit">
            {currentPage}
          </span>
        ) : null}

        {/* next page number  */}
        {nextPage < lastPage && (
          <span
            className="cursor-pointer"
            onClick={() => rerunDataFunc(nextPage)}
          >
            {nextPage}
          </span>
        )}
        {nextPage < lastPage - 1 && <span>...</span>}

        {/* last page number  */}
        {lastPage !== currentPage && (
          <span
            className="cursor-pointer"
            onClick={() => rerunDataFunc(lastPage)}
          >
            {lastPage}
          </span>
        )}
      </div>

      <button
        style={
          { ...buttonStyles } as DetailedHTMLProps<
            ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
          >
        }
        onClick={() => rerunDataFunc(nextPage)}
      >
        <FaAngleLeft />
      </button>
      <button
        style={
          { ...buttonStyles } as DetailedHTMLProps<
            ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
          >
        }
        onClick={() => rerunDataFunc(lastPage)}
      >
        <FaAnglesLeft />
      </button>
    </div>
  );
}

export default Pagination;
