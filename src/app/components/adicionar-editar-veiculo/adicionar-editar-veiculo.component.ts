import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vehicle } from 'src/app/model/vehicle.model';
import { VehicleService } from 'src/app/service/vehicle.service';
import { Alert } from '../util/alert';

@Component({
  selector: 'app-adicionar-editar-veiculo',
  templateUrl: './adicionar-editar-veiculo.component.html',
  styleUrls: ['./adicionar-editar-veiculo.component.css'],
})
export class AdicionarEditarVeiculoComponent implements OnInit {
  title = 'Adicionar Veículo';
  item = '';
  vehicle: Vehicle = new Vehicle();
  selectedFiles: any = '';
  preview = '';
  currentFile: any = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdicionarEditarVeiculoComponent>,
    private service: VehicleService
  ) {}

  ngOnInit() {
    if (this.data.id != null) {
      this.title = 'Editar Veículo';
      this.service.getVehicleById(this.data.id).subscribe((vehicle) => {
        console.log(vehicle);
        this.vehicle = vehicle;
      });
    }
  }

  adicionarItem() {
    let item = {
      descricao: this.item,
    };
    this.vehicle.itemVeiculos.push(item);
    this.item = '';
  }

  selectFile(event: any): void {
    this.preview = '';
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.vehicle.imagem = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }
  salvar() {
    this.service.saveVehicle(this.vehicle).subscribe((data) => {
      if (this.data.id !== null) {
        Alert.success('Veículo editado com sucesso!');
      } else {
        Alert.success('Veículo adicionado com sucesso!');
      }
      this.dialogRef.close(true);
    });
  }
}
