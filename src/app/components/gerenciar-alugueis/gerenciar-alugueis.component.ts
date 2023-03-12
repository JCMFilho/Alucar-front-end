import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicle } from 'src/app/model/vehicle.model';
import { AluguelService } from 'src/app/service/aluguel.service';
import Swal from 'sweetalert2';
import { Alert } from '../util/alert';

@Component({
  selector: 'app-gerenciar-alugueis',
  templateUrl: './gerenciar-alugueis.component.html',
  styleUrls: ['./gerenciar-alugueis.component.css'],
})
export class GerenciarAlugueisComponent implements OnInit {
  displayedColumns: string[] = [
    'veiculo',
    'cliente',
    'status',
    'dataInicio',
    'dataFim',
    'option',
  ];
  filtro: any = {};
  listaAlugueis = new MatTableDataSource<Vehicle>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private service: AluguelService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.buscarAlugueis();
  }

  public buscarAlugueis(): void {
    let filtro: any = {
      nome: this.filtro.nome ? this.filtro.nome : '',
    };
    if (this.filtro.dataInicial) {
      filtro.dataInicial = this.datePipe.transform(
        this.filtro.dataInicial,
        'yyyy-MM-dd'
      );
    }
    if (this.filtro.dataFinal) {
      filtro.dataFinal = this.datePipe.transform(
        this.filtro.dataFinal,
        'yyyy-MM-dd'
      );
    }
    this.service.buscarAlugueisPorFiltro(filtro).subscribe((data) => {
      this.listaAlugueis = new MatTableDataSource<any>(data);
      this.listaAlugueis.paginator = this.paginator;
    });
  }

  public cancelarAluguel(aluguel: any) {
    Swal.fire({
      title: 'Cancelar aluguel',
      text: 'Você tem certeza que deseja cancelar este aluguel?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.service.cancelarAluguel(aluguel.id).subscribe(() => {
          Alert.success('Aluguel cancelado com sucesso.');
          this.buscarAlugueis();
        });
      }
    });
  }

  public concluirAluguel(aluguel: any) {
    Swal.fire({
      title: 'Concluir aluguel',
      text: 'Você tem certeza que deseja concluir este aluguel?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.service.concluirAluguel(aluguel.id).subscribe(() => {
          Alert.success('Aluguel concluído com sucesso.');
          this.buscarAlugueis();
        });
      }
    });
  }
}
