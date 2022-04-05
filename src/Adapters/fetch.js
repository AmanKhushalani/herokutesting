import axios from "axios";

const apiKey = 'CpAHPUHGDfAyyP0IALftSXh7U4qkXVJK';

const getCityCode = async (cityname) =>{

    const cityCode = await axios.get(
        `https://dataservice.accuweather.com/locations/v1/search?q=${cityname}&apikey=${apiKey}`
    )

    return cityCode.data;
    
}


const getForecastDetails = async (cityCode , hours)=>{

    const forecast = await axios.get(
        `https://dataservice.accuweather.com/forecasts/v1/hourly/${hours}hour/${cityCode}?apikey=${apiKey}`
    )
    
    return forecast.data;

}



// getdata function will call the getcitycode to get the code of city for which user has asked
// then it will call getforecastdetails to search the forecast of that city
export const getData = async (cityname , hours) =>{

    const data = await getCityCode(cityname);

    const cityCode = data[0].Key;

    hours = hours.split(" ")[0]

    const message = await getForecastDetails(cityCode , hours);

    return message;

}
