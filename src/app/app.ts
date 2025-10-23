import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { Home } from "./home/home";

import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-root",
  imports: [Home, RouterModule, ButtonModule],
  template: `
    <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img
            class="brand-logo"
            src="./assets/logo.svg"
            alt="logo"
            aria-hidden="true"
          />
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ["./app.css"],
})
export class App {
  title = "homes";
}
