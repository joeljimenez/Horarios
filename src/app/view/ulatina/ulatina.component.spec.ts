import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UlatinaComponent } from './ulatina.component';

describe('UlatinaComponent', () => {
  let component: UlatinaComponent;
  let fixture: ComponentFixture<UlatinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UlatinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UlatinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
