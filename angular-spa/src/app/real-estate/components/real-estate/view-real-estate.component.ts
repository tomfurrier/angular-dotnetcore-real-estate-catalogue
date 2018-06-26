import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import * as fromRealEstates from '../../reducers';
import * as RealEstateActions from '../../actions/real-estate.actions';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-view-real-estate',
  template: `<app-selected-real-estate-page></app-selected-real-estate-page>`
})
export class ViewRealEstateComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromRealEstates.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => new RealEstateActions.Select(params.id)))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
