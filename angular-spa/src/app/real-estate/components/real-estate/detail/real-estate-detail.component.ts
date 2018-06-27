import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../../environments/environment';
import { RealEstate } from '../../../../shared/api-client';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../app.reducer';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ConfirmDeleteDialogComponent } from './confirm-delete.component';
import * as CollectionActions from '../../../actions/collection.actions';

@Component({
  selector: 'app-real-estate-detail',
  templateUrl: './real-estate-detail.component.html',
  styleUrls: ['./real-estate-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RealEstateDetailComponent implements OnInit {
  @Input() realEstate: RealEstate;

  /**
   * Tip: Utilize getters to keep templates clean
   */
  get id() {
    return this.realEstate ? this.realEstate.id : 0;
  }

  get title() {
    return this.realEstate ? this.realEstate.title : '';
  }

  get description() {
    return this.realEstate ? this.realEstate.description : '';
  }

  get price() {
    return this.realEstate ? this.realEstate.price : '';
  }

  get floorArea() {
    return this.realEstate ? this.realEstate.floorArea : '';
  }

  get district() {
    return this.realEstate ? this.realEstate.district : '';
  }

  get city() {
    return this.realEstate ? this.realEstate.city : '';
  }

  get street() {
    return this.realEstate ? this.realEstate.street : '';
  }

  get googleMapsUrl() {
    const baseUrl = `https://www.google.com/maps/embed/v1/place?key=${
      environment.googleMapsApiKey
    }`;
    let urlString = `${baseUrl}${this.city},${this.street},${this.addressNum}`;
    urlString = urlString.split(' ').join('+');
    return this.domSanitizer.bypassSecurityTrustResourceUrl(urlString);
  }

  get addressNum() {
    return this.realEstate ? this.realEstate.addressNum : 0;
  }

  get constructionYear() {
    return this.realEstate ? this.realEstate.constructionYear : 0;
  }

  get intent() {
    return this.realEstate ? this.realEstate.intent : '';
  }

  get lotSize() {
    return this.realEstate ? this.realEstate.lotSize : 0;
  }

  get newlyBuilt() {
    return this.realEstate ? this.realEstate.newlyBuilt : true;
  }

  get realEstateType() {
    return this.realEstate ? this.realEstate.realEstateType : 0;
  }

  get roomCount() {
    return this.realEstate ? this.realEstate.roomCount : 0;
  }

  get zipCode() {
    return this.realEstate ? this.realEstate.zipCode : 0;
  }

  images: any[];
  isAuth$: Observable<boolean>;

  ngOnInit(): void {
    this.setImages();
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  private setImages() {
    const imageUrls = [];

    if (this.realEstate) {
      for (const url of this.realEstate.mediaUrls) {
        imageUrls.push({
          source: url.url,
          alt: 'Ingatlan kép',
          title: ''
        });
      }
    }
    console.log('images: ' + JSON.stringify(imageUrls));
    this.images = imageUrls;
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      height: '170px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === true) {
        this.store.dispatch(
          new CollectionActions.UpdateRealEstate({
            ...this.realEstate,
            isDeleted: true
          })
        );
      }
    });
  }

  constructor(
    private domSanitizer: DomSanitizer,
    private store: Store<fromRoot.State>,
    public dialog: MatDialog
  ) {}
}
