import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from '../../../../core/services/servers.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exp-table-delete',
  templateUrl: './exp-table-delete.component.html',
  styleUrls: ['./exp-table-delete.component.scss']
})
export class ExpTableDeleteComponent implements OnInit {
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

  delete() {
    const id = "00000000-0000-0000-0000-000000000000";



    this.expTables.forEach((x, i) => {
      if (x.id == this.expId) {
        this.expTables.splice(this.expTables.findIndex( a => a.id === this.expId), 1)
      }
        x.id = id
    });
    console.log(this.expTables);
    this.serversService.updateExpTable(this.serverId, this.expTables)
      .pipe(take(1))
      .subscribe((res) => {
        console.log('expTable excluído', res);
        this.router.navigate(['/server/', this.serverId, 'exptable'])
      }
    );

  }

}
