import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CharacterType from "../../interfaces/CharacterType"
import axios from "axios";
import getPages from "../../utils/getPages";

type Status = "loading" | "completed" | "error"

interface CharacterState {
    characters: CharacterType[],
    sortedList: CharacterType[],
    status: Status,
    currentPage: number,
    pages: number[],
    images: {[index: string]: any}
}

export const fetchCharacters = createAsyncThunk("characters/fetchCharacters", 
    async () => {
        const {data} = await axios.get("https://genshin.jmp.blue/characters");
        const images: {[index: string]: any} = {}

        const charactersPromises = data.map(async (e: string) => {
                const item = (await axios.get(`https://genshin.jmp.blue/characters/${e}`)).data;
                const urlImg = await fetch(`https://genshin.jmp.blue/characters/${item.id.toLocaleLowerCase()}/icon-big`)
                images[item.name] = URL.createObjectURL(await urlImg.blob())?.toString(); 
                return item;
        })
        const characters: CharacterType[] = await Promise.all(charactersPromises);

        return {characters, images}
    }
)

const initialState: CharacterState = {
    characters: [],
    sortedList: [],
    status: "loading",
    currentPage: 1,
    pages: [1],
    images: {}
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
            state.characters = action.payload.characters as CharacterType[];
            state.images = action.payload.images
            state.pages = getPages(state.sortedList);
        })
    }
})

export const {setCharacters, setCurrentPage} = charactersSlide.actions;

export default charactersSlide.reducer