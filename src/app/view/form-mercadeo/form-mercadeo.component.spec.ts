import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMercadeoComponent } from './form-mercadeo.component';

describe('FormMercadeoComponent', () => {
  let component: FormMercadeoComponent;
  let fixture: ComponentFixture<FormMercadeoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMercadeoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMercadeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
