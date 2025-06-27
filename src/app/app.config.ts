import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthService } from './gk/services/auth.service';
import { ListService } from './gk/services/list.service';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { AUTH_SERVICE } from './gk/tokens';

providers: [
  { provide: AUTH_SERVICE, useClass: AuthService }
]

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(),
ListService,{ provide: AUTH_SERVICE, useClass: AuthService }]
};
