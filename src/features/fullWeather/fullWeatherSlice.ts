import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface WeatherHourlyState {
  datetime: string,
  icon: string,
  temp: number,
  conditions: string,
}

export interface FullWeatherState {
  weather: WeatherHourlyState[]
}

const initialState: FullWeatherState = {
  weather: []
}

export const fullWeatherSlice = createSlice({
  name: 'fullWeather',
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<WeatherHourlyState[]>) => {
      state.weather = action.payload
    }
  }
})

export const { setWeather } = fullWeatherSlice.actions

export default fullWeatherSlice.reducer