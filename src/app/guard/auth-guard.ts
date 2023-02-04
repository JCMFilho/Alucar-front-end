import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot) {
    const permissaoEsperada = next.data['permissaoEsperada'];
    if (!this.authService.logado()) {
      this.router.navigateByUrl('/home');
      return false;
    } else {
      const permissao = localStorage.getItem('role');
      if (permissao == permissaoEsperada) {
        return true;
      }
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}
