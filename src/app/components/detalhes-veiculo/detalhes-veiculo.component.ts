import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { Aluguel } from 'src/app/model/aluguel.model';
import { Avaliacao } from 'src/app/model/avaliacao.model';
import { Vehicle } from 'src/app/model/vehicle.model';
import { AuthService } from 'src/app/service/auth.service';
import { AvaliacaoService } from 'src/app/service/avaliacao.service';
import { VehicleService } from 'src/app/service/vehicle.service';
import { AvaliacaoComponent } from '../avaliacao/avaliacao.component';
import { StarRatingColor } from '../star-rating/star-rating.component';
import { Alert } from '../util/alert';

@Component({
  selector: 'app-detalhes-veiculo',
  templateUrl: './detalhes-veiculo.component.html',
  styleUrls: ['./detalhes-veiculo.component.css'],
})
export class DetalhesVeiculoComponent implements OnInit {
  vehicle: Vehicle = new Vehicle();
  aluguel: Aluguel = new Aluguel();
  avaliacoes: Avaliacao[] = [];

  starColorP: StarRatingColor = StarRatingColor.primary;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetalhesVeiculoComponent>,
    private vehicleService: VehicleService,
    public authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private avaliacaoService: AvaliacaoService
  ) {}

  ngOnInit(): void {
    this.aluguel.dataInicio = new Date();
    this.aluguel.dataFim = new Date();
    this.vehicleService.getVehicleById(this.data.id).subscribe((data) => {
      this.vehicle = data;
      this.avaliacoes = data.ratings;
      this.calculaValorTotal();
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

  public agendar(): void {
    if (!this.authService.logado()) {
      this.router.navigate(['login']);
      this.dialogRef.close();
      return;
    }
    if (this.authService.logado() && this.authService.isAdmin()) {
      Alert.error('Usuário administrador não pode agendar um aluguel.');
      return;
    }
    let navigationExtra: NavigationExtras = {
      queryParams: {
        vehicle: JSON.stringify(this.vehicle),
        aluguel: JSON.stringify(this.aluguel),
      },
    };
    this.router.navigate(['aluguel'], navigationExtra);
    this.dialogRef.close();
  }

  public avaliar() {
    let dialogRef = this.dialog.open(AvaliacaoComponent, {
      width: '40%',
      height: '46%',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((avaliacao: Avaliacao) => {
      if (avaliacao) {
        avaliacao.usuarioId = this.authService.recuperarUserId();
        avaliacao.veiculoId = this.vehicle.id;
        this.avaliacaoService.avaliar(avaliacao).subscribe({
          next: (e) => {
            this.buscarAvaliacoes();
            Alert.success('Avaliação cadastrada com sucesso!');
          },
          error: (err: HttpErrorResponse) => {
            if (err.status == 403) {
              Alert.error(
                'Você não pode avaliar este veículo.',
                'Apenas clientes que já alugaram este veículo podem registrar uma avaliação.'
              );
              return;
            }
            Alert.error(err.error);
          },
        });
      }
    });
  }

  buscarAvaliacoes() {
    this.avaliacaoService
      .buscarAvaliacoesPorVeiculo(this.vehicle.id)
      .subscribe((data) => {
        this.avaliacoes = data;
      });
  }
}
