import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './../../../../core/services/servers.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exp-table-create',
  templateUrl: './exp-table-create.component.html',
  styleUrls: ['./exp-table-create.component.scss']
})
export class ExpTableCreateComponent implements OnInit {
  serverId: string;
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
      title: [''],
      exp: [0],
      level: [0]
    });
    this.serverId = this.route.snapshot.paramMap.get('id')
    this.serversService.getServerById(this.serverId)
      .pipe(take(1))
      .subscribe((data) => {
        this.expTables = data.expTable;
      }
    )
  }

  create() {
    const id = "00000000-0000-0000-0000-000000000000";
    this.expTables.forEach((x) => {
        x.id = id
    });
    this.expTables.push(this.form.value);
    console.log(this.expTables);
    this.serversService.updateExpTable(this.serverId, this.expTables)
      .pipe(take(1))
      .subscribe((res) => {
        console.log('expTable criado', res);
        this.router.navigate(['/servers/', this.serverId, 'exptable'])
      }
    );
  }


}
