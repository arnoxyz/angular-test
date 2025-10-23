import { Component, inject } from "@angular/core";
import { HousingLocationInfo } from "../housinglocation";
import { HousingService } from "../housing.service";
import { FormsModule } from "@angular/forms";

import { TableModule } from "primeng/table";
import { SelectButton } from "primeng/selectbutton";

import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-home",
  imports: [TableModule, SelectButton, FormsModule, RouterLink, RouterOutlet],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>

    <p-table
      [value]="filteredLocationArr"
      [paginator]="true"
      [rows]="4"
      showGridlines
      stripedRows
      [tableStyle]="{ 'min-width': '50rem' }"
      [size]="selectedSize"
    >
      <ng-template #header>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>City</th>
          <th>State</th>
          <th>Units</th>
          <th>WiFi</th>
          <th>Laundry</th>
          <th>Details</th>
        </tr>
      </ng-template>

      <ng-template #body let-location>
        <tr>
          <td>
            <img
              [src]="location.photo"
              [alt]="location.name"
              width="100"
              height="100"
              style="border-radius: 6px;"
            />
          </td>
          <td>{{ location.name }}</td>
          <td>{{ location.city }}</td>
          <td>{{ location.state }}</td>
          <td>{{ location.availableUnits }}</td>
          <td>{{ location.wifi ? "Yes" : "No" }}</td>
          <td>{{ location.laundry ? "Yes" : "No" }}</td>
          <td>
            <a [routerLink]="['/details', location.id]">Learn More</a>
          </td>
        </tr>
      </ng-template>

      <ng-template #footer>
        <tr>
          <td colspan="6">
            In total there are {{ filteredLocationArr.length }}
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styleUrls: ["./home.css"],
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
    this.filteredLocationArr = this.housingLocationArr.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
