'use client'
interface GetListUser{
  status: string;
  data: ListUser[];
  error?: any;
}
interface ListUser {
  userId: number;
  userName: string;
  transporterId: string;
  systemRoleId: number;
  systemRoleName?: any;
  isDeleted: boolean;
  createdBy: string;
  createdOn: string;
  modifiedBy?: any;
  modifiedOn?: any;
}