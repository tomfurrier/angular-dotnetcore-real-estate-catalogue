import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  toArray,
  tap
} from 'rxjs/operators';

import {
  AddRealEstate,
  AddRealEstateFail,
  AddRealEstateSuccess,
  CollectionActionTypes,
  LoadFail,
  LoadSuccess,
  RemoveRealEstate,
  RemoveRealEstateFail,
  RemoveRealEstateSuccess
} from './../actions/collection.actions';
import { RealEstate, RealestatesService } from '../../shared/api-client';
import { AngularFirestore } from 'angularfire2/firestore';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class CollectionEffects {
  @Effect()
  loadCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.Load),
    mergeMap(() =>
      this.db
        .collection('realEstates')
        .snapshotChanges()
        .map(docArray => {
          const sortedArray = docArray.sort(
            (a, b) =>
              (a.payload.doc.data() as any).createdAt >
              (b.payload.doc.data() as any).createdAt
                ? -1
                : 1
          );
          return sortedArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              intent: (doc.payload.doc.data() as any).intent,
              title: (doc.payload.doc.data() as any).title,
              price: (doc.payload.doc.data() as any).price,
              city: (doc.payload.doc.data() as any).city,
              zipCode: (doc.payload.doc.data() as any).zipCode,
              district: (doc.payload.doc.data() as any).district,
              street: (doc.payload.doc.data() as any).street,
              addressNum: (doc.payload.doc.data() as any).addressNum,
              floorArea: (doc.payload.doc.data() as any).floorArea,
              lotSize: (doc.payload.doc.data() as any).lotSize,
              roomCount: (doc.payload.doc.data() as any).roomCount,
              mediaUrls: (doc.payload.doc.data() as any).mediaUrls,
              newlyBuilt: (doc.payload.doc.data() as any).newlyBuilt,
              constructionYear: (doc.payload.doc.data() as any)
                .constructionYear,
              realEstateType: (doc.payload.doc.data() as any).realEstateType,
              description: (doc.payload.doc.data() as any).description
            };
          });
        })
        .map(
          (realEstates: RealEstate[]) => new LoadSuccess(realEstates),
          error => new LoadFail(error)
        )
    )
  );

  @Effect()
  addRealEstateToCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.AddRealEstate),
    map(action => (action as AddRealEstate).payload),
    mergeMap(realEstate =>
      this.db
        .collection('realEstates')
        .add({
          ...realEstate,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(doc => {
          const result = { ...realEstate };
          result.id = doc.id;
          return new AddRealEstateSuccess(result);
        })
        .catch(() => new AddRealEstateFail(realEstate))
    ),
    tap(() => this.router.navigate(['/']))
  );

  @Effect()
  removeRealEstateFromCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.RemoveRealEstate),
    map(action => (action as RemoveRealEstate).payload),
    mergeMap(realEstate =>
      this.db
        .collection('realEstates')
        .doc(realEstate.id)
        .ref.delete()
        .then(() => new RemoveRealEstateSuccess(realEstate))
        .catch(() => new RemoveRealEstateFail(realEstate))
    )
  );

  constructor(
    private actions$: Actions,
    private db: AngularFirestore,
    private router: Router
  ) {}
}
