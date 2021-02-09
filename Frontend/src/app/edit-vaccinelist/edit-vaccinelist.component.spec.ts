import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVaccinelistComponent } from './edit-vaccinelist.component';

describe('EditVaccinelistComponent', () => {
  let component: EditVaccinelistComponent;
  let fixture: ComponentFixture<EditVaccinelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVaccinelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVaccinelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
