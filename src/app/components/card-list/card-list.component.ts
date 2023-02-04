import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Vehicle } from 'src/app/model/vehicle.model';
import { VehicleService } from 'src/app/service/vehicle.service';
import { DetalhesVeiculoComponent } from '../detalhes-veiculo/detalhes-veiculo.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  constructor(
    private vehicleService: VehicleService,
    public dialog: MatDialog
  ) {}

  vehicles: Vehicle[] = new Array();
  ngOnInit() {
    this.vehicleService.getVehicleHomePage().subscribe((response) => {
      this.vehicles = response;
    });
  }

  openModal(id: any) {
    let dialogRef = this.dialog.open(DetalhesVeiculoComponent, {
      width: '80%',
      height: '80%',
      disableClose: false,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        //this.searchVehicles();
      }
    });
  }
}
