import { PipeTransform, Pipe } from '@angular/core';
import { RealEstate } from '../api-client';

@Pipe({ name: 'realEstateTypeTranslate' })
export class RealEstateTypeTranslatePipe implements PipeTransform {
  transform(value, args: string[]): any {
    console.log('RealEstateTypeTranslatePipe: ' + value);
    switch (value as RealEstate.RealEstateTypeEnum) {
      case RealEstate.RealEstateTypeEnum.House:
        return 'Ház';
      case RealEstate.RealEstateTypeEnum.Flat:
        return 'Lakás';
      case RealEstate.RealEstateTypeEnum.RentedRoom:
        return 'Albérlet';
      case RealEstate.RealEstateTypeEnum.Office:
        return 'Iroda';
      case RealEstate.RealEstateTypeEnum.Site:
        return 'Telek';
      case RealEstate.RealEstateTypeEnum.SummerHouse:
        return 'Nyaraló';
      case RealEstate.RealEstateTypeEnum.AgriculturalArea:
        return 'Mezőgazdasági terület';
      case RealEstate.RealEstateTypeEnum.Soil:
        return 'Termőföld';
      case RealEstate.RealEstateTypeEnum.Garage:
        return 'Garázs';
      default:
        return value;
    }
  }
}
