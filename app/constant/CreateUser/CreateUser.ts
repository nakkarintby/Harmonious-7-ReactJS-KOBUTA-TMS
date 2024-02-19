'use client'
export interface CreateUser {
  userName: string;
  transporterId: string;
  systemRoleId: number;
  systemRoleName: string;
  isDeleted: boolean;
  employeeNo: string;
  plantId: number;
  role: string;
  status: boolean;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
}