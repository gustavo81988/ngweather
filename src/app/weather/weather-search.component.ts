import { Component } from '@angular/core';

@Component({
  selector: 'weather-search',
  template: `
   <section class="weather-search">
      <form (ngSubmit)="onSubmit(f)"  #f="ngForm">
        <label for="city">City</label>
        <input type="text" id="city" required>
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
  `]
})
export class WeatherSearchComponent{
  onSubmit(form){
    console.log(form);
  }
}
