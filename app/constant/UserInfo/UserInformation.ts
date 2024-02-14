'use client'
export interface UserInformation {
    userId:number
    userName:string
    transporterId:string
    systemRoleId:number
    employeeNo:number|undefined
    plantId:number
    role:string
    status:boolean
    title:string
    firstName:string
    lastName:string
    email:string
    createdBy:string
    createdOn:string
    modifiedBy:string
    modifiedOn:string
}

export function UserInformationConvert (source:any) {
    let SourceSlice = source
    let InjectTer:UserInformation = 
    {
        userId: SourceSlice["userId"],
        userName: SourceSlice["userName"],
        transporterId: SourceSlice["transporterId"],
        systemRoleId: SourceSlice["systemRoleId"],
        employeeNo: SourceSlice["employeeNo"],
        plantId: SourceSlice["plantId"],
        role: SourceSlice["role"],
        status: SourceSlice["status"],
        title: SourceSlice["title"],
        firstName: SourceSlice["firstName"],
        lastName: SourceSlice["lastName"],
        email: SourceSlice["email"],
        createdBy: SourceSlice["createdBy"],
        createdOn: SourceSlice["createdOn"],
        modifiedBy: SourceSlice["modifiedBy"],
        modifiedOn: SourceSlice["modifiedOn"]
    }
    return InjectTer 
}
