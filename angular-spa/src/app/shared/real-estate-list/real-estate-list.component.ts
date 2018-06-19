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
import {
  NgxImageGalleryComponent,
  GALLERY_IMAGE,
  GALLERY_CONF
} from 'ngx-image-gallery';
import { DomSanitizer } from '@angular/platform-browser';

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

  @ViewChild(NgxImageGalleryComponent)
  ngxImageGallery: NgxImageGalleryComponent;

  // gallery configuration
  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false
  };

  // gallery images
  images: GALLERY_IMAGE[] = [
    {
      url:
        'https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=1260',
      altText: 'woman-in-black-blazer-holding-blue-cup',
      title: 'woman-in-black-blazer-holding-blue-cup',
      thumbnailUrl:
        'https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=60'
    },
    {
      url:
        'https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=1260',
      altText: 'two-woman-standing-on-the-ground-and-staring-at-the-mountain',
      extUrl:
        'https://www.pexels.com/photo/two-woman-standing-on-the-ground-and-staring-at-the-mountain-669006/',
      thumbnailUrl:
        'https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=60'
    }
  ];

  safeVideoUrl: any;

  // METHODS
  // open gallery
  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }

  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }

  // set new active(visible) image in gallery
  newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }

  // next image in gallery
  nextImage(index: number = 0) {
    this.ngxImageGallery.next();
  }

  // prev image in gallery
  prevImage(index: number = 0) {
    this.ngxImageGallery.prev();
  }

  // EVENTS
  // callback on gallery opened
  galleryOpened(index) {
    console.log('Gallery opened at index ', index);
  }

  // callback on gallery closed
  galleryClosed() {
    console.log('Gallery closed.');
  }

  // callback on gallery image clicked
  galleryImageClicked(index) {
    console.log('Gallery image clicked with index ', index);
  }

  // callback on gallery image changed
  galleryImageChanged(index) {
    console.log('Gallery image changed to index ', index);
  }

  // callback on user clicked delete button
  deleteImage(index) {
    console.log('Delete image at index ', index);
  }

  constructor(
    private _http: HttpClient,
    private store: Store<fromRoot.State>,
    public sanitizer: DomSanitizer
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

    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube-nocookie.com/embed/negni3BiiT4?rel=0&amp;start=7'
    );

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
        price: 24.5,
        roomCount: '3+1',
        title: 'Eladó ház Budapest, IX kerület',
        mediaUrls: [
          { type: 'image', url: 'https://picsum.photos/560/315/?image=2' },
          { type: 'image', url: 'https://picsum.photos/560/315/?image=4' },
          { type: 'image', url: 'https://picsum.photos/560/315/?image=5' },
          {
            type: 'video',
            url: this.sanitizer.bypassSecurityTrustResourceUrl(
              'https://www.youtube-nocookie.com/embed/negni3BiiT4?rel=0&amp;start=7'
            )
          }
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
        price: 43,
        roomCount: '3+1',
        title: 'Kiadó ház Szentes',
        mediaUrls: [
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
        price: 45.7,
        roomCount: '3+2',
        title: 'Eladó ház Szentes',
        mediaUrls: [
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
