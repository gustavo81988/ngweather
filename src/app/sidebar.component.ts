import { Component, OnInit } from '@angular/core';
import {WeatherService} from './weather/weather.service';
import {WeatherItem} from './weather/weather-item';
import {ProfileService} from './profile.service';
import {Profile} from './profile';

@Component({
  selector: 'sidebar',
  template: `
    <h3>Saved Profile</h3>
    <button (click)="onSaveNew()">Save List to Profile</button>
    <article class="profile" *ngFor="let profile of profiles" (click)="onLoadProfile(profile)">
      <h4>{{ profile.profileName }}</h4>
      <p>Cities: {{profile.cities.join() }}</p>
      <span class="delete" (click)="onDeleteProfile($event, profile)">X</span>
    </article>
  `,
  styleUrls: ['./sidebar.component.css'],
  providers: [ProfileService,WeatherService]
})
export class SidebarComponent implements OnInit{
  
  profiles: Profile[];

  constructor(private profileService: ProfileService, private weatherService:WeatherService) {}
  
  ngOnInit(){
    this.profiles = this.profileService.getProfiles();
  }
  public onSaveNew(){
    const cities = this.weatherService.getWeatherItems().map(
      (element: WeatherItem) => element.cityName
    );
  
    this.profileService.saveNewProfile(cities);
  }
  
  public onLoadProfile(profile: Profile) {
    this.weatherService.clearWeatherItems();
    for (let i = 0; i < profile.cities.length; i++) {
      this.weatherService.searchWeather(profile.cities[i])
      .retry()
      .subscribe(
        data => {
          const weatherItem = new WeatherItem(data.name, data.weather[0].description, data.main.temp);
          this.weatherService.addWeatherItem(weatherItem);
        }
      );
    }
  }

  public onDeleteProfile(event: Event, profile: Profile) {
    event.stopPropagation();
    this.profileService.deleteProfile(profile);
  }
}
