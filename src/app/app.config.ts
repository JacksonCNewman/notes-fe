import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {httpInterceptorProviders} from "./interceptor/auth.interceptor";
import {AuthService} from "./service/auth.service";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    httpInterceptorProviders,
    AuthService,
    provideHttpClient(withInterceptorsFromDi()),
    provideClientHydration()
    ]
};
