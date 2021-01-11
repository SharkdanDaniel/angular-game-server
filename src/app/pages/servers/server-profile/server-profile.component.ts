import { take } from 'rxjs/operators';
import { ServersService } from './../../../core/services/servers.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-profile',
  templateUrl: './server-profile.component.html',
  styleUrls: ['./server-profile.component.scss']
})
export class ServerProfileComponent implements OnInit {

  public isCollapsed1 = true;
  public isCollapsed2 = true;
  public isCollapsed3 = true;

  server: any = {};

  constructor(
    private route: ActivatedRoute,
    private serversService: ServersService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.serversService.getServerById(id)
      .pipe(take(1))
      .subscribe((data) => {
        this.server = data;
        console.log('detalhes do servidor',this.server)
      })
  }

}
