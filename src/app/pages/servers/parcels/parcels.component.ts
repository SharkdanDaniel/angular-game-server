import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ServersService } from './../../../core/services/servers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.scss']
})
export class ParcelsComponent implements OnInit {
  serverId: string;
  parcels: any[];
  count: number;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.serverId = this.route.snapshot.paramMap.get('id');
    this.serversService.getServerById(this.serverId)
      .pipe(take(1))
      .subscribe((data) => {
        this.parcels = data.parcels
          // .sort((a, b) => (a.exp > b.exp) ? 1 : -1);
        this.count = this.parcels.length
        console.log(this.parcels);
      }
    );
  }

}
