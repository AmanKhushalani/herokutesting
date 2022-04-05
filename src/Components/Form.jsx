import React, { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormControl, InputLabel, Input, } from '@mui/material';
import Button from '@mui/material/Button';
import { getData } from "../Adapters/fetch";
import WeatherContext, { CityContext } from "../Adapters/context";
import { Navigate, useNavigate } from "react-router-dom";


const Form = () => {


    // use state of form data
    const [formData, updateFormData] = useState({
        cityName : "",
        hoursSelected : ""
    });

    const updateData = (e)=>{
        updateFormData((prevValue)=>{
            return {
                ...prevValue , 
                [e.target.name] : e.target.value
            }
        })

    }

    // this is the list for auto fill in text box
    const hours = [
        { "label": "1 hour(s)" },
        { "label": "12 hour(s)" },
        // { "label": "24 hour(s)" },
        // { "label": "72 hour(s)" },
        // { "label": "120 hour(s)" },
    ];

    const hoursList = {
        "1 hour(s)" : 1,
        "12 hour(s)" : 12,
        // "24 hour(s)" : 24,
        // "72 hour(s)" : 72,
        // "120 hour(s)" : 120,

    }


    const weatherData = useContext(WeatherContext);
    const cityContext = useContext(CityContext);
    const navigate = useNavigate()

    const showData = (e) => {
        if(hoursList[formData.hoursSelected] === undefined) alert("Select hoursr from given list !");
        if(formData.cityName.trim() === "") alert("Please fill some City Name !");

        let data = getData(formData.cityName , formData.hoursSelected);

        data.then(function(value){
            weatherData.updateWeatherData(value);
        }).then(function(){
            cityContext.updateSearchedCityName(formData.cityName);
            navigate("/data");
        })

    }


    //  this whole container is for form
    return <FormControl id="formControl" >
        <InputLabel aria-autocomplete="OFF"  id="cityInput" htmlFor="my-input">Search City</InputLabel>
        <Input
            id="cityName"
            name="cityName"
            value={formData.cityName}
            onChange={updateData}
            aria-describedby="my-helper-text"
            autoComplete="OFF"
        />

        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={hours}
            sx={{ width: 300 }}
            onSelect={updateData}
            renderInput={(params) => <TextField {...params} value={formData.hoursSelected} name="hoursSelected"   label="Hours" style={{ backgroundColor: "pink !important" }} />}
        />

        <Button variant="outlined" onClick={showData}>Get Forecast</Button>


    </FormControl>
}


export default Form;
