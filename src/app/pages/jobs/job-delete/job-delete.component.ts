import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from './../../../core/services/jobs.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-delete',
  templateUrl: './job-delete.component.html',
  styleUrls: ['./job-delete.component.scss']
})
export class JobDeleteComponent implements OnInit {
  id: string;
  form: FormGroup

  constructor(
    private jobsService: JobsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [{value: '', disabled: true}],
      color: [{value: '', disabled: true}],
      canHeal: [{value: false, disabled: true}],
      canArrest: [{value: false, disabled: true}],
      canDoMarriage: [{value: false, disabled: true}],
      isDefault: [{value: false, disabled: true}],
      requirementXp: [{value: 0, disabled: true}],
      publicJob: [{value: false, disabled: true}],
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.jobsService.getJobs()
      .pipe(take(1))
      .subscribe((job) => {
        job.forEach(j => {
          if (j.id == this.id) {
            this.form = this.formBuilder.group(j)
            console.log(this.form.value)
          }
        })
      })

  }

  delete() {
    this.jobsService
      .deleteJob(this.id)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
        console.log('Job deletado');
        this.router.navigate(['/jobs']);
      }
    );
  }

}
