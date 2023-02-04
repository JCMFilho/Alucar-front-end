import { Component, OnInit } from '@angular/core';
import { Endereco } from 'src/app/model/endereco.model';
import { UserEntity } from 'src/app/model/user-entity.model';
import { EnderecoService } from 'src/app/service/endereco.service';
import { UserService } from 'src/app/service/user.service';
import { Alert } from '../util/alert';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  constructor(
    private userService: UserService,
    private enderecoService: EnderecoService
  ) {}
  usu: UserEntity = new UserEntity();
  endereco: Endereco = new Endereco();
  telefone = '(31) 98260-5890';
  email = 'macedofilho0@hotmail.com';
  ngOnInit(): void {
    this.userService
      .searchUserByEmail(localStorage.getItem('userEmail'))
      .subscribe((userInfo) => {
        this.usu.id = userInfo.id;
        this.usu.cpf = userInfo.cpf;
        this.usu.email = userInfo.username;
        this.usu.phone = userInfo.phone;
        this.usu.name = userInfo.name;
        this.enderecoService
          .getEnderecoByUserId(this.usu.id)
          .subscribe((end) => {
            if (end) {
              this.endereco = end;
            }
          });
      });
  }

  atualizarInfo() {
    this.userService.updateUser(this.usu).subscribe(() => {
      Alert.success('Informações atualizadas com sucesso');
    });
  }

  atualizarEndereco() {
    if (!this.endereco.usuarioId) {
      this.endereco.usuarioId = this.usu.id;
    }
    this.enderecoService.saveEndereco(this.endereco).subscribe((end) => {
      Alert.success('Informações atualizadas com sucesso');
    });
  }
}
