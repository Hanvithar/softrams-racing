import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Member } from '../app/models/memberData.interface';



@Injectable({
  providedIn: 'root'
})
export class AppService {
  api = 'http://localhost:8000';
  username: string;
  memberDetailPage = false;
  staticTeamsData = [];

  constructor(private http: HttpClient) {
    this.getTeams().subscribe((teamsData) => {
      this.staticTeamsData = teamsData;
    });
  }

  // Returns all members
  getMembers() {
    return this.http
      .get(`${this.api}/api/members`)
      .pipe(catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
  }

  addMember(memberForm: Member) {
    const headers = { 'Content-Type': 'application/json'};
    return this.http
      .post(`${this.api}/api/addMember`, memberForm, {headers})
      .pipe(catchError(this.handleError));
  }

  getTeams() {
    return this.http
      .get(`${this.api}/api/teams`)
      .pipe(catchError(this.handleError));
  }

  getMemberById(memberId: number) {
    return this.http
      .get(`${this.api}/api/members/` + memberId)
      .pipe(catchError(this.handleError));
  }

  updateMemberById(memberId: number, memberDetails: Member) {
    const headers = { 'Content-Type': 'application/json'};
    return this.http
      .put(`${this.api}/api/updateMember/` + memberId, memberDetails, {headers})
      .pipe(catchError(this.handleError));
  }

  deleteMemberById(memberId: number) {
    const headers = { 'Content-Type': 'application/json'};
    return this.http
      .delete(`${this.api}/api/deleteMember/` + memberId, {headers})
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
