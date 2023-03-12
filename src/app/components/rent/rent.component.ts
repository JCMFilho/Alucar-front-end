import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluguel } from 'src/app/model/aluguel.model';
import { Vehicle } from 'src/app/model/vehicle.model';
import { AluguelService } from 'src/app/service/aluguel.service';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { Alert } from '../util/alert';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
  vehicle: Vehicle = new Vehicle();
  aluguel: Aluguel = new Aluguel();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AluguelService,
    private authService: AuthService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.vehicle = JSON.parse(params['vehicle']);
        this.aluguel = JSON.parse(params['aluguel']);
        this.aluguel.meioPagamento = '1';
      }
    });
  }
  ngOnInit(): void {}

  public agendar() {
    this.aluguel.idUsuario = this.authService.recuperarUserId();
    this.aluguel.idVeiculo = this.vehicle.id;
    this.service.salvarAluguel(this.aluguel).subscribe({
      next: (e) => {
        Swal.fire(
          `O carro ${this.vehicle.nome} foi alugado com sucesso!`,
          `Favor comparecer a loja física no dia selecionado para retirar o carro.`,
          'success'
        ).then(() => {
          this.router.navigateByUrl('/meus-alugueis');
        });
      },
      error: (err: HttpErrorResponse) => {
        Alert.error(err.error);
      },
    });
  }

  calculaValorTotal(): void {
    let days = this.calculateDateDifference(
      this.aluguel.dataInicio,
      this.aluguel.dataFim
    );
    this.aluguel.valorTotal = this.vehicle.diaria * (days + 1);
  }

  calculateDateDifference(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
