import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Member, MemberWithId } from '../models/memberData.interface';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  addMember: FormGroup;
  teams = [];
  memberID: number = 0;
  memberData: any;

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.appService.getTeams().subscribe((teamsData) => {
      this.teams = teamsData;
    });
    this.appService.memberDetailPage = true;
    const memberData = this.route.paramMap.subscribe((data) => {
     this.memberID = parseInt(data['params'].memberId);
     if(this.memberID !== 0) {
      this.appService.getMemberById(this.memberID).subscribe((memberData: Member) => {
        this.addMember.patchValue(
          {firstName: memberData.firstName,
          lastName: memberData.lastName,
          jobTitle: memberData.jobTitle,
          team: memberData.team,
          status: memberData.status});
      });
     }

    });
    this.addMember = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      team: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  ngOnChanges() {}

  // TODO: Add member to members
  onSubmit() {
    this.memberModel = this.addMember.value;
    if(this.memberID === 0) {
      this.appService.addMember(this.memberModel).subscribe((response: MemberWithId) => {
        this.router.navigate(['/members']);
      });
    } else {
      this.appService.updateMemberById(this.memberID, this.memberModel).subscribe((response: MemberWithId) => {
        this.router.navigate(['/members']);
      });
    }
  }
}
