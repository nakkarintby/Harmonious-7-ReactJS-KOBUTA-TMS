'use client'
export interface GetRoleList {
  status: string
  data: RoleList
  error: any
}

export interface RoleList {
  userId: number
  userName: string
  transporterId: string
  systemRoleId: number
  systemRoleName: any
  status: boolean
  title: any
  firstName: any
  lastName: any
  email: any
  isDeleted: boolean
  createdBy: string
  createdOn: string
  modifiedBy: any
  modifiedOn: any
}

