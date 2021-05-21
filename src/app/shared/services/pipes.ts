import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'storeTypePipe' })
export class StoreTypePipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'Supermarkets';
      case 2:
        return 'Department Stores';
      case 3:
        return 'Discount Retailer';
      case 4:
        return 'Convenience Store';
      case 5:
        return 'Warehouse';
      case 6:
        return 'Drug Store';
      case 7:
        return 'Used Goods Store';
      case 8:
        return 'Mall';
    }
  }
}
