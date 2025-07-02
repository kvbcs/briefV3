import { HttpInterceptorFn } from '@angular/common/http';
import { HttpResponse, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('token');

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && event.body?.token) {
        localStorage.setItem('token', event.body.token); // 🔁 Mise à jour du token reçu
      }
    })
  );
};
