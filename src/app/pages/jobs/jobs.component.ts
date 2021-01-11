import { take } from 'rxjs/operators';
import { JobsService } from './../../core/services/jobs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs: any[];
  count: number;

  constructor(private jobsService: JobsService) { }

  ngOnInit(): void {
    this.jobsService
      .getJobs()
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
        this.jobs = res;
        this.count = res.length;
      }
    );
  }

}
