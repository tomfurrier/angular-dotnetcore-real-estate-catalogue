import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRealEstateComponent } from './edit-real-estate.component';

describe('EditRealEstateComponent', () => {
  let component: EditRealEstateComponent;
  let fixture: ComponentFixture<EditRealEstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRealEstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRealEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
