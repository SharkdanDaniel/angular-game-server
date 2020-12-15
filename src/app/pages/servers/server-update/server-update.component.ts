import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServersService } from './../../../core/services/servers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-update',
  templateUrl: './server-update.component.html',
  styleUrls: ['./server-update.component.scss']
})
export class ServerUpdateComponent implements OnInit {
  true: boolean = true;
  false: boolean = false;
  serverId: string;
  form: FormGroup

  constructor(
    private serversService: ServersService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [''],
      shared: [false],
      hasDisease: [false],
      initialMoney: [0],
      initialStatsPoints: [0],
      parcels: [{
        parcelName: '',
        parcelDescription: ''
      }]
    });
    this.serverId = this.route.snapshot.paramMap.get('id');
    this.serversService.getServerById(this.serverId)
      .pipe(take(1))
      .subscribe((server) => {
        this.form = this.formBuilder.group(server);
        console.log(this.form);
      }
    );
  }

  update() {
    // console.log(this.form.value)
    this.serversService
      .updateServer(this.form.value)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
        console.log('servidor atualizado');
        this.router.navigate(['/servers/profile/', this.serverId]);
      }
    );
  }

}
