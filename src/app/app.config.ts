import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    // provideHttpClient(withFetch()),
    provideHttpClient(),

    providePrimeNG({
      theme: {
          preset: Aura,
          options: {
            darkModeSelector: false || 'none'
        }
      }
  }),
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes,  withComponentInputBinding()), 
     provideClientHydration(withEventReplay())
    ]
};
