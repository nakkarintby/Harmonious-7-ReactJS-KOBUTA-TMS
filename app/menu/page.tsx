'use client'
import { ThemeProvider } from '@emotion/react'
import './props/style.css'
import defaultTheme from '../ShipmentStatusUpdate/props/Theme'
import { AuthenticatedTemplate, useMsal } from '@azure/msal-react'
import { MenuApp, MenuAppConvert } from '../constant/Menu/MenuObj'
import { CallHttp } from '../api/ApiCallPlateform'
import { IPublicClientApplication } from '@azure/msal-browser'
import React, { useCallback, useEffect, useRef } from 'react'
import NavbarMenuTheme from '../props/MenuThemeProps/NavbarMenuTheme'
import { MenuRole, MenuRoleConvert } from '../constant/MenuRole/MenuRoleObj'
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'


async function GetMenu(instance: IPublicClientApplication, router:AppRouterInstance) {
    var req = await CallHttp("/api/GetMenu", {method:"GET"}, router)
    let data:[] = req["response"]["data"]
    let MenuData:MenuApp[] = []
    for(let i=0; i < data.length; i++) {
        let Injecter:MenuApp = MenuAppConvert(data[i])
        MenuData.push(Injecter)
    }
    return MenuData
}
async function GetMenuRole(instance: IPublicClientApplication, router:AppRouterInstance) {
    let MenuRoleUser:MenuRole[] = []
    let req = await CallHttp("/api/GetMenuRole", {method:"GET"}, router)
    console.log(req)
    let data:[] = req["response"]["data"]
    for(let i=0; i < data.length; i++) {
        var injecter:MenuRole = await MenuRoleConvert(data[i]);
        MenuRoleUser.push(injecter)
    } 
    return MenuRoleUser
}

export default function Home() {
    const router = useRouter()
    const { instance, inProgress } = useMsal();
    let [ Menu, setMenu ] = React.useState<MenuApp[]>()
    let [ MenuRoles, setMenuRole ] = React.useState<MenuRole[]>()
    const handleLoop = useCallback(()=>{},[])
    useEffect(()=>{
        const FetchMenu = async () => {
            let result = await GetMenu(instance, router)
            setMenu(result)
        }
        FetchMenu()
    },[router])
    return(
<AuthenticatedTemplate>
    <ThemeProvider theme={defaultTheme}>
        <NavbarMenuTheme CanPreviousBack={false}/>
        <div className="menu-main-block">
            <div className='menu-button-group'>
                { Menu?.map((row, index)=>{
                    if(row.actionDisplay === true && row.canCheckDisplay === true){
                        return(
                            <div key={index}>
                                <a href={`${row.href}`} key={index} >
                                    <button className='menu-button-props' onClick={async()=>{}} key={index}>
                                        {row.nameTH}
                                    </button>
                                </a>
                            </div>)
                    }
                })}
              
            </div>
        </div>
    </ThemeProvider>
</AuthenticatedTemplate>
)
}

