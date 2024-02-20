'use client'
import { AuthenticatedTemplate } from "@azure/msal-react"
import { ThemeProvider } from "@mui/material"
import defaultTheme from "../ShipmentStatusUpdate/props/Theme"
import NavbarMenuTheme from "../props/MenuThemeProps/NavbarMenuTheme"
import DatatableRoles from "../components/datatable_roles/DatatableRoles"


export default async function Roles() {
    return (
        <>
            <AuthenticatedTemplate>
                <ThemeProvider theme={defaultTheme}>
                    <div className="UserBoxPage">
                        <div className="NavBoxGlobal">
                            <NavbarMenuTheme CanPreviousBack={true} />
                        </div>
                        <DatatableRoles />
                    </div>
                </ThemeProvider>
            </AuthenticatedTemplate>
        </>
    )
}
