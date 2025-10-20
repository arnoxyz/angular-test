import { Component, inject } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housinglocation';
import { HousingService } from '../housing.service';



import { TableModule } from 'primeng/table'

@Component({
  selector: 'app-home',
  imports: [
    HousingLocation,
    TableModule
  ],
  template: `
    <p-table [value]="locations">
      <ng-template pTemplate="header">
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>City</th>
          <th>State</th>
          <th>Units</th>
          <th>WiFi</th>
          <th>Laundry</th>
        </tr>
      </ng-template>

      <ng-template pTemplate="body" let-location>
        <tr>
          <td>
            <img [src]="location.photo" alt="Photo" width="100" height="100" style="border-radius: 6px;" />
          </td>
          <td>{{ location.name }}</td>
          <td>{{ location.city }}</td>
          <td>{{ location.state }}</td>
          <td>{{ location.availableUnits }}</td>
          <td>{{ location.wifi ? 'Yes' : 'No' }}</td>
          <td>{{ location.laundry ? 'Yes' : 'No' }}</td>
        </tr>
      </ng-template>
    </p-table>

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


  locations = [
    {
      id: 0,
      name: 'Acme Fresh Start Housing',
      city: 'Chicago',
      state: 'IL',
      photo: 'https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg',
      availableUnits: 4,
      wifi: true,
      laundry: true
    },
    {
      id: 1,
      name: 'A113 Transitional Housing',
      city: 'Santa Monica',
      state: 'CA',
      photo: 'https://angular.dev/assets/images/tutorials/common/brandon-griggs-wR11KBaB86U-unsplash.jpg',
      availableUnits: 0,
      wifi: false,
      laundry: true
    },
    {
      id: 2,
      name: 'Warm Beds Housing Support',
      city: 'Juneau',
      state: 'AK',
      photo: 'https://angular.dev/assets/images/tutorials/common/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg',
      availableUnits: 1,
      wifi: false,
      laundry: false
    }
  ];
}