import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { DiseaseService } from './../../../core/services/disease.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disease-delete',
  templateUrl: './disease-delete.component.html',
  styleUrls: ['./disease-delete.component.scss']
})
export class DiseaseDeleteComponent implements OnInit {
  form: FormGroup;
  false: boolean = false;
  true: boolean = true;

  constructor(
    private diseaseService: DiseaseService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [{value: '', disabled: true}],
      damageEachTenMinutes: [{value: 0, disabled: true}],
      durationInMinutes: [{value: 0, disabled: true}],
      contagious: [{value: false, disabled: true}],
      hasVacine: [{value: false, disabled: true}],
      vacinePrice: [{value: 0, disabled: true}],
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.diseaseService.getDiseases()
    .pipe(take(1))
    .subscribe((data) => {
      data.availableDisease.forEach(el => {
        if (el.id == id) {
          this.form = this.formBuilder.group(el)
          console.log(this.form.value)
        }
      });
    })
  }

  delete() {
    this.diseaseService
      .deleteDisease(this.form.value.id)
      .pipe(take(1))
      .subscribe((res) => {
        console.log('Disease excluido', res);
        this.router.navigate(['disease']);
      });
  }

}
