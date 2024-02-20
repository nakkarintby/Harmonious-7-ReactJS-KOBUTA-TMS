'use client'
export interface GetRole {
  status: string
  data: Role 
  error: any
}

export interface Role  {
  systemRoleId: number
  name: string
  createdBy: string
  createdOn: string
  modifiedBy: any
  modifiedOn: any
}
