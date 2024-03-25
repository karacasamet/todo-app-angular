import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trueFalse',
  standalone: true,
})
export class TrueFalsePipe implements PipeTransform {
  transform(value: unknown, matchValue: unknown): boolean {
    return value === matchValue;
  }
}
