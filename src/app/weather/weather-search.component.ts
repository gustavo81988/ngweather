import { Component } from '@angular/core';
import { WeatherService } from './weather.service';
import {WeatherItem} from './weather-item';

@Component({
  selector: 'weather-search',
  template: `
   <section class="weather-search">
      <form (ngSubmit)="onSubmit(f)"  #f="ngForm">
        <label for="city">City</label>
        <input type="text" ngModel id="city" name="location" required>
        <button type="submit">Add City</button>
      </form>
      <div>
        <span class="info">City Found:</span> City Name
      </div>
   </section>
  `,
  styles: [`
    button {
      background-color: #2ecc71;
      border: none;
      padding: 4px 8px;
      box-shadow: 1px 1px 1px #95a5a6;
      cursor: pointer;
      color: white;
    }

    button:hover {
      background-color: #27ae60;
    }
  `],
  providers: [WeatherService]
})
export class WeatherSearchComponent{

  constructor(private weatherService: WeatherService){}

  onSubmit(form){
    this.weatherService.searchWeather(form.value.location).subscribe(
      data => {
        const weatherItem = new WeatherItem(data.name,data.weather[0].description, data.main.temp);
        this.weatherService.addWeatherItem(weatherItem);
      }
    );
  }
}
