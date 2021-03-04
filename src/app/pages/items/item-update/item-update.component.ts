import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from './../../../core/services/items.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.scss'],
})
export class ItemUpdateComponent implements OnInit {
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
    const id = this.route.snapshot.paramMap.get('id');
    // this.itemsService
    //   .getItems()
    //   .pipe(take(1))
    //   .subscribe((data) => {
    //     data.availableItems.forEach((i) => {
    //       if (i.id == id) {
    //         this.form = this.formBuilder.group(i);
    //         console.log(this.form.value);
    //       }
    //     });
    //   });
  }

  update() {
    this.itemsService
      .update(this.form.value)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res, 'Item atualizado');
        this.router.navigate(['items'])
      });
  }
}
