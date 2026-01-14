import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import 'zone.js';
import { register } from 'swiper/element/bundle';

register();
bootstrapApplication(App, {
    providers: [provideRouter(routes),
        provideHttpClient(withFetch())
      
    ]
  });
