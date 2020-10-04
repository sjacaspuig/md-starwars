import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarshipsService } from 'src/app/shared/services/starships.service';
import { ShipsComponent } from './ships.component';

describe('ShipsComponent', () => {
  let component: ShipsComponent;
  let fixture: ComponentFixture<ShipsComponent>;
  let starshipsService: StarshipsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ ShipsComponent ],
      providers: [ StarshipsService ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ShipsComponent);
    component = fixture.componentInstance;
    starshipsService = TestBed.get(StarshipsService);
    fixture.detectChanges();
  });


  it('should get the data of starshipsService without url', (done) => {
      starshipsService.getAllStarshipsByUrl(null).subscribe(() => {
        expect(component.nextPage).toEqual('http://swapi.dev/api/starships/?page=2');
        expect(component.nextPage).toBeNull();
        done();
      })
  });

  it('should get the data of starshipsService with url', (done) => {
    starshipsService.getAllStarshipsByUrl('https://swapi.dev/api/starships/?page=2').subscribe(() => {
      expect(component.nextPage).toEqual('http://swapi.dev/api/starships/?page=3');
      expect(component.nextPage).toEqual('http://swapi.dev/api/starships/?page=1');
      done();
    })
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
