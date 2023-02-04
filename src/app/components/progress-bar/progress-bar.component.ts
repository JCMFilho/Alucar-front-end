import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  constructor(public loadingService: LoadingService) {}

  ngOnInit() {}
}
