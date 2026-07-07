import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';

/**
 * Functional HTTP Interceptor.
 * Automatically injects the JWT token as Bearer authorization header
 * for all requests to the backend server.
 */
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken(); // Holt das Token aus dem localStorage

  // Interceptor fängt jeden HTTP-Request an den Server ab.
  // Wenn ein Token existiert und der Request an unsere API geht,
  // hängen wir das Token im Authorization-Header (Bearer <token>) an.
  if (token && req.url.includes('/api/')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Request an das nächste Glied in der Kette weitergeben
  return next(req);
};
