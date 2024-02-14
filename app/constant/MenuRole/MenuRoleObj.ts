
export interface MenuRole {
    systemRoleId:string
    menuRoleId:string,
    menuId:string,
    canDisplay:boolean,
    canCreate:boolean,
    canEdit:boolean,
    canDelete:boolean,
    canPrint:boolean
}

export async function MenuRoleConvert (source:any) {
    let SourceSlice = source
    let InjectTer:MenuRole = 
    {
        systemRoleId: SourceSlice["systemRoleId"],
        menuRoleId: SourceSlice["menuRoleId"],
        menuId: SourceSlice["menuId"],
        canDisplay: SourceSlice["canDisplay"],
        canCreate: SourceSlice["canCreate"],
        canEdit: SourceSlice["canEdit"],
        canDelete: SourceSlice["canDelete"],
        canPrint: SourceSlice["canPrint"],
    }
    return InjectTer
}