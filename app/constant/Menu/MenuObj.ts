'use client'

import { Menu } from "@mui/icons-material"

export interface MenuApp {
    userId: number
    userName: string
    transportId: string
    systemRoleId: number
    systemRoleName: string
    menuId: number
    code: string
    nameTH: string
    nameEN: string
    icon: string|undefined
    href: string
    visible: boolean
    refCode: string|undefined
    isGrpHd: boolean
    menuGroup : string
    canCheckDisplay: boolean
    canCheckCreate: boolean
    canCheckEdit: boolean
    canCheckDelete: boolean
    canCheckPrint: boolean
    seq: number
    actionDisplay: boolean
    actionCreate: boolean
    actionEdit: boolean
    actionDelete: boolean
    actionPrint: boolean
}

export function MenuAppConvert (source:any) {
    let SourceSlice = source
    let InjectTer:MenuApp = SourceSlice as MenuApp
    return InjectTer 
}

