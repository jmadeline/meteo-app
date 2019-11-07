import React from 'react';
import axios from 'axios';

class WeeklyWeather extends React.Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      name: '',
      date: '',
      description: '',
      icon: '',
      temp: 0,
      humidity: 0,
      windSpeed: 0,
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
            //   name: response.data.city.name,
            //   date: response.data.list[6].dt_txt,
            //   description: response.data.list[6].weather[0].description,
            //   icon: response.data.list[6].weather[0].icon,
            //   temp: response.data.list[6].main.temp,
            //   humidity: response.data.list[6].main.humidity,
            //   windSpeed: response.data.list[6].wind.speed
          });
          console.log(this.state.fiveDayWeather)
        })
    })
  }



  render() {
    //filtrer 7 / 15 / 23 / 31 / 39
    return (
      <div>
        {this.state.fiveDayWeather.filter((weather, index) => { if (index === 7 || index === 15 || index === 23 || index === 31 || index === 39) { return weather } })
          .map(item => {
            console.log(item)
            return <p>{item.dt_txt}</p>
          })
        }
        {/* <h1>{this.state.name}</h1>
        <p>{this.state.date}</p>
        <img src={`https://openweathermap.org/img/wn/${this.state.icon}@2x.png`} alt={this.state.description} />
        <small>{this.state.description}</small>
        <p>{this.state.temp} °C</p>
        <p>{this.state.humidity} %</p>
        <p>{this.state.windSpeed} km/h</p> */}
      </div>
    )
  };
}

export default WeeklyWeather;
