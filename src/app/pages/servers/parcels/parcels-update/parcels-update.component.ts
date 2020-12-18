import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './../../../../core/services/servers.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parcels-update',
  templateUrl: './parcels-update.component.html',
  styleUrls: ['./parcels-update.component.scss'],
})
export class ParcelsUpdateComponent implements OnInit {
  serverId: string;
  pId: string;
  form: FormGroup;
  parcels: any[];
  server: any;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      parcelDescription: [null],
      parcelName: [null],
    });
    this.serverId = this.route.snapshot.paramMap.get('id');
    this.pId = this.route.snapshot.paramMap.get('pid');
    this.serversService
      .getServerById(this.serverId)
      .pipe(take(1))
      .subscribe((data) => {
        this.parcels = data.parcels;
        this.server = data;
        data.parcels.forEach((p) => {
          if (p.id === this.pId) {
            this.form = this.formBuilder.group(p);
            console.log(this.form.value);
          }
        });
      });
  }

  update() {
    const id = '00000000-0000-0000-0000-000000000000';
    Object.assign(
      this.parcels[
        this.parcels.findIndex((el) => el.id === this.form.value.id)
      ],
      this.form.value
    );

    this.parcels.forEach((x) => {
      x.id = id;
    });
    // this.server['parcels'].push(this.parcels)
    console.log(this.parcels);
    console.log(this.server);
    this.serversService
      .updateServer(this.server)
      .pipe(take(1))
      .subscribe((res) => {
        console.log('parcel atualizado', res);
        this.router.navigate(['/servers/', this.serverId, 'parcels']);
      });
  }
}
