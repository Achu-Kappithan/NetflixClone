import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCorosalComponent } from './movie-corosal.component';

describe('MovieCorosalComponent', () => {
  let component: MovieCorosalComponent;
  let fixture: ComponentFixture<MovieCorosalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCorosalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCorosalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
