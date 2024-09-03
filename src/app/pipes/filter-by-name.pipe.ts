import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName',
  standalone: true,
})
export class FilterByNamePipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    console.log(items, searchText);
    if (!items || !searchText) {
      return items;
    }
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
