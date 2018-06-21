import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { asyncScheduler, empty, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil
} from 'rxjs/operators';

import {
  RealEstateActionTypes,
  Search,
  SearchComplete,
  SearchError
} from '../actions/real-estate.actions';
import { Scheduler } from 'rxjs/internal/Scheduler';
import { RealestatesService, RealEstate } from '../../shared/api-client';
import { AngularFirestore } from 'angularfire2/firestore';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler'
);

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class RealEstateEffects {
  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType<Search>(RealEstateActionTypes.Search),
    debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
    map((action: Search) => action.payload),
    switchMap((query: string) => {
      if (query === '') {
        return empty();
      }

      const nextSearch$ = this.actions$.pipe(
        ofType(RealEstateActionTypes.Search),
        skip(1)
      );

      // TODO fix this
      /*return this.db
      .collection('realEstates')
      .ref.where('title', '==', query)
      .get()
      .then(
        doc => {doc.docs[0].data as RealEstate[]}
      .pipe(
        takeUntil(nextSearch$),
        map((realEstates: RealEstate[]) => new SearchComplete(realEstates)),
        catchError(err => of(new SearchError(err)))
      );*/
    })
  );

  constructor(
    private actions$: Actions,
    private db: AngularFirestore,
    @Optional()
    @Inject(SEARCH_DEBOUNCE)
    private debounce: number,
    /**
     * You inject an optional Scheduler that will be undefined
     * in normal application usage, but its injected here so that you can mock out
     * during testing using the RxJS TestScheduler for simulating passages of time.
     */
    @Optional()
    @Inject(SEARCH_SCHEDULER)
    private scheduler: Scheduler
  ) {}
}
