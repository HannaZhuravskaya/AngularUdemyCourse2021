import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  // Notes: use 'pure: false' - not the best idea. Trying recalculate pipe every time value changed. Can have problems with permormance.
  // So there is no built-in filter pipes
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: string) {
    if (value.length === 0 || filterString === '')
      return value;

    let resultArray = [];

    for (let item of value) {
      if (item[propName] === filterString)
        resultArray.push(item);
    }

    return resultArray;
  }
}