import { take } from 'rxjs/operators';
import { ItemsService } from './../../../core/services/items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss'],
})
export class ItemCreateComponent implements OnInit {
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
  }

  create() {
    this.itemsService
      .create(this.form.value)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res, 'Item criado');
        this.router.navigate(['items'])
      });
  }
}
