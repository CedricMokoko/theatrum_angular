import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpettacoliListComponent } from './spettacoli-list.component';

describe('SpettacoliListComponent', () => {
  let component: SpettacoliListComponent;
  let fixture: ComponentFixture<SpettacoliListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpettacoliListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpettacoliListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
