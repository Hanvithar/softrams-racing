
export interface MemberWithId {
    id: number,
    member: Member
}
export interface Member {
    firstName: string;
    lastName: string;
    jobTitle: string;
    team: string;
    status: string;
  }