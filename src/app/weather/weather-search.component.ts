import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import {WeatherItem} from './weather-item';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'weather-search',
  template: `
   <section class="weather-search">
      <form (ngSubmit)="onSubmit(f)"  #f="ngForm">
        <label for="city">City</label>
        <input type="text" ngModel id="city" name="location" required autocomplete=off (input)="onSearchLocation(input.value)" #input>
        <button type="submit">Add City</button>
        <button type="button" (click)="clearWeatherData()">Clear</button>
      </form>
      <div>
        <span class="info">City Found:</span> {{data.name}}
      </div>
   </section>
  `,
  styles: [`
    button {
      background-color: #239954;
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
export class WeatherSearchComponent implements OnInit{
  private searchStream = new Subject<string>();
  public  data: any = {};

  constructor(private weatherService: WeatherService){}
  
  public onSubmit(form):void {
    this.weatherService.searchWeather(form.value.location).subscribe(
      data => {
        const weatherItem = new WeatherItem(data.name,data.weather[0].description, data.main.temp);
        this.weatherService.addWeatherItem(weatherItem);
      }
    );
  }

  public onSearchLocation(cityName: string){
    if(cityName.length > 0){
      this.searchStream.next(cityName);
    }
  }

  public clearWeatherData(){
    this.weatherService.clearWeatherItems();
  }

  ngOnInit(){
    this.searchStream
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap(
      (input:string) => this.weatherService.searchWeather(input)
    )
    .subscribe(
      data => this.data = data
    );  
  }
}
