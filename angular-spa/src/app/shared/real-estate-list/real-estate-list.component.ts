import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { RealEstate } from '../api-client';
import { SearchFilter } from '../search/searchFilter.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Observable, Subscription } from 'rxjs';
import { take, last } from 'rxjs/operators';

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
    private _http: HttpClient,
    private store: Store<fromRoot.State>
  ) {}

  getImageDataFromUrl(urls: string[]) {
    return urls.map(s => ({
      source: s,
      alt: 'Description for Image 4',
      title: 'Title 4'
    }));
  }

  ngOnInit() {
    this.store
      .select(fromRoot.getSearchFilter)
      .subscribe((searchFilter: SearchFilter) => {
        this.searchFilter = searchFilter;
        this.dataSource.filter = this.dataSource.filter === '1' ? '2' : '1'; // to trigger filtering
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
        this.searchFilter.minPrice === null || data.price >= multipliedMinPrice;
      const maxPriceMatches =
        this.searchFilter.maxPrice === null || data.price <= multipliedMaxPrice;

      const intentMatches =
        !this.searchFilter.intent || this.searchFilter.intent === data.intent;

      const result =
        realestateTypeMatches &&
        addressMatches &&
        minPriceMatches &&
        maxPriceMatches &&
        intentMatches;

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
    };

    this.dataSource.data = [
      {
        city: 'Budapest',
        addressNum: '1234/4',
        description:
          'Váralja közkedvelt utcájából, a Mátrayból kínáljuk megvételre ezt a kiváló állapotú házban lévő 68m2-es lakást. A közelmúltban felújított és átalakított ingatlan egy amerikai konyhás nappalival, 2 hálószobával, 2 fürdőszobával és egy vendég wc-vel rendelkezik.',
        district: 9,
        intent: RealEstate.IntentEnum.Buy,
        street: 'Pitypang utca',
        zipCode: 1234,
        constructionYear: 2016,
        floorArea: 34.5,
        price: 242423,
        roomCount: '3+1',
        title: 'Eladó ház Budapest, IX kerület',
        photoUrls: [
          'https://picsum.photos/540/405/?image=2',
          'https://picsum.photos/540/405/?image=4',
          'https://picsum.photos/540/405/?image=5'
        ]
      },
      {
        city: 'Szentes',
        addressNum: '1234/4',
        description: 'min 1 évre',
        intent: RealEstate.IntentEnum.Rent,
        street: 'Pitypang utca',
        zipCode: 1234,
        constructionYear: 2016,
        floorArea: 34.5,
        price: 12000000,
        roomCount: '3+1',
        title: 'Kiadó ház Szentes',
        photoUrls: [
          'https://picsum.photos/540/405/?image=7',
          'https://picsum.photos/540/405/?image=11',
          'https://picsum.photos/540/405/?image=9'
        ]
      },
      {
        city: 'Szentes',
        addressNum: '12342/4',
        description: 'Kis eladó ház',
        district: 9,
        intent: RealEstate.IntentEnum.Buy,
        street: 'kossuth utca',
        zipCode: 5164,
        constructionYear: 2014,
        floorArea: 54.5,
        price: 22000000,
        roomCount: '3+2',
        title: 'Eladó ház Szentes',
        photoUrls: [
          'https://picsum.photos/540/405/?image=12',
          'https://picsum.photos/540/405/?image=10',
          'https://picsum.photos/540/405/?image=3'
        ]
      }
    ];

    // this.store
    //   .select(fromTraining.getFinishedExercises)
    //   .subscribe((exercises: Exercise[]) => (this.dataSource.data = exercises));
    // this.trainingService.fetchCompletedOrCancelledExercises();
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
