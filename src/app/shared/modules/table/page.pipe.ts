import { Pipe, PipeTransform } from "@angular/core";

const PAGE_SIZE = 10;

@Pipe({
  name: "page",
})
export class PagePipe implements PipeTransform {
  transform(value: any[], currentPage: number = 0): any[] {
    if (value) {
      return value.slice(currentPage * PAGE_SIZE, PAGE_SIZE);
    }
    return value;
  }
}
