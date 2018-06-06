import { SearchFilter } from './searchFilter.model';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as Search from './search.actions';
import * as fromSearch from './search.reducer';
import { Store } from '@ngrx/store';
import { RealEstate } from '../api-client';

@Injectable()
export class SearchService {
  private fbSubs: Subscription[] = [];

  constructor(private store: Store<fromSearch.State>) {}

  search(searchFilter: SearchFilter) {
    this.store.dispatch(new Search.Search(searchFilter));
  }

  setAddressFilter(filter: string) {
    //this.store.dispatch(new Search.SetAddressFilter(filter));
  }

  setIntentFilter(filter: RealEstate.IntentEnum) {
    //this.store.dispatch(new Search.SetIntentFilter(filter));
  }

  setTypeFilter(filter: RealEstate.RealEstateTypeEnum) {
    //this.store.dispatch(new Search.SetTypeFilter(filter));
  }

  setMinPriceFilter(filter: number) {
    //this.store.dispatch(new Search.SetMinPriceFilter(filter));
  }

  setMaxPriceFilter(filter: number) {
    //this.store.dispatch(new Search.SetMaxPriceFilter(filter));
  }
}
