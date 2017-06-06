import { Injectable } from '@angular/core';
import {WEATHER_ITEMS} from './weather.data';
import {WeatherItem} from './weather-item';
import {Observable} from 'rxjs/Observable';
import  'rxjs/Rx';
import {Http} from '@angular/http'; 

@Injectable()
export class WeatherService {
  
  constructor(private http: Http){}

  getWeatherItems(){
    return WEATHER_ITEMS;
  }
  
  addWeatherItem(weatherItem: WeatherItem){
    WEATHER_ITEMS.push(weatherItem);
  }
  
  clearWeatherItems(){
    WEATHER_ITEMS.splice(0);
  }

  searchWeather(cityName: string){
      
      return this.http.get('http://api.openweathermap.org/data/2.5/weather?q='+cityName+',&appid=0afd19b2e3ca7839d3828f909f129f46&units=metric')
        .map( (response) => response.json() )
        .catch( (error)=>{
          console.log(error);
          return Observable.throw(error.json())
        })
      ;
  }

}
