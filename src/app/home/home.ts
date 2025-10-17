import { Component, inject } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  template: `
     <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      @for (houseData of filteredLocationArr; track $index) { 
        <app-housing-location [housingLocation]="houseData"></app-housing-location>
      }
    </section>
  `,
  styleUrls: ['./home.css'],
})
export class Home {
  housingLocationArr: HousingLocationInfo[] = []; //use interface
  housingService: HousingService = inject(HousingService); //use service
  filteredLocationArr: HousingLocationInfo[] = [];

  constructor() {
    this.housingLocationArr = this.housingService.getAllHousingLocations();
    this.filteredLocationArr = this.housingLocationArr;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationArr = this.housingLocationArr;
      return;
    }
    this.filteredLocationArr = this.housingLocationArr.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
}