import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { EstatisticaService } from 'src/app/service/estatistica.service';
import { StatusPipe } from 'src/app/status.pipe';

@Component({
  selector: 'app-estatistica',
  templateUrl: './estatistica.component.html',
  styleUrls: ['./estatistica.component.css'],
})
export class EstatisticaComponent implements OnInit {
  estatisticaVeiculo = {
    fabricante: '',
    nome: '',
    quantidade: 0,
  };
  totalAlugueis = 0;
  typeChart = ChartType.BarChart;
  public data = [
    ['Brasil', 21498],
    ['Estados Unidos', 214939],
    ['China', 143429],
    ['Japão', 50836],
    ['Alemanha', 40474],
  ];
  public options = {
    title: 'Aluguéis por estado',
    legend: { position: 'none' },
    chartArea: { width: '50%' },
    backgroundColor: 'transparent',
    hAxis: {
      title: 'Quantidade de aluguéis',
      minValue: 0,
    },
    vAxis: {
      title: 'Estados do aluguel',
    },
  };

  constructor(private service: EstatisticaService, private pipe: StatusPipe) {}

  ngOnInit(): void {
    this.service.buscarEstatisticas().subscribe((data) => {
      this.estatisticaVeiculo = data.estatisticaVeiculo;
      this.totalAlugueis = data.totalAlugueis;
      data.chart.forEach((chart: any) => {
        chart.status = this.pipe.transform(chart.status);
      });
      var convertida = data.chart.map(function (obj: any) {
        return Object.keys(obj).map(function (chave) {
          return obj[chave];
        });
      });
      this.data = convertida;
    });
  }
}
