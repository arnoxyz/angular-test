import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { Home } from "./home/home";

import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-root",
  imports: [Home, RouterModule, ButtonModule],
  template: `
    <main>
      <header class="brand-name">
        <a [routerLink]="['/']">
          <img
            class="brand-logo"
            src="./assets/logo.svg"
            alt="logo"
            aria-hidden="true"
          />
        </a>
        <p-button label="Toggle" (onClick)="toggleDarkMode()"></p-button>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ["./app.css"],
})
export class App {
  title = "homes";

  toggleDarkMode() {
    const element = document.querySelector("html");
    element?.classList.toggle("my-app-dark");
  }
}
