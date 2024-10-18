import { combineReducers } from "@reduxjs/toolkit"
import store from "../redux/store"

const rootReducer = combineReducers({})
type IRootState = ReturnType<typeof rootReducer>
type ThunkDispatch = typeof store.dispatch

export type {IRootState, ThunkDispatch}