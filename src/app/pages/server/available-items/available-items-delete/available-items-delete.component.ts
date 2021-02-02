import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from '../../../../core/services/servers.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-available-items-delete',
  templateUrl: './available-items-delete.component.html',
  styleUrls: ['./available-items-delete.component.scss'],
})
export class AvailableItemsDeleteComponent implements OnInit {
  serverId: string;
  itId: string;
  false: boolean = false;
  true: boolean = true;
  form: FormGroup;
  availableItems: any[];

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null],
      health: [null],
      vest: [null],
      experience: [null],
      hungry: [null],
      money: [null],
      statusPoint: [null],
      quantityInitial: [null],
      isInitial: [null],
      isVirtual: [null],
    });
    this.serverId = this.route.snapshot.paramMap.get('id');
    this.itId = this.route.snapshot.paramMap.get('itid');
    this.serversService
      .getServerById(this.serverId)
      .pipe(take(1))
      .subscribe((data) => {
        this.availableItems = data.availableItems;
        data.availableItems.forEach((items) => {
          if (items.id === this.itId) {
            this.form = this.formBuilder.group(items);
            console.log(this.form.value);
          }
        });
      });
  }

  delete() {
    const id = '00000000-0000-0000-0000-000000000000';

    this.availableItems.forEach((x, i) => {
      if (x.id == this.itId) {
        this.availableItems.splice(
          this.availableItems.findIndex((a) => a.id === this.itId),
          1
        );
      }
      x.id = id;
    });
    console.log(this.availableItems);
    this.serversService
      .updateAvailableItems(this.serverId, this.availableItems)
      .pipe(take(1))
      .subscribe((res) => {
        console.log('Item excluído', res);
        this.router.navigate(['/server/', this.serverId, 'availableitems']);
      });
  }
}
