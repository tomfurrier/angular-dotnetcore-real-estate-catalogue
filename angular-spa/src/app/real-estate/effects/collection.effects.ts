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
  RemoveRealEstateSuccess,
  UpdateRealEstate,
  UpdateRealEstateSuccess,
  UpdateRealEstateFail
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
          const sortedFilteredArray = docArray
            .filter(r => !(r.payload.doc.data() as any).isDeleted)
            .sort(
              (a, b) =>
                (a.payload.doc.data() as any).createdAt >
                (b.payload.doc.data() as any).createdAt
                  ? -1
                  : 1
            );
          return sortedFilteredArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              isDeleted: (doc.payload.doc.data() as any).isDeleted,
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
              previewMediaUrl: (doc.payload.doc.data() as any).previewMediaUrl,
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
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          modifiedAt: firebase.firestore.FieldValue.serverTimestamp()
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
  updateRealEstateInCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.UpdateRealEstate),
    map(action => (action as UpdateRealEstate).payload),
    tap(realEstate => console.log(JSON.stringify(realEstate))),
    mergeMap(realEstate =>
      this.db
        .collection('realEstates')
        .doc(realEstate.id)
        .set(
          {
            ...realEstate,
            district: realEstate.district ? realEstate.district : null,
            lotSize: realEstate.lotSize ? realEstate.lotSize : null,
            constructionYear: realEstate.constructionYear
              ? realEstate.constructionYear
              : null,
            intent: realEstate.intent ? realEstate.intent : null,
            newlyBuilt: realEstate.newlyBuilt ? realEstate.newlyBuilt : null,
            realEstateType: realEstate.realEstateType
              ? realEstate.realEstateType
              : null,
            previewMediaUrl: realEstate.previewMediaUrl
              ? realEstate.previewMediaUrl
              : null,
            tags: realEstate.tags ? realEstate.tags : null,
            sellingStatus: realEstate.sellingStatus
              ? realEstate.sellingStatus
              : null,
            id: realEstate.id ? realEstate.id : null,
            modifiedAt: firebase.firestore.FieldValue.serverTimestamp()
          },
          { merge: true }
        )
        .then(() => new UpdateRealEstateSuccess(realEstate))
        .catch(() => new UpdateRealEstateFail(realEstate))
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
