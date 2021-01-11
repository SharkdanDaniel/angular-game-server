import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from './../../../core/services/items.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-delete',
  templateUrl: './item-delete.component.html',
  styleUrls: ['./item-delete.component.scss'],
})
export class ItemDeleteComponent implements OnInit {
  false: boolean = false;
  true: boolean = true;
  form: FormGroup;

  constructor(
    private itemsService: ItemsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [{ value: null, disabled: true }],
      health: [{ value: null, disabled: true }],
      vest: [{ value: null, disabled: true }],
      experience: [{ value: null, disabled: true }],
      hungry: [{ value: null, disabled: true }],
      money: [{ value: null, disabled: true }],
      statusPoint: [{ value: null, disabled: true }],
      quantityInitial: [{ value: null, disabled: true }],
      isInitial: [{ value: null, disabled: true }],
      isVirtual: [{ value: null, disabled: true }],
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.itemsService
      .getItems()
      .pipe(take(1))
      .subscribe((data) => {
        data.availableItems.forEach((i) => {
          if (i.id == id) {
            this.form = this.formBuilder.group(i);
            console.log(this.form.value);
          }
        });
      });
  }

  delete() {
    this.itemsService
      .deleteItem(this.form.value.id)
      .pipe(take(1))
      .subscribe((res) => {
        console.log('Item excluído', res);
        this.router.navigate(['items']);
      });
  }
}
