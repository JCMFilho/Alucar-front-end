import { throwError as observableThrowError, Observable } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { LoadingService } from 'src/app/service/loading.service';
import { AuthService } from 'src/app/service/auth.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Alert } from './alert';

@Injectable()
export class HttpInterceptorImpl implements HttpInterceptor {
  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private authService: AuthService
  ) {}

  @BlockUI()
  blockUI!: NgBlockUI;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.mostrar();

    let authorization: any;

    authorization =
      this.authService.token() == null
        ? ''
        : 'Bearer ' + this.authService.token();

    authorization =
      req.headers.get('Authorization') != null
        ? req.headers.get('Authorization')?.toString()
        : authorization;

    let contentType: string;

    let content = req.headers.getAll('Content-Type');
    if (content != null) {
      contentType = content[0];
    } else {
      contentType = 'application/json';
    }

    const newRequest = req.clone({
      setHeaders: {
        'Content-Type': contentType,
        Authorization: authorization,
      },
    });
    this.blockUI.start();
    return next.handle(newRequest).pipe(
      tap((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          this.loadingService.esconder();
          this.blockUI.stop();
        }
      }),
      catchError((response) => {
        if (response instanceof HttpErrorResponse) {
          if (response.status === 401 || response.status === 0) {
            this.authService.logout();
            this.router.navigate(['login']);
          }
          if (response.status === 500) {
            Alert.error(response.error, response.message);
          }
          this.loadingService.esconder();
          this.blockUI.stop();
        }

        return observableThrowError(response);
      })
    );
  }

  tratarNaoAutorizado(err: any): void {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        this.router.navigate(['login']);
        this.loadingService.esconder();
      }
    }
  }
}
