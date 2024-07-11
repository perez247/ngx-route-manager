import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRouteManagerComponent } from './ngx-route-manager.component';

describe('NgxRouteManagerComponent', () => {
  let component: NgxRouteManagerComponent;
  let fixture: ComponentFixture<NgxRouteManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxRouteManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxRouteManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
