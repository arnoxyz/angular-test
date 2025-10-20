/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';


import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';


bootstrapApplication(
  App,
  {
    providers:
      [
        provideProtractorTestingSupport(),
        provideRouter(routeConfig),
        provideAnimationsAsync(),
        providePrimeNG({
          theme: {
            preset: Aura
          }
        })
      ],
  }).catch((err) => console.error(err));
