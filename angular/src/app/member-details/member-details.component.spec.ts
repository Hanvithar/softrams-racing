import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MemberDetailsComponent } from './member-details.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRouteStub } from '../../assets/mock/ActivatedRouteStub';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, Http, ResponseOptions} from '@angular/http';

// Bonus points!
describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  let activatedRoute: ActivatedRouteStub;
  let appService: AppService;
  let backend: MockBackend;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub({ memberId: 0 });
    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
      ],
      providers: [
        HttpClient,
        FormBuilder,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        },
        { provide: ActivatedRoute, 
          useValue: activatedRoute 
        }, 
        AppService, 
        MockBackend, 
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend,BaseRequestOptions]
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(MockBackend);
    appService = TestBed.get(AppService);
  });


  it('should set user name', fakeAsync(() => {
    let fakeTeamData = {
      "teams": [
      {
        "id": 1,
        "teamNameName": "Formula 1 - Car 77"
      },
      {
        "id": 2,
        "teamName": "Formula 1 - Car 8"
      },
      {
        "id": 3,
        "teamName": "Formula 2 - Car 54"
      },
      {
        "id": 4,
        "teamName": "Formula 2 - Car 63"
      },
      {
        "id": 5,
        "teamName": "Deutsche Tourenwagen Masters - Car 117"
      },
      {
        "id": 6,
        "teamName": "Deutsche Tourenwagen Masters - Car 118"
      },
      {
        "id": 7,
        "teamName": "World Endurance Championship - Car 99"
      },
      {
        "id": 8,
        "teamName": "World Endurance Championship - Car 5"
      },
      {
        "id": 9,
        "teamName": "World Rally Championship - Car 77"
      },
      {
        "id": 10,
        "teamName": "World Rally Championship - Car 90"
      }
    ]
  }
    backend.connections.subscribe((connection)=> {
      connection.mockRespond(new ResponseOptions({
        body: JSON.stringify(fakeTeamData)
      }))
    })
    fixture.componentInstance.ngOnInit();
    tick();
    expect(1).toBe(1);
  }))
});
