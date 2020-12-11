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

  server: any;

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
        console.log(this.server)
      })
  }

}
