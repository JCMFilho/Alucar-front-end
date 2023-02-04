import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/model/user-entity.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { Alert } from '../util/alert';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
})
export class RegistrarUsuarioComponent implements OnInit {
  hide = true;
  usuario: UserEntity = new UserEntity();
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registrar() {
    if (
      !this.usuario.cpf ||
      !this.usuario.email ||
      !this.usuario.name ||
      !this.usuario.password ||
      !this.usuario.phone
    ) {
      Alert.warning('Preencha todos os campos');
      return;
    }
    this.userService.searchUserByEmail(this.usuario.email).subscribe((usu) => {
      if (usu.id) {
        Alert.warning('Email já cadastrado');
        return;
      } else {
        this.userService.saveUser(this.usuario).subscribe((user) => {
          Alert.success('Cadastro realizado com sucesso!');
          this.authService
            .login(this.usuario.email, this.usuario.password)
            .subscribe((response) => {
              localStorage.setItem('role', user.roles[0].name);
              localStorage.setItem('userEmail', this.usuario.email);
              localStorage.setItem('userName', user.name);
              this.router.navigateByUrl('/home');
            });
        });
      }
    });
  }
}
