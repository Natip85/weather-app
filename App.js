import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';

const API_KEY = '542b9cf13581d3c84269e1373af1a833'



export default function App() {

  const [weatherData, setWeatherData] = useState(null)
  const [loaded, setLoaded] = useState(true)

  async function fetchWeatherData(cityName){

    setLoaded(false)

    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`

    try{
      const response = await fetch(API)

      if(response.status == 200){
        const data = await response.json()
        setWeatherData(data)

      }else{
        setWeatherData(null)
      }
      setLoaded(true)

    }catch (error){
      console.log('OOPS', error)
    }

  }

  
  useEffect(()=>{
  fetchWeatherData('Mumbai')
  console.log(weatherData);
  }, [])


  if(!loaded){
    return(
      <View style={styles.container}>
        <ActivityIndicator color='gray' size={36} />
      </View>
    )
  }

  else if(weatherData === null) {
    return (
      <View style={styles.container}>
        <SearchBar fetchWeatherData={fetchWeatherData}/>
        <Text style={styles.primaryText}>City Not Found! Try A Different City</Text>
      </View>
    )
    
  }

  return (
    <View style={styles.container}>
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   primaryText: {
      margin: 20,
      fontSize: 28
  }
});
