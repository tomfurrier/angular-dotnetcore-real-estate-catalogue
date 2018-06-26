import { Component, ChangeDetectionStrategy } from '@angular/core';
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
    <app-real-estate-detail
      [realEstate]="realEstate$ | async">
    </app-real-estate-detail>
  `
})
export class SelectedRealEstatePageComponent {
  realEstate$: Observable<RealEstate>;

  constructor(private store: Store<fromRealEstates.State>) {
    this.realEstate$ = store.pipe(
      select(fromRealEstates.getSelectedRealEstate)
    ) as Observable<RealEstate>;
  }

  addToCollection(realEstate: RealEstate) {
    this.store.dispatch(new CollectionActions.AddRealEstate(realEstate));
  }

  removeFromCollection(realEstate: RealEstate) {
    this.store.dispatch(new CollectionActions.RemoveRealEstate(realEstate));
  }
}
