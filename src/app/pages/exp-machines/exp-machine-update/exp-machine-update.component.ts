import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpMachinesService } from './../../../core/services/exp-machines.service';
import { SnackbarService } from './../../../core/services/snackbar.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exp-machine-update',
  templateUrl: './exp-machine-update.component.html',
  styleUrls: ['./exp-machine-update.component.scss'],
})
export class ExpMachineUpdateComponent implements OnInit {
  form: FormGroup;
  false: boolean = false;
  true: boolean = true;

  constructor(
    private expMachineService: ExpMachinesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      description: [null],
      expEachMinute: [null],
      automaticStart: [null],
      hourStart: [null],
      hourEnds: [null],
      enabled: [null],
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.expMachineService
      .getExpMachines()
      .pipe(take(1))
      .subscribe((data) => {
        data.forEach((e) => {
          if (e.id === id) {
            this.form = this.formBuilder.group(e);
            console.log(this.form.value);
          }
        });
      });
  }

  update() {
    this.expMachineService.updateExpMachine(this.form.value)
    .pipe(take(1))
    .subscribe((res) => {
      this.snackBar.showMessage('Atualizado com sucesso!')
      console.log('ExpMachine atualizado', res);
      this.router.navigate(['exp-machines'])
    })
  }
}
