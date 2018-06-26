import { Component, OnInit, Input } from '@angular/core';
import { RealEstateType } from '../../../real-estate-type';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import * as fromRealEstates from '../../../reducers';
import { Store } from '@ngrx/store';
import { storage } from 'firebase';
import { Subject } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { RealEstate } from '../../../../shared/api-client';
import * as CollectionActions from '../../../actions/collection.actions';

interface MediaUrl {
  type: string;
  url: string;
}

@Component({
  selector: 'app-real-estate-edit',
  templateUrl: './real-estate-edit.component.html',
  styleUrls: ['./real-estate-edit.component.css']
})
export class RealEstateEditComponent implements OnInit {
  @Input() realEstate: RealEstate;

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
  previewMediaUrl: MediaUrl;

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

  async uploadPreviewImage(event) {
    const filesToUpload: File[] = event.target.files;
    const downloadURLs = await this.uploadFilesToFirestore(filesToUpload);
    this.previewMediaUrl = { type: 'image', url: downloadURLs[0] };
  }

  async upload(event) {
    const filesToUpload: File[] = event.target.files;
    const downloadURLs = await this.uploadFilesToFirestore(filesToUpload);
    this.mediaUrls = downloadURLs.map(u => {
      return { type: 'image', url: u };
    });
  }

  async uploadFilesToFirestore(filesToUpload: File[]): Promise<string[]> {
    const fileUrls: string[] = [];
    this.imageUploadsInProgressNum = filesToUpload.length;

    for (const file of filesToUpload) {
      const randomId = Math.random()
        .toString(36)
        .substring(2);
      const ref = this.afStorage.ref(randomId);

      const uploadedFile = await ref
        .put(file)
        .catch(err => console.log(`upload error: ${err}`));

      const downloadURL = await uploadedFile.ref
        .getDownloadURL()
        .catch(err => console.log(`getDownloadURL error: ${err}`));

      fileUrls.push(downloadURL);
      this.imageUploadsInProgressNum--;
    }

    return fileUrls;
  }

  get imageUploadInProgress() {
    return this.imageUploadsInProgressNum > 0;
  }

  get hasUploadedImage() {
    return this.mediaUrls.length > 0;
  }
}
