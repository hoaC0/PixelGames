import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesMainComponent } from './games-main.component';

describe('GamesMainComponent', () => {
  let component: GamesMainComponent;
  let fixture: ComponentFixture<GamesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
