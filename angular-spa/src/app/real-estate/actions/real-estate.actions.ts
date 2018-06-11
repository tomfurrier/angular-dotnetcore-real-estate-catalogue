import { Action } from '@ngrx/store';
import { RealEstate } from '../../shared/api-client';

export enum RealEstateActionTypes {
  Search = '[RealEstate] Search',
  SearchComplete = '[RealEstate] Search Complete',
  SearchError = '[RealEstate] Search Error',
  Load = '[RealEstate] Load',
  Select = '[RealEstate] Select'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handRealEstate/advanced-types.html#discriminated-unions
 */
export class Search implements Action {
  readonly type = RealEstateActionTypes.Search;

  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = RealEstateActionTypes.SearchComplete;

  constructor(public payload: RealEstate[]) {}
}

export class SearchError implements Action {
  readonly type = RealEstateActionTypes.SearchError;

  constructor(public payload: string) {}
}

export class Load implements Action {
  readonly type = RealEstateActionTypes.Load;

  constructor(public payload: RealEstate) {}
}

export class Select implements Action {
  readonly type = RealEstateActionTypes.Select;

  constructor(public payload: number) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type RealEstateActionsUnion =
  | Search
  | SearchComplete
  | SearchError
  | Load
  | Select;
