import React from 'react';
import axios from 'axios';
import './WeeklyWeather.css';

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

  render() {
    //filtrer 7 / 15 / 23 / 31 / 39
    return (
      <>
        <h2>Prévision à cinq jour</h2>
        <div className='weeklyWeather'>
          {this.state.fiveDayWeather.filter((weather, index) => { if (index === 7 || index === 15 || index === 23 || index === 31 || index === 39) { return weather } })
            .map((item, index) => {
              console.log(item)
              return (
                <div key={index} >
                  <p>{item.dt_txt}</p>
                  <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} />
                  <small>{item.weather[0].description}</small>
                  <p>{item.main.temp} °C</p>
                  <p>{item.main.humidity} %</p>
                </div>)
            })
          }
        </div>
      </>
    )
  };
}

export default WeeklyWeather;
