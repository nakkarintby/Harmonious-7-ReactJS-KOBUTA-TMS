'use client'
import { AuthenticatedTemplate } from "@azure/msal-react"
import { ThemeProvider } from "@mui/material"
import defaultTheme from "../ShipmentStatusUpdate/props/Theme"
import NavbarMenuTheme from "../props/MenuThemeProps/NavbarMenuTheme"
import UsersTable from "./Props/UserTable"

export default function Users () {
    return (
<>
    <AuthenticatedTemplate>
        <ThemeProvider theme={defaultTheme}>
            <div className="UserBoxPage">
                <div className="NavBoxGlobal">
                <NavbarMenuTheme CanPreviousBack={true}/>
                </div>
                <div className="User-main-block">
                    <div className="User-header-content">
                    </div>
                    <div>
                        <UsersTable/>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    </AuthenticatedTemplate>
</>
)
}
