import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './Weather.css'

export function Weather() {
  const [city, setcity] = useState("")
  const [weather, setWeather] = useState('')
  const [background, setbackground] = useState();
  const [loading, setloading] = useState(false)

  const weatherGifs = {
    clouds: 'https://imgs.search.brave.com/PsUxvcNdduW3G7HpZpWQP28EwOeyKPBTTdn3w7xbOPk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM2/NzA5MzI3Mi9waG90/by9jbG91ZHNjYXBl/LXdpdGgtYS1saWdo/dC5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9bkZhTWpFd21O/MkVNTmJaM0thelc2/el9xaVY5QjdRZHQ0/MGRyNnVFZVV4ND0',
    smoke: 'https://media1.tenor.com/m/gWcFJSSYIx4AAAAd/fog-trees.gif',
    clear: 'https://imgs.search.brave.com/Gv_hbZJaPRIhGr-wCzShI3lbIb6gNXFlZATBrxCOxrA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzYxLzYzLzk4/LzM2MF9GXzM2MTYz/OTgwNF9kdnBWUmsy/ZHJQald0NFhpdXdo/OVQ1REM2bGVsckhK/TC5qcGc',
    rain: 'https://media1.tenor.com/m/aRSo1MdHGnUAAAAC/animegif-rain.gif',
    haze: 'https://imgs.search.brave.com/viCQPhr1QqRqjjiZmUBrp5u5id9Q4SGqIfX_pIETZtE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kMmg4/aHJhbXUzeHFvaC5j/bG91ZGZyb250Lm5l/dC9ibG9nL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIyLzA4L0hh/enktU2tpZXMtc2Nh/bGVkLndlYnA',
    Default: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/first-snow-in-a-beautiful-mountain-village-free-image.jpeg?w=1024&quality=50'



  }

  const fetchWeather = async () => {
    if (!city) return;

setloading(true);
setWeather(null);

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'8486e9daa0b6ea3e40a49ec4735f308a'}`);
      setWeather(response);

      const weatherType = response.data.weather[0].main.toLowerCase();

      setbackground(weatherGifs[weatherType] || weatherGifs.Default);

    } catch (error) {
      console.log(error);

    } finally{
      setloading(false)
    }
  };

  const handleKeyPress = (e) =>{
    if(e.key === 'Enter'){
    fetchWeather();

    }
  }





  return (

    <div key={background} className="weather-container"
     style={{ background: `url(${background})`,
     backgroundRepeat:'no-repeat',
     backgroundAttachment:'fixed',
     backgroundPosition:'center center',
     backgroundSize: 'cover',
      height: '100vh',
       width: '100vw' }}>
      <h1>Weather App</h1>
      <input type="text" placeholder='Enter your city Name' value={city} onChange={(e) =>{
        setcity(e.target.value)
      }} onKeyDown={handleKeyPress} />
      <button onClick={fetchWeather}>Get Weather</button>
      {loading&& <p style={{fontWeight:'700'}}>Please wait...</p> }
      {weather && <>
        <div className="weather-info">
          <h2>{weather.data.name}</h2>
          <p> Temprature: {(weather.data.main.temp - 273.15).toFixed()} °C</p>
          <p>Weather: {weather.data.weather[0].description}</p>
          <p>Humidity: {weather.data.main.humidity}%</p>
          <p>Wind Speed: {weather.data.wind.speed} m/s</p>
          <p>Visibility: {(weather.data.visibility / 1000)} km</p>

        </div>
      </>}
    </div>
  )
}

