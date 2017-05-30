import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
        <header>
            <h1>Angular 2 Weather</h1>
        </header>
        <weather-list></weather-list>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
