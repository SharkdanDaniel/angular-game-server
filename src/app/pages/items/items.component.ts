import { take } from 'rxjs/operators';
import { ItemsService } from './../../core/services/items.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  items: any[];
  count: number;

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.itemsService
      .getItems()
      .pipe(take(1))
      .subscribe((data) => {
        this.items = data.availableItems;
        this.count = this.items.length;
        console.log(data);
      });
  }
}
