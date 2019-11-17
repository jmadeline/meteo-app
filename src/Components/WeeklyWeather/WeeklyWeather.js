import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './WeeklyWeather.css';
import { faTint } from '@fortawesome/free-solid-svg-icons';

class WeeklyWeather extends React.Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      fiveDayWeather: []
    }
    this.apiKey = 'daa9adc7b62436c44254050a71f5ed02';
  }

  componentDidMount = () => {
    navigator.geolocation.watchPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.latitude}&lon=${this.state.longitude}&units=metric&lang=fr&APPID=${this.apiKey}`)
        .then((response) => {
          this.setState({
            fiveDayWeather: response.data.list
          });
          console.log(this.state.fiveDayWeather)
        })
    })
  }

  formatDate = (date) => {
    const dateObject = new Date(Date.parse(date));
    const options = { weekday: "short", month: "long", day: "numeric" };
    return dateObject.toLocaleString("fr-FR", options);
  }

  // récupère la météo (à midi) des jours à venir
  isMidday = (weather, index) => {
    return (index === 7 || index === 15 || index === 23 || index === 31 || index === 39);
  }

  render() {
    return (
      <>
        <hr />
        <h2>Prévisions à 5 jours</h2>
        <div className='weeklyWeather'>
          {this.state.fiveDayWeather
            .filter(this.isMidday)
            .map((item, index) => {
              return (
                <div key={index} >
                  <p>{this.formatDate(item.dt_txt)}</p>
                  <div className='humidity'>
                    <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} />
                    <p>{item.main.temp} °</p>
                  </div>
                  <small>{item.weather[0].description}</small>
                  <div className='humidity'>
                    <FontAwesomeIcon icon={faTint} />
                    <p>{item.main.humidity} %</p>
                  </div>
                </div>)
            })
          }
        </div>
      </>
    )
  };
}

export default WeeklyWeather;
