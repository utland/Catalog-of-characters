import { useDispatch, useSelector } from "react-redux";
import { IRootState, ThunkDispatch } from "../interfaces/ReduxDefaultTypes";
import { setCurrentPage } from "../redux/slices/charactersSlide";

function Pagination() {
    const {currentPage, pages} = useSelector((state: IRootState) => state.characters)
    const dispatch = useDispatch<ThunkDispatch>();

    return( 
        <div className="pagination">
        {
        pages.length === 1 ? "" : pages.map((e: number, i: number) => {
            return <button className={e === currentPage ? "active" : ""} key={i} onClick={() => dispatch(setCurrentPage(e))}>
                {e}
                </button>})
        }
        </div>
    )
}

export default Pagination