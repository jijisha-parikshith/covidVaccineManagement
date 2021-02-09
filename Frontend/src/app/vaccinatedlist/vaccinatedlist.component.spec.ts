import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinatedlistComponent } from './vaccinatedlist.component';

describe('VaccinatedlistComponent', () => {
  let component: VaccinatedlistComponent;
  let fixture: ComponentFixture<VaccinatedlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinatedlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinatedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
