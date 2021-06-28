import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { AppService } from './app.service';

import { HttpClientModule } from '@angular/common/http';
import { Member, MemberWithId } from '../app/models/memberData.interface';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, Http, ResponseOptions} from '@angular/http';

describe('AppService', () => {
  let appService: AppService;
  let backend: MockBackend;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppService, 
        MockBackend, 
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend,BaseRequestOptions]
        }
      ],
      imports: [HttpClientModule]
    });
    backend = TestBed.get(MockBackend);
    appService = TestBed.get(AppService);
  });

  it('should set user name', fakeAsync(() => {
    let fakeUSerName = 'admin';
    backend.connections.subscribe((connection)=> {
      connection.mockRespond(new ResponseOptions({
        body: JSON.stringify(fakeUSerName)
      }))
    })
    appService.setUsername('admin');
    expect(appService.username).toBe('admin');
  }));
});
