import { configureStore } from "@reduxjs/toolkit";
import fullWeatherReducer from "../features/fullWeather/fullWeatherSlice";
import nameCityReducer from '../features/nameCity/nameCitySlice'

export const store = configureStore({
    reducer: {
        fullWeather: fullWeatherReducer,
        nameCity: nameCityReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch