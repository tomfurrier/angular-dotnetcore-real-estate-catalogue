import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-real-estates',
  templateUrl: './real-estates.component.html',
  styleUrls: ['./real-estates.component.css']
})
export class RealEstatesComponent implements OnInit, AfterViewInit {
  displayedColumns = ['card'];
  dataSource = new MatTableDataSource<any>();
  images: any[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() // private trainingService: TrainingService,
  // private store: Store<fromTraining.State>
  {}

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
      source:
        'https://images.unsplash.com/photo-1490174651618-63469b221857?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e22f2fca63097c3490108b6dfd82d0a7&auto=format&fit=crop&w=600&q=80',
      alt: 'Description for Image 3',
      title: 'Title 3'
    });
    this.images.push({
      source:
        'https://media.istockphoto.com/photos/idyllic-home-with-covered-porch-picture-id479767332?k=6&m=479767332&s=612x612&w=0&h=sOZeUL84YCIEjpDFiaBg5Wb0sQt14L5kY81smoQJCu0=',
      alt: 'Description for Image 4',
      title: 'Title 4'
    });
    this.images.push({
      source:
        'https://images.unsplash.com/photo-1490174651618-63469b221857?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e22f2fca63097c3490108b6dfd82d0a7&auto=format&fit=crop&w=600&q=80',
      alt: 'Description for Image 3',
      title: 'Title 3'
    });
    this.images.push({
      source:
        'https://media.istockphoto.com/photos/idyllic-home-with-covered-porch-picture-id479767332?k=6&m=479767332&s=612x612&w=0&h=sOZeUL84YCIEjpDFiaBg5Wb0sQt14L5kY81smoQJCu0=',
      alt: 'Description for Image 4',
      title: 'Title 4'
    });
    this.images.push({
      source:
        'https://images.unsplash.com/photo-1490174651618-63469b221857?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e22f2fca63097c3490108b6dfd82d0a7&auto=format&fit=crop&w=600&q=80',
      alt: 'Description for Image 3',
      title: 'Title 3'
    });
    this.images.push({
      source:
        'https://media.istockphoto.com/photos/idyllic-home-with-covered-porch-picture-id479767332?k=6&m=479767332&s=612x612&w=0&h=sOZeUL84YCIEjpDFiaBg5Wb0sQt14L5kY81smoQJCu0=',
      alt: 'Description for Image 4',
      title: 'Title 4'
    });
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