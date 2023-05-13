import { createSlice } from "@reduxjs/toolkit"

const rootSlice = createSlice({
    name: "root",
    initialState: {
        title: "Title",
        author: 'Author',
        cover: "Cover",
        pages: "Pages",
    },
    reducers: {
        // action is submitted elsewhere - written to state.name
        chooseName: (state, action) => { state.title = action.payload }, // All we're doing is setting the input to the state.name
        chooseEmail: (state, action) => { state.author = action.payload },
        choosePhone: (state, action) => { state.cover = action.payload },
        chooseAddress: (state, action) => { state.pages = action.payload },
    }
})

export const reducer = rootSlice.reducer;
export const { chooseName, chooseEmail, choosePhone, chooseAddress } = rootSlice.actions