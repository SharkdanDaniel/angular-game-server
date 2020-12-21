import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JobsService } from './../../../core/services/jobs.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.scss']
})
export class JobCreateComponent implements OnInit {
  form: FormGroup;
  false = false;
  true = true;

  constructor(
    private jobsService: JobsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [''],
      color: [''],
      canHeal: [false],
      canArrest: [false],
      canDoMarriage: [false],
      isDefault: [false],
      requirementXp: [0],
      publicJob: [false],
    });
  }

  create() {
    this.jobsService
      .createJob(this.form.value)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
        console.log('Job criado');
        this.router.navigate(['/jobs']);
      }
    );
  }

}
