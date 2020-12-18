import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './../../../../core/services/servers.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-available-items-update',
  templateUrl: './available-items-update.component.html',
  styleUrls: ['./available-items-update.component.scss'],
})
export class AvailableItemsUpdateComponent implements OnInit {
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

  update() {
    const id = '00000000-0000-0000-0000-000000000000';
    Object.assign(
      this.availableItems[
        this.availableItems.findIndex((el) => el.id === this.form.value.id)
      ],
      this.form.value
    );

    this.availableItems.forEach((x) => {
      x.id = id;
    });

    console.log(this.availableItems);
    this.serversService
      .updateAvailableItems(this.serverId, this.availableItems)
      .pipe(take(1))
      .subscribe((res) => {
        console.log('availableitems atualizado', res);
        this.router.navigate(['/servers/', this.serverId, 'availableitems']);
      });
  }
}
