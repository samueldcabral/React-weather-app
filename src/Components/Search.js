import React, { Component } from 'react';
import axios from 'axios';

export default class Search extends Component {
  componentDidMount = () => {
    console.log('did mount')
    let API_KEY =  '6148faff9108a7d1f74a9a332767fbfd';
    let URL = `http://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`
   
    axios.get(URL)
      .then(res => {
        console.log('did');
        console.log(res.data)
        console.log(res.data.name)
        let min;
        let max;
        let sensation;
        let wind;
        let humidity;
        let city;
        let state;
        let country;
        let currentTemp;
        let condition;
        // const persons = res.data;
        // this.setState({ persons });
      })
  }
  

  render() {
    return (
      <div className="tempo">
        <h1>Previsão do tempo</h1>
        <br></br>
        <input type="text" className="input-box" placeholder="Insira aqui o nome da cidade" />
        <i className="fas fa-search search-icon"></i>
      </div>
    )
  }
}
