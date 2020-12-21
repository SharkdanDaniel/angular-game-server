import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from './../../../core/services/jobs.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-update',
  templateUrl: './job-update.component.html',
  styleUrls: ['./job-update.component.scss'],
})
export class JobUpdateComponent implements OnInit {
  id: string;
  form: FormGroup;

  constructor(
    private jobsService: JobsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [{ value: '' }],
      color: [{ value: '' }],
      canHeal: [{ value: false }],
      canArrest: [{ value: false }],
      canDoMarriage: [{ value: false }],
      isDefault: [{ value: false }],
      requirementXp: [{ value: 0 }],
      publicJob: [{ value: false }],
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.jobsService
      .getJobs()
      .pipe(take(1))
      .subscribe((job) => {
        job.forEach((j) => {
          if (j.id == this.id) {
            this.form = this.formBuilder.group(j);
            console.log(this.form.value);
          }
        });
      });
  }

  update() {
    this.jobsService
      .updateJob(this.form.value)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
        console.log('Job atualizado');
        this.router.navigate(['/jobs']);
      });
  }
}
