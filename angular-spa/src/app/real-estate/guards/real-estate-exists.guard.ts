import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import * as RealEstateActions from '../actions/real-estate.actions';
import * as fromRealEstates from '../reducers';
import { AngularFirestore } from 'angularfire2/firestore';
import { RealEstate } from '../../shared/api-client';

/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class RealEstateExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromRealEstates.State>,
    private db: AngularFirestore,
    private router: Router
  ) {}

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the collection state to turn `true`, emitting one time once loading
   * has finished.
   */
  waitForCollectionToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(fromRealEstates.getCollectionLoaded),
      filter(loaded => loaded),
      take(1)
    );
  }

  /**
   * This method checks if a book with the given ID is already registered
   * in the Store
   */
  hasRealEstateInStore(id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromRealEstates.getRealEstateEntities),
      map(entities => !!entities[id]),
      take(1)
    );
  }

  /**
   * This method loads a realEstate with the given ID from the DB and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasRealEstateInDB(id: string): Observable<boolean> {
    return this.db
      .collection('realEstates')
      .doc(id)
      .valueChanges()
      .pipe(
        map((entity: RealEstate) => new RealEstateActions.Load(entity)),
        tap((action: RealEstateActions.Load) => this.store.dispatch(action)),
        map(entity => !!entity),
        catchError(() => {
          this.router.navigate(['/404']);
          return of(false);
        })
      );
  }

  /**
   * `hasRealEstate` composes `hasRealEstateInStore` and `hasRealEstateInDB`. It first checks
   * if the book is in store, and if not it then checks if it is in the
   * DB.
   */
  hasRealEstate(id: string): Observable<boolean> {
    return this.hasRealEstateInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasRealEstateInDB(id);
      })
    );
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a realEstate from the DB or if we already have it in our cache.
   * If it finds it in the cache or in the DB, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCollectionToLoad().pipe(
      switchMap(() => this.hasRealEstate(route.params['id']))
    );
  }
}
