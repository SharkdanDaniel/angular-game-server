import { take } from 'rxjs/operators';
import { ExpMachinesService } from './../../core/services/exp-machines.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exp-machines',
  templateUrl: './exp-machines.component.html',
  styleUrls: ['./exp-machines.component.scss'],
})
export class ExpMachinesComponent implements OnInit {
  expMachines: any[];

  constructor(private expMachineService: ExpMachinesService) {}

  ngOnInit(): void {
    this.expMachineService
      .getExpMachines()
      .pipe(take(1))
      .subscribe((data) => {
        this.expMachines = data;
        console.log(this.expMachines);
      });
  }
}
