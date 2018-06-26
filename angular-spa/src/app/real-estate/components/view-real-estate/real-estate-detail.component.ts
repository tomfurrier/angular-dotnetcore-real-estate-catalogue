import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { RealEstate } from '../../../shared/api-client';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-real-estate-detail',
  templateUrl: './real-estate-detail.component.html',
  styleUrls: ['./real-estate-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RealEstateDetailComponent implements OnInit {
  @Input() realEstate: RealEstate;
  @Input() inCollection: boolean;
  @Output() add = new EventEmitter<RealEstate>();
  @Output() remove = new EventEmitter<RealEstate>();

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
    //console.log('gmapsurl: ' + urlString);
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

  ngOnInit(): void {
    this.setImages();
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

  constructor(private domSanitizer: DomSanitizer) {}
}
