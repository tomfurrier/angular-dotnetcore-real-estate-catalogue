import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { RealEstateType } from '../../real-estate/real-estate-type';

@Component({
  selector: 'app-real-estate-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  realEstateTypes = RealEstateType;
  searchForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      realEstateType: new FormControl(''),
      addressText: new FormControl(''),
      price: new FormControl('')
    });
  }
}
