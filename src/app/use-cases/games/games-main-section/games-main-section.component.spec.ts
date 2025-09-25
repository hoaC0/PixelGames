import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesMainSectionComponent } from './games-main-section.component';

describe('GamesMainSectionComponent', () => {
  let component: GamesMainSectionComponent;
  let fixture: ComponentFixture<GamesMainSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesMainSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesMainSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
