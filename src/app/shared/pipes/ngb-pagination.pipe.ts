import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ngbPagination'
})
export class NgbPaginationPipe implements PipeTransform {

  transform(value: any[], page: number = 1, pageSize: number = 4): any[] {
    if (value) {
      return value.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    }
    return value;
  }

}
