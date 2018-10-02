import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoViewComponent } from './ngo-view.component';

describe('NgoViewComponent', () => {
  let component: NgoViewComponent;
  let fixture: ComponentFixture<NgoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
