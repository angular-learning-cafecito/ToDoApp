import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropConnectedComponent } from './drop-connected.component';

describe('DropConnectedComponent', () => {
  let component: DropConnectedComponent;
  let fixture: ComponentFixture<DropConnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropConnectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
