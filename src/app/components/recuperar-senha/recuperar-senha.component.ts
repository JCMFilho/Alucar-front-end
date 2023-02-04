import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { Alert } from '../util/alert';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css'],
})
export class RecuperarSenhaComponent implements OnInit {
  hide = true;
  filtro = {
    email: '',
    token: '',
  };
  hideSenha = true;
  hideConfirmarSenha = true;
  senha = '';
  confirmarSenha = '';
  token = '';
  editPassword = false;
  @BlockUI()
  blockUI!: NgBlockUI;
  constructor(private service: UserService) {}

  ngOnInit(): void {}

  gerarToken(): void {
    this.service.recoverPassword(this.filtro.email).subscribe({
      next: (e) => {
        console.log(e);
        this.token = e;
        this.hide = false;
      },
      error: (err: HttpErrorResponse) => {
        Alert.error('', err.error);
      },
    });
  }

  resetarSenha(): void {
    if (this.senha !== this.confirmarSenha) {
      Alert.warning('As senhas não são idênticas');
      return;
    }
    this.service.changePassword(this.filtro.email, this.senha).subscribe({
      next: (e) => {
        Swal.fire('Senha alterada com sucesso!', '', 'success').then((e) => {
          window.location.href = '/home';
        });
      },
      error: (err: HttpErrorResponse) => {
        Alert.error('', err.error);
      },
    });
  }

  validarToken(): void {
    this.blockUI.start();
    if (this.filtro.token != this.token) {
      Alert.warning('Token informado é inválido!');
      this.blockUI.stop();
      return;
    }
    this.editPassword = true;

    this.blockUI.stop();
  }
}
