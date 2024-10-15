import { useState } from "react";
import sortByEnum from "../enums/sortByEnum";
import orderEnum from "../enums/orderEnum";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

interface SortType {
  order: orderEnum,
  sortBy: sortByEnum,
  setOrder: (arg: orderEnum) => void,
  setSortBy: (arg: sortByEnum) => void
}

function Sort({order, setOrder, sortBy, setSortBy}: SortType) {
    const [isForm, setIsForm] = useState<boolean>(false);
    const sortTypes = Object.values(sortByEnum);
    

    return (
        <div className="sort">
          <button
            className={`sort-button ${isForm ? "button-active" : ""}`}
            onClick={() => setIsForm(!isForm)}>
            {sortBy}
          </button>
          {isForm ? (
            <ul className="sort-list">
              {sortTypes.map((e, i) => {
                return (
                  <li className={"sort-item"} key={i}>
                    <button
                      className={sortBy === e ? "sort-active" : "sort-item-button"}
                      onClick={() => setSortBy(e)}>
                      {e}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            ""
          )}
          <div className={"sort-order"}>
            <GoTriangleDown
              title="By ascending"
              className={order === "asc" ? "sort-order-active" : ""}
              onClick={() => setOrder(orderEnum.ASCENDENT)}/>
            <GoTriangleUp
              title="By descending"
              className={order === "desc" ? "sort-order-active" : ""}
              onClick={() => setOrder(orderEnum.DESCENDENT)}/>
          </div>
        </div>
      );
}

export default Sort;