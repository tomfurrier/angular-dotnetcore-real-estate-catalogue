import { Action } from '@ngrx/store';
import { RealEstate } from '../../shared/api-client';

export enum CollectionActionTypes {
  AddRealEstate = '[Collection] Add RealEstate',
  AddRealEstateSuccess = '[Collection] Add RealEstate Success',
  AddRealEstateFail = '[Collection] Add RealEstate Fail',
  UpdateRealEstate = '[Collection] Update RealEstate',
  UpdateRealEstateSuccess = '[Collection] Update RealEstate Success',
  UpdateRealEstateFail = '[Collection] Update RealEstate Fail',
  RemoveRealEstate = '[Collection] Remove RealEstate',
  RemoveRealEstateSuccess = '[Collection] Remove RealEstate Success',
  RemoveRealEstateFail = '[Collection] Remove RealEstate Fail',
  Load = '[Collection] Load',
  LoadSuccess = '[Collection] Load Success',
  LoadFail = '[Collection] Load Fail'
}

/**
 * Add RealEstate to Collection Actions
 */
export class AddRealEstate implements Action {
  readonly type = CollectionActionTypes.AddRealEstate;

  constructor(public payload: RealEstate) {}
}

export class AddRealEstateSuccess implements Action {
  readonly type = CollectionActionTypes.AddRealEstateSuccess;

  constructor(public payload: RealEstate) {}
}

export class AddRealEstateFail implements Action {
  readonly type = CollectionActionTypes.AddRealEstateFail;

  constructor(public payload: RealEstate) {}
}

/**
 * Update RealEstate in Collection Actions
 */
export class UpdateRealEstate implements Action {
  readonly type = CollectionActionTypes.UpdateRealEstate;

  constructor(public payload: RealEstate) {}
}

export class UpdateRealEstateSuccess implements Action {
  readonly type = CollectionActionTypes.UpdateRealEstateSuccess;

  constructor(public payload: RealEstate) {}
}

export class UpdateRealEstateFail implements Action {
  readonly type = CollectionActionTypes.UpdateRealEstateFail;

  constructor(public payload: RealEstate) {}
}

/**
 * Remove RealEstate from Collection Actions
 */
export class RemoveRealEstate implements Action {
  readonly type = CollectionActionTypes.RemoveRealEstate;

  constructor(public payload: RealEstate) {}
}

export class RemoveRealEstateSuccess implements Action {
  readonly type = CollectionActionTypes.RemoveRealEstateSuccess;

  constructor(public payload: RealEstate) {}
}

export class RemoveRealEstateFail implements Action {
  readonly type = CollectionActionTypes.RemoveRealEstateFail;

  constructor(public payload: RealEstate) {}
}

/**
 * Load Collection Actions
 */
export class Load implements Action {
  readonly type = CollectionActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = CollectionActionTypes.LoadSuccess;

  constructor(public payload: RealEstate[]) {}
}

export class LoadFail implements Action {
  readonly type = CollectionActionTypes.LoadFail;

  constructor(public payload: any) {}
}

export type CollectionActionsUnion =
  | AddRealEstate
  | AddRealEstateSuccess
  | AddRealEstateFail
  | UpdateRealEstate
  | UpdateRealEstateSuccess
  | UpdateRealEstateFail
  | RemoveRealEstate
  | RemoveRealEstateSuccess
  | RemoveRealEstateFail
  | Load
  | LoadSuccess
  | LoadFail;
