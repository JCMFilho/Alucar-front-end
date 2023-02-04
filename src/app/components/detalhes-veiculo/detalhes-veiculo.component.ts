import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aluguel } from 'src/app/model/aluguel.model';
import { Vehicle } from 'src/app/model/vehicle.model';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'app-detalhes-veiculo',
  templateUrl: './detalhes-veiculo.component.html',
  styleUrls: ['./detalhes-veiculo.component.css'],
})
export class DetalhesVeiculoComponent implements OnInit {
  vehicle: Vehicle = new Vehicle();
  aluguel: Aluguel = new Aluguel();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetalhesVeiculoComponent>,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.aluguel.dataInicio = new Date();
    this.aluguel.dataFim = new Date();
    this.vehicleService.getVehicleById(this.data.id).subscribe((data) => {
      this.vehicle = data;
      this.calculaValorTotal();
    });
  }

  calculaValorTotal(): void {
    let days = this.calculateDateDifference(
      this.aluguel.dataInicio,
      this.aluguel.dataFim
    );
    console.log(days);
    this.aluguel.valorTotal = this.vehicle.diaria * (days + 1);
  }
  calculateDateDifference(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  public agendar(): void {}
}
