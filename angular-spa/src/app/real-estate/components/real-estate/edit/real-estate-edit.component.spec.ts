import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateEditComponent } from './real-estate-edit.component';

describe('NewRealEstateComponent', () => {
  let component: RealEstateEditComponent;
  let fixture: ComponentFixture<RealEstateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RealEstateEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
