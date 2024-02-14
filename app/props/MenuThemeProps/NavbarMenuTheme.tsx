'use client'
import './style.css'
import { useMsal } from '@azure/msal-react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button, Popover, Typography} from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { handleLogout } from '../../api/MSAuthentication/AuthClientHandle';
import { IPublicClientApplication } from '@azure/msal-browser';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export default function NavbarMenuTheme({CanPreviousBack}:{CanPreviousBack:boolean}){
    const router = useRouter()
    const { instance, inProgress } = useMsal();
    const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;
    return(
    <div className="NavBar">
        <ul className="NavLink-Group">
            <li className="NavLink-List">
                {CanPreviousBack === true ? (
                <>
                    <a onClick={()=>{router.back()}} className='NavLink-Text'>
                    <ArrowBackIosIcon sx={{ color: 'white', fontSize:32 }}/>
                    </a>
                </>) : (<></>)}
            </li>
            <li className="NavLink-List">
                <a aria-describedby={id} onClick={handleClick}>
                {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}> */}
                    <SettingsIcon sx={{ color: 'white', fontSize:32 }}/>
                {/* </Button> */}
                </a>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}>
                    <a onClick={()=>{router.push("/logout")}}>
                        <Typography sx={{ p: 2 }}>Logout</Typography>
                    </a>
                </Popover>
            </li>
        </ul>
    </div>)
}