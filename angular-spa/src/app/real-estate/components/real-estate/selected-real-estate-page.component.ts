import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRealEstates from '../../reducers';
import * as CollectionActions from '../../actions/collection.actions';
import { RealEstate } from '../../../shared/api-client';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-selected-real-estate-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-real-estate-detail *ngIf="!isEditMode"
      [realEstate]="realEstate$ | async">
    </app-real-estate-detail>
    <app-real-estate-edit *ngIf="isEditMode"
    [realEstate]="realEstate$ | async" [editExistingRealEstate]="isEditMode">
  </app-real-estate-edit>

  `
})
export class SelectedRealEstatePageComponent {
  realEstate$: Observable<RealEstate>;

  @Input() isEditMode: boolean;

  constructor(private store: Store<fromRealEstates.State>) {
    this.realEstate$ = store.pipe(
      select(fromRealEstates.getSelectedRealEstate)
    ) as Observable<RealEstate>;
  }
}
