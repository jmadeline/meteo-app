import React from 'react';
import CurrentWeather from '../CurrentWeather';
import WeeklyWeather from '../../WeeklyWeather/WeeklyWeather';
import './Weather.css';

function Weather() {
  return (
    <div className="background">
      <CurrentWeather />
      <WeeklyWeather />
    </div>
  );
}

export default Weather;
