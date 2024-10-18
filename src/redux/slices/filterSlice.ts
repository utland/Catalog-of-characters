import { createSlice } from "@reduxjs/toolkit";
import orderEnum from "../../enums/orderEnum";
import sortByEnum from "../../enums/sortByEnum"

interface filterState {
    sortBy: sortByEnum;
    order: orderEnum
}

const initialState: filterState = {
    sortBy: sortByEnum.NAME,
    order: orderEnum.DESCENDENT
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setOrder: (state, action) => {
            state.order = action.payload;
        }
    }
})

export const {setOrder, setSortBy} = filterSlice.actions

export default filterSlice.reducer;