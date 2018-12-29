import React from 'react'

const TableWeather = ({ weather }) => {
  console.log(`this is ${weather.name}`)
  
  return (
    <div className="cardTempo grid">
      <h3 className="cardTempo__h3">{weather.name}</h3>
      <div className="cardTempo__X">X</div>
      <h2 className="cardTempo__h2 text_left">{kelvinToC(weather.temp)}°C {weather.weather}</h2>
      <section className="gridCard">
        <div className="flex minmax text_left gridarea">
          <i class="fa fa-arrow-down arrow" aria-hidden="true"></i>
          <p className="min-max"><strong>{kelvinToC(weather.min)}°</strong></p>
          <i class="fa fa-arrow-up arrow" aria-hidden="true"></i>
          <p className="min-max "><strong>{kelvinToC(weather.max)}°</strong></p>
        </div>
        <div className="sensacao text_left gridarea">
          <p>Sensação <strong>{kelvinToC(weather.temp)}°</strong></p> 
        </div>
        <div className="vento text_left gridarea">
          <p>Vento <strong>{weather.windSpeed}km/h</strong></p> 
        </div>
        <div className="humidade text_left gridarea">
          <p>Humidade <strong>{weather.humidity}%</strong></p> 
        </div>
      </section>
      <hr></hr>
    </div>
  )
}


const kelvinToC = (temp) => {
  let tempC = (temp - 273.15).toFixed(0);
  return tempC;
}

export default TableWeather