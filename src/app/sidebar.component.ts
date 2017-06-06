import { Component } from '@angular/core';

@Component({
  selector: 'sidebar',
  template: `
    <h3>Saved Profile</h3>
    <button (click)="onSaveNew()">Save List to Profile</button>
    <article class="profile">
      <h4>Profile Name</h4>
      <p>Cities: New York</p>
      <span class="delete" (click)="onDeleteProfile($event)">X</span>
    </article>
  `,
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{

  constructor() {}
  
  public onSaveNew(){}
  public onDeleteProfile(){}

}
