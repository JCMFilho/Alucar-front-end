import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css'],
})
export class PesquisaComponent implements OnInit {
  titulo = 'Resultados da pesquisa: ';
  filtroPesquisa = '';
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.filtroPesquisa = JSON.parse(params['pesquisa']);
        this.titulo = `Resultados da pesquisa: ${this.filtroPesquisa}`;
      }
    });
  }

  ngOnInit(): void {}
}
