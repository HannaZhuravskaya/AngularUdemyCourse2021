import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], propName: string, directOrder: boolean = true) {
    value.sort((a, b) => a[propName] > b[propName]
      ? directOrder ? 1 : -1
      : directOrder ? -1 : 1);

    return value;
  }
}