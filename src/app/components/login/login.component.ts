import {
  MicrosoftLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserEntity } from 'src/app/model/user-entity.model';
import { Usuario } from 'src/app/model/usuario.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { Alert } from '../util/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  usuario: Usuario = new Usuario();
  auth2: any;
  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;
  constructor(
    private authService: AuthService,
    private location: Location,
    private userService: UserService,
    private socialAuthService: SocialAuthService
  ) {}
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      if (user.provider === 'GOOGLE') {
        this.register(user);
      }
    });
  }

  register(user: SocialUser) {
    this.userService.searchUserByEmail(user.email).subscribe((emailUser) => {
      this.usuario.login = user.email;
      this.usuario.senha = user.id;
      if (!emailUser.id) {
        const userEntity: UserEntity = {
          id: null,
          name: user.name,
          email: user.email,
          cpf: null,
          phone: null,
          creationDate: null,
          password: user.id,
          roles: [],
        };
        this.userService.saveUser(userEntity).subscribe((response) => {
          this.login();
        });
      } else {
        this.login();
      }
    });
  }

  login() {
    this.authService.login(this.usuario.login, this.usuario.senha).subscribe({
      next: (e) => {
        this.authService.armazenarToken(e);
        this.userService
          .searchUserByEmail(this.usuario.login)
          .subscribe((response) => {
            localStorage.setItem('id', response.id);
            localStorage.setItem('role', response.roles[0].name);
            localStorage.setItem('userEmail', this.usuario.login);
            localStorage.setItem('userName', response.name);
            this.location.back();
          });
      },
      error: (err: HttpErrorResponse) => {
        Alert.error('', 'Usuário ou senha incorreto');
      },
    });
  }

  signInWithMicrosoft(): void {
    this.socialAuthService
      .signIn(MicrosoftLoginProvider.PROVIDER_ID)
      .then((e) => {
        this.register(e);
      });
  }
}
