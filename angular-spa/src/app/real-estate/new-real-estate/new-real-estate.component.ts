import { Component, OnInit } from '@angular/core';
import { RealEstateType } from '../real-estate-type';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

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
  constructor() {}

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

  save(): void {}
}
