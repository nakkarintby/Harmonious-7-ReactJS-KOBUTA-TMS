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
    /* for (var value of source) {
        let Capsule:MenuApp = 
        { CanCheckCreate: value["canCheckCreate"],
          CanCheckDelete: value["canCheckDelete"],
          CanCheckDisplay: value["canCheckDisplay"],
          CanCheckEdit: value["canCheckEdit"],
          CanCheckPrint: value["canCheckPrint"],
          Code: value["code"],
          Href: value["href"],
          Icon: value["icon"],
          IsGrphd: value["isGrphd"],
          MenuGroup: value["menuGroup"],
          MenuId: value["menuId"],
          NameEN: value["nameEN"],
          NameTH: value["nameTH"],
          RefCode: value["refCode"],
          Seq: value["seq"],
          Visible: value["visible"]
        }
        InjectTer.push(Capsule)
    } */
    return InjectTer 
}

