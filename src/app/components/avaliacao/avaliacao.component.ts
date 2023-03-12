import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Avaliacao } from 'src/app/model/avaliacao.model';
import { StarRatingColor } from '../star-rating/star-rating.component';
import { Alert } from '../util/alert';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css'],
})
export class AvaliacaoComponent implements OnInit {
  rating: number = 5;
  starCount: number = 5;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;
  avaliacao: Avaliacao = new Avaliacao();
  constructor(public dialogRef: MatDialogRef<AvaliacaoComponent>) {}

  ngOnInit() {
    this.avaliacao.nota = 5;
  }

  onRatingChanged(rating: number) {
    this.avaliacao.nota = rating;
  }

  avaliar() {
    if (!this.avaliacao.descricaoAvaliacao || !this.avaliacao.titulo) {
      Alert.warning('Preencha todos os campos!');
      return;
    }
    this.dialogRef.close(this.avaliacao);
  }
}
