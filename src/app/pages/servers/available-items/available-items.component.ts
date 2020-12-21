import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ServersService } from './../../../core/services/servers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-available-items',
  templateUrl: './available-items.component.html',
  styleUrls: ['./available-items.component.scss'],
})
export class AvailableItemsComponent implements OnInit {
  serverId: string;
  availableItems: any[];
  count: number;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.serverId = this.route.snapshot.paramMap.get('id');
    this.serversService
      .getServerById(this.serverId)
      .pipe(take(1))
      .subscribe((data) => {
        this.availableItems = data.availableItems;
        this.count = this.availableItems.length;
        console.log(this.availableItems);
      });
  }
}
