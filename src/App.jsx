import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import WeatherContext, { CityContext } from "./Adapters/context";
import Form from "./Components/Form";
import Header from "./Components/Header";
import MyTimeline from "./Components/Timeline";
import './Styles/index.css'




export default function App() {

    // Here is the context api to serve forecast data fetched and searched city name !
    const [weatherData, updateWeatherData] = useState([])
    const [searchedCityName, updateSearchedCityName] = useState("")

    return <>
            <CityContext.Provider value={{ searchedCityName, updateSearchedCityName }}>
                <WeatherContext.Provider value={{ weatherData, updateWeatherData }}>
                    <Header />
                    <div id="mainContainer">
                        <Routes>
                            <Route exact path="/" element={<Navigate replace to={'/search'} />} />
                            <Route exact path="/search" element={<Form />} />
                            <Route exact path="/data" element={<MyTimeline />} />
                        </Routes>
                    </div>
                </WeatherContext.Provider>
            </CityContext.Provider>

    </>

}
