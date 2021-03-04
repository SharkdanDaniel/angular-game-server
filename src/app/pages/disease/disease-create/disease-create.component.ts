import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { DiseaseService } from './../../../core/services/disease.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disease-create',
  templateUrl: './disease-create.component.html',
  styleUrls: ['./disease-create.component.scss'],
})
export class DiseaseCreateComponent implements OnInit {
  form: FormGroup;
  false: boolean = false;
  true: boolean = true;

  constructor(
    private diseaseService: DiseaseService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [''],
      damageEachTenMinutes: [0],
      durationInMinutes: [0],
      contagious: [false],
      hasVacine: [false],
      vacinePrice: [0],
    });
  }

  create() {
    this.diseaseService
      .create(this.form.value)
      .pipe(take(1))
      .subscribe((res) => {
        console.log('Disease criado', res);
        this.router.navigate(['disease']);
      });
  }
}
