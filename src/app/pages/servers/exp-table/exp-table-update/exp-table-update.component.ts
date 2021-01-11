import { FormGroup, FormBuilder } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './../../../../core/services/servers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exp-table-update',
  templateUrl: './exp-table-update.component.html',
  styleUrls: ['./exp-table-update.component.scss']
})
export class ExpTableUpdateComponent implements OnInit {
  serverId: string;
  expId: string;
  form: FormGroup
  expTables: any[];

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [null],
      exp: [null],
      level: [null]
    });
    this.serverId = this.route.snapshot.paramMap.get('id')
    this.expId = this.route.snapshot.paramMap.get('expid')
    this.serversService.getServerById(this.serverId)
      .pipe(take(1))
      .subscribe((data) => {
        this.expTables = data.expTable;
        data.expTable.forEach(exp => {
          if (exp.id === this.expId) {
            this.form = this.formBuilder.group(exp);
            console.log(this.form.value);
          }
        });
      }
    )
  }

  update() {
    const id = "00000000-0000-0000-0000-000000000000";
    Object.assign(this.expTables[this.expTables.findIndex(el =>
      el.id === this.form.value.id
    )], this.form.value)

    this.expTables.forEach((x) => {
        x.id = id
    });

    // const index = this.expTables.findIndex(x => {
    //   x.id == this.form.value.id
    // });
    // this.expTables[index] = this.form.value;
    console.log(this.expTables);
    this.serversService.updateExpTable(this.serverId, this.expTables)
      .pipe(take(1))
      .subscribe((res) => {
        console.log('expTable atualizado', res);
        this.router.navigate(['/servers/', this.serverId, 'exptable'])
      }
    );
  }

}
