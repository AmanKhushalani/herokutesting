import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import WeatherContext, { CityContext } from '../Adapters/context';

export default function MyTimeline(props) {


    // thie timline code is taken from Material UI framework !

    const weatherData = React.useContext(WeatherContext);
    const cityName = React.useContext(CityContext);

    // These functions will return the time and the date from the string
    const getTime = (string) => {
        string = string.split('T')[1]
        return string.split('+')[0];
    }
    const getDate = (string) => {
        return string.split('T')[0]
    }



    // This whole div contains the code of timeline !
    return (<div id='dataContainer'>

        <Typography variant="h4" gutterBottom component="div" style={{ "textAlign": "center" }}>
            Forecast Report of {cityName.searchedCityName}
        </Typography>
        <Timeline position="alternate">
            {
                // map function is used to iterate the data from array list
                weatherData.weatherData.map((index, value) => {
                    return <TimelineItem key={index}>
                        <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                            {getDate(weatherData.weatherData[value].DateTime)}
                            <Typography>{getTime(weatherData.weatherData[value].DateTime)}</Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot>

                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                                {weatherData.weatherData[value].Temperature.Value + "°  " + weatherData.weatherData[value].Temperature.Unit}
                            </Typography>
                            <Typography>{weatherData.weatherData[value].IconPhrase}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                })
            }
        </Timeline>
    </div>
    );
}