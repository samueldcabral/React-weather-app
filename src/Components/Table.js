import React from 'react'

const TableWeather = ({ weather, bulkWeather }) => {
  const days = (bulkWeather.map(x => {
    return (
      <th class="widthTh">{getDay[x.Day]}</th>
    )
  }))
  const temps = (bulkWeather.map(x => {
    return (
      <td class="widthTd"><div class="gridA"><div class="leftA">{displayTemp(x.minTemp)}°</div><div class="rightA">{displayTemp(x.maxTemp)}°</div></div></td>
    )
  }))

  return (
    <div className="cardTempo grid">
      <h3 className="cardTempo__h3">{weather.name}</h3>
      <div className="cardTempo__X">X</div>
      <h2 className="cardTempo__h2 text_left">{displayTemp(weather.temp)}°C {weather.weather}</h2>
      <section className="gridCard">
        <div className="flex minmax text_left gridarea">
          <i class="fa fa-arrow-down arrow" aria-hidden="true"></i>
          <p className="min-max"><strong>{displayTemp(weather.min)}°</strong></p>
          <i class="fa fa-arrow-up arrow" aria-hidden="true"></i>
          <p className="min-max "><strong>{displayTemp(weather.max)}°</strong></p>
        </div>
        <div className="sensacao text_left gridarea">
          <p>Sensação <strong>{displayTemp(weather.temp)}°</strong></p> 
        </div>
        <div className="vento text_left gridarea">
          <p>Vento <strong>{weather.windSpeed}km/h</strong></p> 
        </div>
        <div className="humidade text_left gridarea">
          <p>Humidade <strong>{weather.humidity}%</strong></p> 
        </div>
      </section>
      <hr></hr>
      <table class="table">
        <tbody>
          <tr class="tr">
            {days}
          </tr>
          <tr>
            {temps}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const getDay = {
  0: 'Domingo',
  1: 'Segunda',
  2: 'Terça',
  3: 'Quarta',
  4: 'Quinta',
  5: 'Sexta',
  6: 'Sábado'
}
const displayTemp = (temp) => {
  let tempC = Math.round(temp).toFixed(0)
  return tempC;
}

export default TableWeather