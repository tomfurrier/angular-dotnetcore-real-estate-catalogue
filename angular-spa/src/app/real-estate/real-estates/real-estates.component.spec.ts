import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstatesComponent } from './real-estates.component';

describe('RealEstatesComponent', () => {
  let component: RealEstatesComponent;
  let fixture: ComponentFixture<RealEstatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealEstatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
