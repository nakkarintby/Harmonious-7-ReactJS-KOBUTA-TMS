'use client'
export interface Root {
  status: string
  data: Data
  error: any
}

export interface Data {
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

