import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList, ActivityIndicator
} from 'react-native';

import Weather from './src/components/weather';
import DailyWeather from './src/components/dailyWeather';

import Geolocation from '@react-native-community/geolocation';
import { getWeatherAPI, getLocation } from './src/networking/weatherServices';

const today = new Date();
const index = today.getDay();
const dayOfWeek = [
  { title: "Chủ nhật", temp: '', icon: '', },
  { title: "Thứ 2", temp: '', icon: '', },
  { title: "Thứ 3", temp: '', icon: '', },
  { title: "Thứ 4", temp: '', icon: '', },
  { title: "Thứ 5", temp: '', icon: '', },
  { title: "Thứ 6", temp: '', icon: '', },
  { title: "Thứ 7", temp: '', icon: '', },
];

const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
let data = dayOfWeek;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'Loading...',
      currentTemp: '',
      currentIcon: '',
      description: '',
      loading: true,
    }
  }

  componentDidMount() {
    this.handleDayOfWeek();
    this.getWeather();
  }

  getWeather = () => {
    // get lat, lon
    let address = '';
    Geolocation.getCurrentPosition(info => {
      const lon = info.coords.longitude;
      const lat = info.coords.latitude;
      getLocation(lat, lon).then(res => {
        address = res.results[4].address;
      }).then(() => {
        //get weather
        getWeatherAPI(lat, lon).then(res => {
          for (let i = 0; i <= 6; i++) {
            data[i].temp = res.daily[i + 1].temp.day;
            data[i].icon = res.daily[i + 1].weather[0].icon;
          }
          this.setState({
            currentTemp: res.current.temp,
            currentIcon: res.current.weather[0].icon,
            description: res.current.weather[0].description,
            location: address,
            loading: false,
          })
        })
      }, (error) => alert(error.message), { timeout: 5000, enableHighAccuracy: true })
    })
  }

  handleDayOfWeek = () => {
    if (index != 6) {
      const tempArr = dayOfWeek.slice(0, index + 1);
      const tempDayOfWeek = dayOfWeek.slice(index + 1);
      const Tempdata = [...tempDayOfWeek, ...tempArr];
      data = Tempdata
    }
  }

  render() {
    const { location, currentIcon, currentTemp, description, loading } = this.state;
    if (loading == false) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.location}>{location}</Text>
          </View>

          <View style={styles.weatherContainer}>

            <Weather
              description={description}
              date={`${dd}/${mm}/${yyyy}`}
              dayOfWeek={dayOfWeek[index].title}
              temp={currentTemp}
              icon={`http://openweathermap.org/img/wn/${currentIcon}@2x.png`} />

            <View style={styles.dailyWeather}>
              <FlatList

                data={data}
                renderItem={({ item }) => {
                  return <DailyWeather
                    title={item.title}
                    temp={item.temp}
                    icon={`http://openweathermap.org/img/wn/${item.icon}@2x.png`} />
                }}
                keyExtractor={item => item.title.toString()}
              />
            </View>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FF0080" />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  weatherContainer: {
    flex: 1,
  },
  location: {
    textAlign: 'center',
    fontSize: 20,
  },
  dailyWeather: {
    flex: 2,
    backgroundColor: 'green',
    marginBottom: 20,
    borderRadius: 5,
    justifyContent: 'space-between',
    padding: 10
  }
});

