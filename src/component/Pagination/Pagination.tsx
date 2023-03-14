import { Icon } from "@fluentui/react";
import { Button } from "@fluentui/react-components";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_PAGE_SIZE } from "src/constaint";
import { useDidUpdate } from "src/hooks";

export interface PaginationProps {
  totalCount: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}

export function Pagination({
  totalCount,
  currentPage,
  onChangePage,
}: PaginationProps) {
  const [page, setPage] = useState(currentPage);

  const pageAmount = useMemo(() => {
    return totalCount !== 0
      ? Math.ceil(totalCount / Number(DEFAULT_PAGE_SIZE))
      : 1;
  }, [totalCount]);

  const PaginationNumber = ({
    page,
    pageAmount,
  }: {
    page: number;
    pageAmount: number;
  }) => {
    const listLeft = useMemo(() => {
      let list: number[] = [];
      if (page <= 3) {
        const countLoop = pageAmount <= 3 ? pageAmount : 3;
        for (let i = 1; i <= countLoop; i++) {
          list.push(i);
        }
        if (pageAmount > 3) list.push(0);
      } else {
        if (page - 1 > 3) {
          list = [1, 2, 3, 0, page - 1, page];
        } else {
          for (let i = 1; i <= page; i++) {
            list.push(i);
          }
          list.push(0);
        }
      }
      return list;
    }, [page, pageAmount]);

    const listRight = useMemo(() => {
      if (pageAmount - 1 <= 3 || pageAmount === page) {
        return [];
      } else {
        if (pageAmount - 2 === page) {
          return [pageAmount - 1, pageAmount];
        } else if (pageAmount - 2 > page) {
          if (page - 2 < 3) {
            return [pageAmount];
          } else return [page + 1, 0, pageAmount];
        } else {
          return [pageAmount];
        }
      }
    }, [page, pageAmount]);

    return (
      <div className="pagination-item-wrap flex items-center">
        {listLeft.map((item) => (
          <div
            className={classNames({
              active: item === page,
              "pagination-item": item !== 0,
              "pagination-item__more": item === 0,
            })}
            onClick={() =>
              item !== 0
                ? setPage(item)
                : page - 5 > 4
                ? setPage(() => page - 5)
                : page <= 4
                ? setPage(() => page + 5)
                : setPage(() => (page - 5 > 1 ? page - 5 : 1))
            }
            key={`pag-${item}`}
          >
            {item !== 0 ? item : "..."}
          </div>
        ))}
        {listRight.map((item) => (
          <div
            className="pagination-item"
            onClick={() =>
              item !== 0
                ? setPage(item)
                : page + 5 < pageAmount - 3
                ? setPage(() => page + 5)
                : setPage(() => pageAmount)
            }
            key={`pag-${item}`}
          >
            {item !== 0 ? item : "..."}
          </div>
        ))}
      </div>
    );
  };

  const handlePrevious = useCallback(() => {
    if (page > 1) {
      setPage((value) => value - 1);
    }
  }, [currentPage, page, pageAmount]);

  const handleNext = useCallback(() => {
    if (page < pageAmount) {
      setPage((value) => value + 1);
    }
  }, [currentPage, page, pageAmount]);

  useDidUpdate(() => {
    onChangePage && onChangePage(page);
  }, [page]);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <div className="flex items-center justify-end mr-2">
      <Button
        icon={<Icon iconName="ChevronLeftMed"></Icon>}
        appearance="subtle"
        onClick={handleNext}
        disabled={page > 1}
      ></Button>
      <div className="ml-4 mr-4">
        <PaginationNumber page={page} pageAmount={pageAmount} />
      </div>
      <Button
        icon={<Icon iconName="ChevronRightMed"></Icon>}
        appearance="subtle"
        onClick={handlePrevious}
        disabled={page < pageAmount}
      ></Button>
    </div>
  );
}
