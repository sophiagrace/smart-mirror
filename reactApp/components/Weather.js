import React from 'react';
import axios from 'axios';
import weatherIcon from '../helperFunctions/weatherIcon.js';

class Weather extends React.Component {
  constructor() {
    super();
    this.state = {
      interval: () => '',
    };
  }
  componentDidMount() {
  //update weather
    this.setState({ interval: setInterval(() => {
      axios.get('http://api.openweathermap.org/data/2.5/weather?q=SanFrancisco&APPID=89fdd5afd3758c1feb06e06a64c55260')
      .then(resp => {
        this.setState({
          description: resp.data.weather[0].description,
          min: resp.data.main.temp_min-273.15,
          max: resp.data.main.temp_max-273.15,
          current: (resp.data.main.temp-273.15).toFixed(0),
          icon: resp.data.weather[0].icon
        });
        console.log(this.state.icon);
      });
    }, 100000)
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
    console.log('clearing');
  }
  render() {
    const icon = weatherIcon(this.state.icon);
    return (
      <div className='weather'>
      <img src={icon} height="75" width="75"></img>
        <div className='current'>
          currently {this.state.current}˚C
        </div>
        <div className='description'>
          {this.state.description}
        </div>
        <div className='min-max'>
          {this.state.min}˚C  |  {this.state.max}˚C
        </div>
      </div>
    );
  }
}

export default Weather;
