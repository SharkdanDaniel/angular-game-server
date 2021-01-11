import { take } from 'rxjs/operators';
import { DiseaseService } from './../../core/services/disease.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.scss'],
})
export class DiseaseComponent implements OnInit {
  diseases: any[];
  count: number;

  constructor(private diseaseService: DiseaseService) {}

  ngOnInit(): void {
    this.diseaseService
      .getDiseases()
      .pipe(take(1))
      .subscribe((data) => {
        this.diseases = data.availableDisease;
        this.count = this.diseases.length;
        console.log(this.diseases);
      });
  }
}
