import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicle } from 'src/app/model/vehicle.model';
import { VehicleService } from 'src/app/service/vehicle.service';
import Swal from 'sweetalert2';
import { AdicionarEditarVeiculoComponent } from '../adicionar-editar-veiculo/adicionar-editar-veiculo.component';
import { Alert } from '../util/alert';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css'],
})
export class VeiculosComponent implements OnInit {
  filtro = {
    nome: '',
    cidade: '',
    fabricante: '',
  };

  displayedColumns: string[] = [
    'nome',
    'fabricante',
    'cidade',
    'data',
    'option',
  ];
  listaVeiculos = new MatTableDataSource<Vehicle>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private vehicleService: VehicleService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.searchVehicles();
  }

  searchVehicles() {
    this.vehicleService.getVehicleList(this.filtro).subscribe((data) => {
      this.listaVeiculos = new MatTableDataSource<Vehicle>(data);
      this.listaVeiculos.paginator = this.paginator;
    });
  }

  openModal(id: any) {
    let dialogRef = this.dialog.open(AdicionarEditarVeiculoComponent, {
      width: '80%',
      height: '80%',
      disableClose: false,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.searchVehicles();
      }
    });
  }

  excluirVeiculo(id: any) {
    Swal.fire({
      title: 'Excluir veículo',
      text: 'Você tem certeza que deseja excluir o veículo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.vehicleService.deleteVehicle(id).subscribe((e) => {
          Alert.success('Veículo excluído com sucesso!');
          this.searchVehicles();
        });
      }
    });
  }
}
