import { InjectionToken } from '@angular/core';
import { AuthService } from './services/auth.service';

export const AUTH_SERVICE = new InjectionToken<AuthService>('AuthService');