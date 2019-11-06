import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';

class WeeklyWeather extends React.Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      name: '',
      description: '',
      icon: '',
      temp: 0,
      humidity: 0,
      windSpeed: 0,
      windDeg: 0
    }

    this.apiKey = 'df30c6b21f05a144d97cea827eaf49eb';
  }

  componentDidMount = () => {
    navigator.geolocation.watchPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      axios.get(`api.openweathermap.org/data/2.5/forecast?lat=${this.state.latitude}&lon=${this.state.longitude}&units=metric&lang=fr&appid=${this.apiKey}`)
        .then((response) => {
          this.setState({
            name: response.data.name,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            temp: response.data.main.temp,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            windDeg: response.data.wind.deg
          });
        })
    })
  }

  //api.openweathermap.org/data/2.5/forecast?lat=35&lon=139 météo à 5 jours

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <img src={`https://openweathermap.org/img/wn/${this.state.icon}@2x.png`} alt={this.state.description} />
        <small>{this.state.description}</small>
        <p>{this.state.temp} °C</p>
        <p>{this.state.humidity} %</p>
        <p>{this.state.windSpeed * 3.6} km/h</p>
        <FontAwesomeIcon icon={faArrowCircleUp} style={{ transform: `rotate(${this.state.windDeg}deg)` }} size="2x" />
      </div>
    )
  };
}

export default WeeklyWeather;
