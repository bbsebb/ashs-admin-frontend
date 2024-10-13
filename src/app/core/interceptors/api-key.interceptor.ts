import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const keyValue = environment.apiKey.value;
  const keyName  = environment.apiKey.name;

  const authReq = req.clone({
    setHeaders: {
      [keyName]: keyValue
    }
  });
  return next(authReq);
};
