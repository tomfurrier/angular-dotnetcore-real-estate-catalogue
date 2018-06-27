import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import * as fromRealEstates from '../../reducers';
import * as RealEstateActions from '../../actions/real-estate.actions';
import { Store } from '@ngrx/store';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-view-real-estate',
  template: `<app-selected-real-estate-page></app-selected-real-estate-page>`
})
export class ViewRealEstateComponent implements OnDestroy {
  actionsSubscription: Subscription;
  isEditMode: boolean;

  constructor(store: Store<fromRealEstates.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => new RealEstateActions.Select(params.id)))
      .subscribe(store);

    this.isEditMode = route.snapshot.url.includes(new UrlSegment('edit', {}));
    console.log('isEditMode: ' + this.isEditMode);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
