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
import { storage } from 'firebase';
import { Observable, Subject } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import * as UI from '../../../shared/ui.actions';

interface MediaUrl {
  type: string;
  url: string;
}

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

  task: storage.UploadTask;
  uploadProgress: Subject<number>;
  downloadURL: string;

  imageUploadsInProgressNum: number;

  mediaUrls: MediaUrl[] = [];

  constructor(
    private store: Store<fromRealEstates.State>,
    private afStorage: AngularFireStorage
  ) {}

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
      title: this.newRealEstateFirstForm.get('title').value,

      description: this.newRealEstateFirstForm.get('description').value,
      realEstateType: this.newRealEstateFirstForm.get('realEstateType').value,
      intent: this.newRealEstateFirstForm.get('intent').value,
      price: this.newRealEstateFirstForm.get('price').value,
      zipCode: this.newRealEstateSecondForm.get('zipCode').value,
      city: this.newRealEstateSecondForm.get('city').value,
      district: this.newRealEstateSecondForm.get('district').value,
      street: this.newRealEstateSecondForm.get('street').value,
      addressNum: this.newRealEstateSecondForm.get('addressNum').value,
      floorArea: this.newRealEstateThirdForm.get('floorArea').value,
      lotSize: this.newRealEstateThirdForm.get('lotSize').value,
      roomCount: this.newRealEstateThirdForm.get('roomCount').value,
      newlyBuilt: this.newRealEstateThirdForm.get('newlyBuilt').value,
      constructionYear: this.newRealEstateThirdForm.get('constructionYear')
        .value,
      mediaUrls: this.mediaUrls
    } as RealEstate;

    this.store.dispatch(new CollectionActions.AddRealEstate(newRealEstate));
  }

  async upload(event) {
    const randomId = Math.random()
      .toString(36)
      .substring(2);
    const ref = this.afStorage.ref(randomId);

    // clear array
    this.mediaUrls = [];

    // this.uploadProgress.next(0);

    this.imageUploadsInProgressNum = event.target.files.length;

    for (const file of event.target.files) {
      this.store.dispatch(new UI.StartLoading());

      const uploadedFile = await ref
        .put(file)
        .catch(err => console.log(`upload error: ${err}`));

      const downloadURL = await uploadedFile.ref
        .getDownloadURL()
        .catch(err => console.log(`getDownloadURL error: ${err}`));

      this.mediaUrls.push({ type: 'image', url: downloadURL });
      this.imageUploadsInProgressNum--;
      this.store.dispatch(new UI.StopLoading());
    }
  }

  get imageUploadInProgress() {
    return this.imageUploadsInProgressNum > 0;
  }

  get hasUploadedImage() {
    return this.mediaUrls.length > 0;
  }
}
