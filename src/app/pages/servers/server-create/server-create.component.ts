import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './../../../core/services/servers.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-create',
  templateUrl: './server-create.component.html',
  styleUrls: ['./server-create.component.scss']
})
export class ServerCreateComponent implements OnInit {
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
    this.serverId = this.route.snapshot.paramMap.get('id');
    this.form = this.formBuilder.group({
      name: [''],
      shared: [false],
      hasDisease: [false],
      initialMoney: [0],
      initialStatsPoints: [0],
      parcels: [null]
      //   {
      //   parcelName: '',
      //   parcelDescription: ''
      // }]
    });
  }

  create() {
    // console.log(this.form.value);
    this.serversService.createServer(this.form.value)
      .pipe(take(1))
      .subscribe((res) => {
        console.log('Servidor criado', res);
        this.router.navigate(['/servers'])
      })
  }

}
