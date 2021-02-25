import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuardiaPage } from './guardia.page';

describe('GuardiaPage', () => {
  let component: GuardiaPage;
  let fixture: ComponentFixture<GuardiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardiaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuardiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
