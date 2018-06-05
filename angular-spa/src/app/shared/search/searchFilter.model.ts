import { RealEstate } from '../api-client';

export interface SearchFilter {
  address: string;
  minPrice: number;
  maxPrice: number;
  type: RealEstate.RealEstateTypeEnum;
  intent: RealEstate.IntentEnum;
}
