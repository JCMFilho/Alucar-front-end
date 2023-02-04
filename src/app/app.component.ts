import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'alucar-front';
  value = 'teste';
  userName: string | null = '';
  previousUrl = '';
  currentUrl = '';
  constructor(
    private router: Router,
    private authService: AuthService,
    private socialAuthService: SocialAuthService
  ) {}
  ngOnInit(): void {
    this.updateUser();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.previousUrl = this.currentUrl;
          this.currentUrl = event.url;
        }
        this.updateUser();
      });
  }

  updateUser() {
    this.userName = localStorage.getItem('userName');
  }

  logout() {
    this.socialAuthService.signOut();
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.updateUser();
  }

  showProfile() {
    if (this.authService.isAdmin()) {
      this.router.navigateByUrl('/admin');
    } else {
      this.router.navigateByUrl('/cliente');
    }
  }
}
