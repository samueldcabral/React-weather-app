import React, { Component } from 'react';
import axios from 'axios';
import TableWeather from './Table'

export default class Search extends Component {
  state = {
    weatherState: {}
  }

  componentWillMount = () => {
    let API_KEY =  '6148faff9108a7d1f74a9a332767fbfd';
    let URL = `http://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`
   
    axios.get(URL)
      .then(res => {
        let {visibility, main, wind, name,weather} = res.data
        let {temp_min, temp_max, humidity, temp} = main
        let weatherState = {'visibility': visibility, 'windSpeed': wind.speed, 'name': name, 'weather': weather[0].main, 'min': temp_min, 'max': temp_max, 'temp': temp, 'humidity': humidity}
        
        this.setState({weatherState})
     })
  }
  

  render() {
    return (
      <div className="tempo">
        <h1>Previsão do tempo</h1>
        <br></br>
        <TableWeather weather={this.state.weatherState} />
        <input type="text" className="input-box" placeholder="Insira aqui o nome da cidade" />
        <i className="fas fa-search search-icon"></i>
      </div>
    )
  }
}
