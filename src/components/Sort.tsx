import { useState } from "react";
import sortByEnum from "../enums/sortByEnum";
import orderEnum from "../enums/orderEnum";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useDispatch } from "react-redux";
import { setOrder, setSortBy } from "../redux/slices/filterSlice";

interface SortType {
  order: orderEnum,
  sortBy: sortByEnum,
}

function Sort({order, sortBy}: SortType) {
    const [isForm, setIsForm] = useState<boolean>(false);
    const sortTypes = Object.values(sortByEnum);
    const dispatch = useDispatch()
    

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
                      onClick={() => {
                        dispatch(setSortBy(e))
                        setIsForm(false)
                      }
                    }>               
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
              onClick={() => dispatch(setOrder(orderEnum.ASCENDENT))}/>
            <GoTriangleUp
              title="By descending"
              className={order === "desc" ? "sort-order-active" : ""}
              onClick={() => dispatch(setOrder(orderEnum.DESCENDENT))}/>
          </div>
        </div>
      );
}

export default Sort;