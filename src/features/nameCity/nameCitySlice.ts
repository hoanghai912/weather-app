import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface NameCityState {
    name: string
}

const initialState: NameCityState = {
    name: ""
}

export const nameCitySlice = createSlice({
    name: 'nameCity',
    initialState,
    reducers: {
        setNameCity: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        }
    }
})

export const { setNameCity } = nameCitySlice.actions

export default nameCitySlice.reducer