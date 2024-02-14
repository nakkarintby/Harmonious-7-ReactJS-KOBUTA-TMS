import NavbarMenuTheme from "./NavbarMenuTheme";
import './style.css'

export default function MenuTheme({ children }:{children: React.ReactNode}) {
    return(
    <div className="MenuTheme">
        {/* <NavbarMenuTheme/> */}
        { children }
    </div>)
}