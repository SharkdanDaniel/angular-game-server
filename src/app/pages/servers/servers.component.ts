import { take } from 'rxjs/operators';
import { ServersService } from './../../core/services/servers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {
  servers: any[];

  constructor(private serversService: ServersService) { }

  ngOnInit(): void {
    this.serversService.getServers()
      .pipe(take(1))
      .subscribe((data) =>{
        this.servers = data;
        console.log(this.servers);
      })
  }

}
