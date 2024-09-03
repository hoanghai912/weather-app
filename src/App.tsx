import { useSelector, useDispatch } from "react-redux"
import { ChangeEvent, useEffect, useState } from "react"
import type { RootState } from './app/store'


import { WeatherHourlyState } from "./features/fullWeather/fullWeatherSlice"
import { setWeather } from "./features/fullWeather/fullWeatherSlice"
import { setNameCity } from "./features/nameCity/nameCitySlice"

import cityNight from "./assets/city_night.jpg"
import cityDay from "./assets/city_day.jpg"
import cityRain from "./assets/city_rain.jpg"
import { WeatherIcon } from "./utils/WeatherIcon"


const urlApi = `http://localhost:3001/weather`

const Card = () => {
  const currentWeather = useSelector((state: RootState) => state.fullWeather)
  const currentCity = useSelector((state: RootState) => state.nameCity.name)
  const currentHour = new Date().getHours()

  const switchImageBackground = () => {
    if (currentWeather.weather.length === 0) return cityDay
    if (currentWeather.weather[currentHour].conditions.toLowerCase().includes("rain")) return cityRain
    else if (currentHour < 6 || currentHour > 18) return cityNight
    else return cityDay
  }

  return (
    <div className="w-3/5 h-4/5 relative m-auto">
      <img src={switchImageBackground()}
        className="w-full h-full rounded-xl opacity-50 drop-shadow-xl shadow-md"
      />

      <div className="absolute top-5 left-5 text-5xl font-bold">{currentCity}</div>

      <div className="w-full absolute bottom-0 flex overflow-x-scroll justify-around">
        {currentWeather.weather.map((data: WeatherHourlyState) => {
          return <WeatherCardHourly key={data.datetime} data={data} />
        })}
      </div>

    </div>

  )
}

interface WeatherCardHourlyProps {
  data: WeatherHourlyState
}
const WeatherCardHourly = (props: WeatherCardHourlyProps) => {
  const { data } = props
  return (
    <div className="weather-card-hourly min-w-40 flex flex-col items-center bg-slate-100 opacity-80 rounded-lg ml-5 last:mr-5">
      <img src={WeatherIcon[data.icon]} className="w-16 h-16 mt-2" />
      <p className="font-medium">{data.datetime}</p>
      <p>{data.temp}°C</p>
      <p className="font-medium">{data.conditions}</p>
    </div>
  )
}

function App() {
  const dispatch = useDispatch()
  const nameCity = useSelector((state: RootState) => state.nameCity.name)
  const [nameInput, setNameInput] = useState(nameCity)

  const getHourly = (datetime: string) => {
    return datetime.substring(0, 5)
  }

  const fetchData = (city: string = "Hồ Chí Minh") => {
    fetch(`${urlApi}/${city}`)
      .then(response => response.json())
      .then(response => {
        const res = response.days[0].hours.map((data: WeatherHourlyState) => {
          return {
            datetime: getHourly(data.datetime),
            icon: data.icon,
            temp: data.temp,
            conditions: data.conditions
          }
        })
        dispatch(setNameCity(response.resolvedAddress))
        dispatch(setWeather(res))
      })
      .catch(() => alert('Something went wrong!'))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleChangeInputCity = (e: ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value)
  }

  const handleSubmitNameCity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetchData(nameInput)
    // console.log(e.currentTarget.inp.value)
  }

  return (
    <div className="w-screen h-screen bg-slate-200 overflow-hidden flex flex-col">
      <form className="w-3/5 m-auto my-5"
        onSubmit={handleSubmitNameCity}
      >
        <input className="w-full p-2 rounded-lg" placeholder="Enter city" defaultValue={nameCity} name="inp"
          onChange={handleChangeInputCity}
          spellCheck={false}
        />
      </form>
      <Card />
    </div>
  )
}

export default App
