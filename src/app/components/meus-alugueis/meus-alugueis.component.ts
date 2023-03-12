import { Component, OnInit } from '@angular/core';
import { Aluguel } from 'src/app/model/aluguel.model';
import { AluguelService } from 'src/app/service/aluguel.service';
import { AuthService } from 'src/app/service/auth.service';
import { Alert } from '../util/alert';

@Component({
  selector: 'app-meus-alugueis',
  templateUrl: './meus-alugueis.component.html',
  styleUrls: ['./meus-alugueis.component.css'],
})
export class MeusAlugueisComponent implements OnInit {
  alugueis: Aluguel[] = new Array<Aluguel>();
  constructor(
    private service: AluguelService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buscarAlugueis();
  }

  private buscarAlugueis() {
    this.service
      .buscarAlugueisDoUsuario(this.authService.recuperarUserId())
      .subscribe((response) => {
        this.alugueis = response;
      });
  }

  public cancelarAluguel(aluguel: Aluguel) {
    this.service.cancelarAluguel(aluguel.id).subscribe(() => {
      Alert.success('Aluguel cancelado com sucesso.');
      this.buscarAlugueis();
    });
  }
}
