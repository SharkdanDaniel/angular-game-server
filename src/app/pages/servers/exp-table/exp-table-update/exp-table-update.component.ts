import { FormGroup, FormBuilder } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
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
          data.expTable.forEach(exp => {
            if (exp.id === this.expId) {
              this.form = this.formBuilder.group(exp);
              console.log(this.form.value);
            }
          }
        );
      }
    )
  }

  update() {
    // console.log(this.form.value)
    this.serversService.updateExpTable(this.serverId, this.form.value)
      .pipe(take(1))
      .subscribe((res) => {
        console.log('expTable atualizado', res);
      }
    );
  }

}
