import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

import * as CollectionActions from '../../real-estate/actions/collection.actions';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { RealEstate } from '../api-client';
import { SearchFilter } from '../search/searchFilter.model';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as fromRealEstates from '../../real-estate/reducers';

import { Observable, Subscription, merge } from 'rxjs';
import { take, last, mergeMap, tap } from 'rxjs/operators';
import {
  NgxImageGalleryComponent,
  GALLERY_IMAGE,
  GALLERY_CONF
} from 'ngx-image-gallery';
import { DomSanitizer } from '@angular/platform-browser';
import { pipe } from '@angular/core/src/render3/pipe';

@Component({
  selector: 'app-real-estate-list',
  templateUrl: './real-estate-list.component.html',
  styleUrls: ['./real-estate-list.component.css']
})
export class RealEstateListComponent
  implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['card'];
  dataSource = new MatTableDataSource<RealEstate>();
  searchFilter: SearchFilter;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private store: Store<fromRoot.State>,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    /* this.store
      .select(fromRoot.getSearchFilter)
      .subscribe((searchFilter: SearchFilter) => {
        this.searchFilter = searchFilter;
        this.dataSource.filter = this.dataSource.filter === '1' ? '2' : '1';
      });

    this.dataSource.filterPredicate = (data: RealEstate, filter: string) => {
      if (!this.searchFilter) {
        return true;
      }
      console.log('================= new filtering=============');

      console.log('filterPredicate: ' + JSON.stringify(this.searchFilter));
      console.log('data: ' + JSON.stringify(data));

      const lowerCaseAddress = this.searchFilter.address
        ? this.searchFilter.address.toLocaleLowerCase()
        : null;

      const realestateTypeMatches =
        this.searchFilter.type === null ||
        this.searchFilter.type === data.realEstateType;

      const addressMatches =
        !this.searchFilter.address ||
        data.city.toLocaleLowerCase().indexOf(lowerCaseAddress) !== -1 ||
        data.street.toLocaleLowerCase().indexOf(lowerCaseAddress) !== -1 ||
        data.district === parseInt(lowerCaseAddress, 10);

      const multipliedMinPrice = this.searchFilter.minPrice * 1000000;
      const multipliedMaxPrice = this.searchFilter.maxPrice * 1000000;

      const minPriceMatches =
        !this.searchFilter.minPrice || data.price >= multipliedMinPrice;
      const maxPriceMatches =
        !this.searchFilter.maxPrice || data.price <= multipliedMaxPrice;

      const intentMatches =
        !this.searchFilter.intent || this.searchFilter.intent === data.intent;

      const result =
        realestateTypeMatches &&
        addressMatches &&
        minPriceMatches &&
        maxPriceMatches &&
        intentMatches;

      console.log(
        'data.price ' +
          data.price +
          ',multipliedMaxPrice: ' +
          multipliedMaxPrice +
          ', multipliedMinPrice: ' +
          multipliedMinPrice
      );

      console.log(
        'Filtering: realestateTypeMatches: ' +
          realestateTypeMatches +
          ' ,  addressMatches: ' +
          addressMatches +
          ' , minPriceMatches: ' +
          minPriceMatches +
          ' , maxPriceMatches: ' +
          maxPriceMatches +
          ' , intentMatches: ' +
          intentMatches +
          ' ,result: ' +
          result
      );

      return result;
    };*/

    this.store
      .pipe(
        select(fromRealEstates.getRealEstateCollection),
        tap(t => console.log('realestatesssss: ' + JSON.stringify(t))),
        mergeMap(realEstates => (this.dataSource.data = realEstates))
      )
      .subscribe();

    this.store.dispatch(new CollectionActions.Load());
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue; // to trigger filter only
  }

  ngOnDestroy(): void {
    // this.searchFilterSubs.unsubscribe();
  }
}
