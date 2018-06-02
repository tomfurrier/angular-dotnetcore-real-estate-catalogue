import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-real-estate-list',
  templateUrl: './real-estate-list.component.html',
  styleUrls: ['./real-estate-list.component.css']
})
export class RealEstateListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['card'];
  dataSource = new MatTableDataSource<any>();
  images: any[];
  imageUrls: Array<string>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _http: HttpClient) {}

  ngOnInit() {
    this.dataSource.data = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '5',
      '5',
      '5',
      '5',
      '5',
      '5',
      '5',
      '5',
      '5',
      '5',
      '5',
      '5',
      '5',
      '5',
      '5',
      '5',
      '5',
      '5',
      '5',
      '5',
      '5'
    ];
    this.images = [];
    this.imageUrls = [];

    this.images.push({
      source:
        'https://images.unsplash.com/photo-1490174651618-63469b221857?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e22f2fca63097c3490108b6dfd82d0a7&auto=format&fit=crop&w=600&q=80',
      alt: 'Description for Image 1',
      title: 'Title 1'
    });
    this.images.push({
      source:
        'https://media.istockphoto.com/photos/idyllic-home-with-covered-porch-picture-id479767332?k=6&m=479767332&s=612x612&w=0&h=sOZeUL84YCIEjpDFiaBg5Wb0sQt14L5kY81smoQJCu0=',
      alt: 'Description for Image 2',
      title: 'Title 2'
    });
    this.images.push({
      source: 'https://picsum.photos/540/405/?image=2',
      alt: 'Description for Image 3',
      title: 'Title 3'
    });
    this.images.push({
      source: 'https://picsum.photos/540/405/?image=4',
      alt: 'Description for Image 4',
      title: 'Title 4'
    });
    this.images.push({
      source: 'https://picsum.photos/540/405/?image=5',

      alt: 'Description for Image 5',
      title: 'Title 5'
    });
    this.images.push({
      source: 'https://picsum.photos/540/405/?image=6',

      alt: 'Description for Image 6',
      title: 'Title 6'
    });
    this.images.push({
      source: 'https://picsum.photos/540/405/?image=7',

      alt: 'Description for Image 7',
      title: 'Title 7'
    });
    this.images.push({
      source: 'https://picsum.photos/540/405/?image=8',

      alt: 'Description for Image 8',
      title: 'Title 8'
    });

    this.imageUrls.push('https://picsum.photos/540/405/?image=7');
    this.imageUrls.push('https://picsum.photos/540/405/?image=14');
    this.imageUrls.push('https://picsum.photos/540/405/?image=8');
    this.imageUrls.push('https://picsum.photos/540/405/?image=16');

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
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
