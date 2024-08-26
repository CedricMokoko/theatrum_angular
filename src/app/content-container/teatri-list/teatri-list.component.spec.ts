import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeatriListComponent } from './teatri-list.component';

describe('TeatriListComponent', () => {
  let component: TeatriListComponent;
  let fixture: ComponentFixture<TeatriListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeatriListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeatriListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
