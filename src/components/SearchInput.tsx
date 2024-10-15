import { useContext } from "react";
import SearchContext from "../context/SearchValue";

function SearchInput() {
    const {setSearchValue} = useContext(SearchContext)

    const changeInput = (text: string) => {
        setSearchValue(text)
    }

    return(
        <div className="div-search">
            <input type="search" 
            className="search" 
            placeholder="Enter name of character" 
            autoComplete="off" 
            onChange={(e) => changeInput(e.target.value)}/>
        </div>
    )
}

export default SearchInput;