import { createSlice } from "@reduxjs/toolkit"

const rootSlice = createSlice({
    name: "root",
    initialState: {
        make: "Make",
        model: "Model",
        year: "Year",
        serial: "Serial",
    },
    reducers: {
        // action is submitted elsewhere - written to state.name
        chooseName: (state, action) => { state.make = action.payload }, // All we're doing is setting the input to the state.name
        chooseEmail: (state, action) => { state.model = action.payload },
        choosePhone: (state, action) => { state.year = action.payload },
        chooseAddress: (state, action) => { state.serial = action.payload },
    }
})

export const reducer = rootSlice.reducer;
export const { chooseName, chooseEmail, choosePhone, chooseAddress } = rootSlice.actions