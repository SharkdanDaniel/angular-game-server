import { ServersService } from './../../../core/services/servers.service';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { DiseaseService } from './../../../core/services/disease.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disease-update',
  templateUrl: './disease-update.component.html',
  styleUrls: ['./disease-update.component.scss'],
})
export class DiseaseUpdateComponent implements OnInit {
  form: FormGroup;
  false: boolean = false;
  true: boolean = true;
  ServerId: string;

  constructor(
    private diseaseService: DiseaseService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private serversService: ServersService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null],
      damageEachTenMinutes: [null],
      durationInMinutes: [null],
      contagious: [null],
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.diseaseService
      .getDiseases()
      .pipe(take(1))
      .subscribe((data) => {
        data.availableDisease.forEach((el) => {
          if (el.id == id) {
            this.form = this.formBuilder.group(el);
            this.ServerId = this.serversService.getServerID();
            console.log(this.form.value);
          }
        });
      });
  }

  update() {
    Object.assign(this.form.value, {ServerId: this.ServerId})
    console.log(this.form.value);
      this.diseaseService
        .updateDisease(this.form.value)
        .pipe(take(1))
        .subscribe((res) => {
          console.log('Disease atualizado', res);
          this.router.navigate(['disease']);
        });
  }
}
