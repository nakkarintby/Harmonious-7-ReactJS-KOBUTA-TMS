'use client'
import { ThemeProvider } from '@emotion/react'
import './style.scss'
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



export default function Home() {
    const router = useRouter()
    const { instance, inProgress } = useMsal();



    return (
        <AuthenticatedTemplate>
            <ThemeProvider theme={defaultTheme}>
                <NavbarMenuTheme CanPreviousBack={false} />
                <div className="menu-main-block">
                    <div className='menu-button-group'>
                        <div style={{ margin: "10px" }}>
                            <a> <button className='menu-button-props' onClick={() => router.push('Users')}>ข้อมูลผู้ใช้</button></a>
                        </div>
                        <div style={{ margin: "10px" }}>
                            <a> <button className='menu-button-props' onClick={() => router.push('Roles')}>บทบาทผู้ใช้</button></a>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </AuthenticatedTemplate>
    )
}

