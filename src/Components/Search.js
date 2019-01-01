import React, { Component } from 'react';
import axios from 'axios';
import TableWeather from './Table'
import CapitalWeather from './CapitalWeather'
import { Promise } from 'q';

export default class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      citiesWeather: [],
      cities: ['rio de janeiro', 'sao paulo', 'belo horizonte', 'brasilia', 'belem', 'salvador', 'curitiba', 'fortaleza', 'manaus', 'joao pessoa']
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let result = event.target.value
    this.setState(() => {
      return {searchCity: result}
    })     
  }
  handleSubmit(event) {
    event.preventDefault()
    let searchCity = this.state.searchCity
    this.setState({searchCity})
  }

  componentDidMount(){
    let API_KEY =  '6148faff9108a7d1f74a9a332767fbfd';
    let { cities } = this.state
    let promises = cities.map(city => {
      city = city.replace(' ', '%20')
      let URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      return axios.get(URL)
    })
    Promise.all(promises)
    .then(values => {
      let citiesWeather = values.map(x => x.data)
      this.setState({citiesWeather})
    })
  }

  render() {
    return (
      <div className="tempo">
        <h1 className="tempo__h1">Previsão do tempo</h1>
        <br></br>
        <TableWeather searchCity={this.state.searchCity}/>
        {/* <form onSubmit={this.handleSubmit}>
          <input type="text" className="input-box" placeholder="Insira aqui o nome da cidade" name="textAr" value={this.state.searchCity} onChange={this.handleChange}/>
          <i className="fas fa-search search-icon" onClick={this.handleSubmit}></i>
        </form> */}
        <hr className="mainHr"></hr>
        <CapitalWeather citiesWeather={this.state.citiesWeather} />
      </div>
    )
  }
}
