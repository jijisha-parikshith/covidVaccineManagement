import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationlistComponent } from './vaccinationlist.component';

describe('VaccinationlistComponent', () => {
  let component: VaccinationlistComponent;
  let fixture: ComponentFixture<VaccinationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
