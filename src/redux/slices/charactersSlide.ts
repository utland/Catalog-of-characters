import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CharacterType from "../../interfaces/CharacterType"
import axios from "axios";
import getPages from "../../utils/getPages";
import preloadCardImages from "../../utils/preloadImages";

type Status = "loading" | "completed" | "error"

interface CharacterState {
    characters: CharacterType[],
    sortedList: CharacterType[],
    status: Status,
    currentPage: number,
    pages: number[],
}

export const fetchCharacters = createAsyncThunk("characters/fetchCharacters", 
    async () => {
        const {data} = await axios.get("https://genshin.jmp.blue/characters");

        const charactersPromises = data.map(async (e: string) => {
                const item = (await axios.get(`https://genshin.jmp.blue/characters/${e}`)).data;
                return item;
        })
        const characters: CharacterType[] = await Promise.all(charactersPromises);

        return characters
    }
)

const initialState: CharacterState = {
    characters: [],
    sortedList: [],
    status: "loading",
    currentPage: 1,
    pages: [1],
}

const charactersSlide = createSlice({
    name: "characters",
    initialState,
    reducers: {
        setCharacters: (state, action) => {
            state.sortedList = action.payload;
            state.pages = getPages(state.sortedList);
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
            window.scrollTo({ top: 0})
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCharacters.pending, (state) => {
            state.status = "loading"
        });
        builder.addCase(fetchCharacters.rejected, (state) => {
            state.status = "error"
        })
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            state.status = "completed";
            state.characters = action.payload as CharacterType[];
            state.pages = getPages(state.sortedList);
            
            preloadCardImages(state.characters)
        })
    }
})

export const {setCharacters, setCurrentPage} = charactersSlide.actions;

export default charactersSlide.reducer