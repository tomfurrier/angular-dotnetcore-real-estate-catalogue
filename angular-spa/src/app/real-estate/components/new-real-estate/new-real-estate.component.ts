import { Component, OnInit } from '@angular/core';
import { RealEstateType } from '../../real-estate-type';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

import * as fromRealEstates from '../../reducers';
import { Store } from '@ngrx/store';
import * as CollectionActions from '../../actions/collection.actions';
import { RealEstate } from '../../../shared/api-client';

@Component({
  selector: 'app-new-real-estate',
  templateUrl: './new-real-estate.component.html',
  styleUrls: ['./new-real-estate.component.css']
})
export class NewRealEstateComponent implements OnInit {
  realEstateTypes = RealEstateType;
  newRealEstateFirstForm: FormGroup;
  newRealEstateSecondForm: FormGroup;
  newRealEstateThirdForm: FormGroup;
  newRealEstateFourthForm: FormGroup;

  constructor(private store: Store<fromRealEstates.State>) {}

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.newRealEstateFirstForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      realEstateType: new FormControl('', [Validators.required]),
      intent: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    });

    this.newRealEstateSecondForm = new FormGroup({
      zipCode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      district: new FormControl(''),
      street: new FormControl('', [Validators.required]),
      addressNum: new FormControl('', [Validators.required])
    });

    this.newRealEstateThirdForm = new FormGroup({
      floorArea: new FormControl('', [Validators.required]),
      lotSize: new FormControl(''),
      roomCount: new FormControl('', [Validators.required]),
      newlyBuilt: new FormControl(''),
      constructionYear: new FormControl('')
    });

    this.newRealEstateFourthForm = new FormGroup({});
  }

  save(): void {
    const newRealEstate = {
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
    } as RealEstate;

    console.log('save');

    this.store.dispatch(new CollectionActions.AddRealEstate(newRealEstate));
  }
}
