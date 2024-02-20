'use client'
import { AuthenticatedTemplate } from "@azure/msal-react"
import { ThemeProvider } from "@mui/material"
import defaultTheme from "../ShipmentStatusUpdate/props/Theme"
import NavbarMenuTheme from "../props/MenuThemeProps/NavbarMenuTheme"
import DatatableUsers from "../components/datatable_users/DatatableUsers"

export default async function Users() {
    return (
        <>
            <AuthenticatedTemplate>
                <ThemeProvider theme={defaultTheme}>
                    <div className="UserBoxPage">
                        <div className="NavBoxGlobal">
                            <NavbarMenuTheme CanPreviousBack={true} />
                        </div>
                        <DatatableUsers />
                    </div>
                </ThemeProvider>
            </AuthenticatedTemplate>
        </>
    )
}
