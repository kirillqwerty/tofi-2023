import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { TOKEN_KEY } from "../constants/constants";
import { Router } from "@angular/router";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // const authService = inject(AuthService);
  const token = localStorage.getItem(TOKEN_KEY);
  const router = inject(Router);

  if (req.withCredentials && token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse && err.status === 403) {
        localStorage.removeItem(TOKEN_KEY);
        router.navigateByUrl("auth");
      }
      return throwError(() => err);
    })
  );
};
