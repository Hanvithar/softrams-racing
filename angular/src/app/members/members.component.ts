import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    this.appService.memberDetailPage = false;
    this.getMembers();
  }

  goToAddMemberForm() {
    this.router.navigate(['/member-detail', {memberId: 0}]);
  }

  editMemberByID(id: number) {
    this.router.navigate(['/member-detail', {memberId: id}]);
  }

  deleteMemberById(id: number) {
    this.appService.deleteMemberById(id).subscribe((data) => {
      this.getMembers();
    });
  }
  getMembers() {
    this.appService.getMembers().subscribe(members => (this.members = members));
  }
}
