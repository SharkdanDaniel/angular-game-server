import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ServersService } from './../../../core/services/servers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exp-table',
  templateUrl: './exp-table.component.html',
  styleUrls: ['./exp-table.component.scss']
})
export class ExpTableComponent implements OnInit {
  serverId: string;
  expTables: any[];

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.serverId = this.route.snapshot.paramMap.get('id');
    this.serversService.getServerById(this.serverId)
      .pipe(take(1))
      .subscribe((data) => {
        this.expTables = data.expTable;
        console.log(this.expTables);
      }
    );
  }

}
