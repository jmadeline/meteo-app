import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp, faTint, faWind } from '@fortawesome/free-solid-svg-icons';
import './CurrentWeather.css';

class CurrentWeather extends React.Component {
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
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&units=metric&lang=fr&appid=${this.apiKey}`)
        .then((response) => {
          console.log(response)
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

  degreesToCardinal = (deg) => {
    console.log('deg', deg);
    if (deg > 45 && deg <= 135) {
      return 'E';
    } else if (deg > 135 && deg <= 225) {
      return 'S';
    } else if (deg > 225 && deg <= 315) {
      return 'O';
    } else if ((deg > 315 && deg < 360) || (deg >= 0 && deg <= 45)) {
      console.log('N')
      return 'N';
    } else {
      return '';
    }
  }


  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <div className='iconAndTemp'>
          <img src={`https://openweathermap.org/img/wn/${this.state.icon}@2x.png`} alt={this.state.description} />
          <p>{Math.round(this.state.temp)} °</p>
        </div>
        <small>{this.state.description}</small>
        <div className='humidity'>
          <FontAwesomeIcon icon={faTint} />
          <p> {this.state.humidity} %</p>
        </div>
        <div className='humidity'>
          <FontAwesomeIcon icon={faWind} />
          <p>{this.degreesToCardinal(this.state.windDeg)} {(this.state.windSpeed * 3.6).toFixed(2)} km/h</p>
        </div>
      </div>
    );
  }
}

export default CurrentWeather;
