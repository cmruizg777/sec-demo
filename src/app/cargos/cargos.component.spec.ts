import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CargosComponent } from './cargos.component';

describe('CargosComponent', () => {
  let component: CargosComponent;
  let fixture: ComponentFixture<CargosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
