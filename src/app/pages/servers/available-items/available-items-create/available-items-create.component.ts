import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './../../../../core/services/servers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-available-items-create',
  templateUrl: './available-items-create.component.html',
  styleUrls: ['./available-items-create.component.scss']
})
export class AvailableItemsCreateComponent implements OnInit {
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
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [''],
      health: [0],
      vest: [0],
      experience: [0],
      hungry: [0],
      money: [0],
      statusPoint: [0],
      quantityInitial: [0],
      isInitial: [false],
      isVirtual: [false],
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

  create() {
    const id = "00000000-0000-0000-0000-000000000000";
    this.availableItems.forEach((x) => {
        x.id = id
    });
    this.availableItems.push(this.form.value);
    console.log(this.availableItems);
    this.serversService.updateAvailableItems(this.serverId, this.availableItems)
      .pipe(take(1))
      .subscribe((res) => {
        console.log('availableItem criado', res);
        this.router.navigate(['/servers/', this.serverId, 'availableitems'])
      }
    );
  }

}
