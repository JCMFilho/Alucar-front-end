import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {

  mostrarProgressBar = false;
  constructor() { }

  mostrar(): void {
    this.mostrarProgressBar = true;
  }

  esconder(): void {
    this.mostrarProgressBar = false;
  }

}
