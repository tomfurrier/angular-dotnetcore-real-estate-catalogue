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
        console.log('searchFilter: ' + searchFilter);
        this.searchFilter = searchFilter;
        this.dataSource.filter = this.dataSource.filter === '1' ? '2' : '1'; // to trigger filtering
      });

    this.dataSource.filterPredicate = (data: RealEstate, filter: string) => {
      console.log('filtering..');
      if (!this.searchFilter) return null;
      const lowerCaseAddress = this.searchFilter.address
        ? this.searchFilter.address.toLocaleLowerCase()
        : null;
      return (
        this.searchFilter.type === null ||
        this.searchFilter.type === data.realEstateType ||
        (this.searchFilter.address === null ||
          data.city.toLocaleLowerCase().indexOf(lowerCaseAddress) === -1 ||
          data.street.toLocaleLowerCase().indexOf(lowerCaseAddress) === -1 ||
          data.district === parseInt(lowerCaseAddress, 10) ||
          (this.searchFilter.minPrice === null ||
            data.price >= this.searchFilter.minPrice) ||
          (this.searchFilter.maxPrice === null ||
            data.price <= this.searchFilter.maxPrice) ||
          (this.searchFilter.intent === null ||
            this.searchFilter.intent === data.intent))
      );
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
        title: 'Eladó ház IX kerület',
        photoUrls: [
          'https://picsum.photos/540/405/?image=2',
          'https://picsum.photos/540/405/?image=4',
          'https://picsum.photos/540/405/?image=5'
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
