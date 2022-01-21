import { useState } from 'react'

function App() {
  const [city, setCity] = useState('')

  const [weather, setWeather] = useState(null)

  const [showLoading, setShowLoading] = useState(false)

  const [invalidCity, setInvalidCity] = useState(false)

  const searchWeather = () => {
    console.log(city)

    setShowLoading(true)
    console.log(`showLoading = ${showLoading}`)

    const link = 'http://api.weatherapi.com/v1/current.json?key='
    const key = '83eb9d090cf6483498a40555222001'
    const url = `${link}${key}&q=${city}&aqi=yes`

    fetch(url)
      .then(response => {
        // console.log(response)
        if (response.status === 200) {
          return response.json()
        } else {
          setInvalidCity(true)
        }
      })
      .then(data => {
        console.log(data)

        if (data !== undefined) {
          setInvalidCity(false)
        }

        setWeather(data)
        setCity('')
        setShowLoading(false)
      })
  }

  const handleCityChange = event => {
    setCity(event.target.value)
  }

  function handleAirQuality() {
    const weatherQuality = weather.current.air_quality['us-epa-index']

    console.log(weatherQuality)

    switch (weatherQuality) {
      case 1:
        return 'Good'
      case 2:
        return 'Moderate'
      case 3:
        return 'Unhealthy for sensitive group'
      case 4:
        return 'Unhealthy'
      case 5:
        return 'Very Unhealthy'
      case 6:
        return 'Hazardous'
        default:

    }
  }

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 justify-content-center">
          <a className="navbar-brand" href="#search">
            Weather
          </a>
        </nav>

        <main className="container " id="search">
          <div className="jumbotron">
            <h1 className="text-center text-primary">
              See the Weather in your city
            </h1>
            <p className="lead ">Type the city below</p>

            <div className="mb-4">
              <div>
                <input
                  type="text"
                  className="form-control"
                  value={city}
                  onChange={handleCityChange}
                />
              </div>
            </div>

            <button
              className="btn btn-primary btn-lg btn-block"
              onClick={searchWeather}
            >
              Search
            </button>

            {invalidCity ? (
              <>
                <div className="mt-4 alert alert-danger" role="alert">
                  City name invalid, please try again!
                </div>
              </>
            ) : null}

            {showLoading ? (
              <>
                <div className="spinner-border text-primary mt-4" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </>
            ) : null}

            {weather ? (
              <>
                <h1 className="mt-4 text-center text-primary">
                  Weather in {weather.location.name}, {weather.location.region}
                </h1>
                <div className="mt-4 d-flex justify-content-around align-items-center">
                  <div>
                    <h2>{weather.current.temp_c}°</h2>
                    <p className="lead">
                      Fells like {weather.current.feelslike_c}°
                    </p>
                    <p className="lead">Air Quality {handleAirQuality()}</p>
                  </div>
                  <div>
                    <h3>{weather.current.condition.text}</h3>
                    <img src={weather.current.condition.icon} alt="icon"></img>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </main>
      </div>
    </>
  )
}

export default App
