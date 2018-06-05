import { Action } from '@ngrx/store';
import { SearchFilter } from './searchFilter.model';
import { RealEstate, RealestatesService } from '../api-client';

export const SEARCH = '[SEARCH] Search';
export const SET_ADDRESS_FILTER = '[SEARCH] Set Address Filter';
export const SET_TYPE_FILTER = '[SEARCH] Set Type Filter';
export const SET_INTENT_FILTER = '[SEARCH] Set Intent Filter';
export const SET_MIN_PRICE_FILTER = '[SEARCH] Set Min Price Filter';
export const SET_MAX_PRICE_FILTER = '[SEARCH] Set Max Price Filter';

export class Search implements Action {
  readonly type = SEARCH;

  constructor(public payload: SearchFilter) {}
}

export class SetAddressFilter implements Action {
  readonly type = SET_ADDRESS_FILTER;

  constructor(public payload: string) {}
}

export class SetTypeFilter implements Action {
  readonly type = SET_TYPE_FILTER;

  constructor(public payload: RealEstate.RealEstateTypeEnum) {}
}

export class SetIntentFilter implements Action {
  readonly type = SET_INTENT_FILTER;

  constructor(public payload: RealEstate.IntentEnum) {}
}

export class SetMinPriceFilter implements Action {
  readonly type = SET_MIN_PRICE_FILTER;

  constructor(public payload: number) {}
}

export class SetMaxPriceFilter implements Action {
  readonly type = SET_MAX_PRICE_FILTER;

  constructor(public payload: number) {}
}

export type SearchActions =
  | Search
  | SetAddressFilter
  | SetTypeFilter
  | SetIntentFilter
  | SetMinPriceFilter
  | SetMaxPriceFilter;
