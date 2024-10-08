'use client'
export interface GetUser {
  status: string
  data: User 
  error: any
}

export interface User  {
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

