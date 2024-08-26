import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplicheListComponent } from './repliche-list.component';

describe('ReplicheListComponent', () => {
  let component: ReplicheListComponent;
  let fixture: ComponentFixture<ReplicheListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReplicheListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReplicheListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
