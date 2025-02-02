export enum UserRole {
  LEADER = 'LEADER',
  SENIOR = 'SENIOR',
  MEMBER = 'MEMBER',
  JUNIOR = 'JUNIOR'
}

export type User = {
  id: string;
  name: string;
  teamId: string;
  role: UserRole;
}

export type Team = {
  id: string;
  name: string;
} 