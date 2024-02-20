'use client'
import { AuthenticatedTemplate, useMsal } from "@azure/msal-react"
import { ThemeProvider } from "@mui/material"
import defaultTheme from "../ShipmentStatusUpdate/props/Theme"
import NavbarMenuTheme from "../props/MenuThemeProps/NavbarMenuTheme"
import "./page.scss";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/add';
import { useRouter } from "next/navigation"
import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Box
} from "@material-ui/core";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CallHttp } from "../api/ApiCallPlateform"
import { useEffect, useState } from "react"
import { GetTokenCookie } from "../action/cookies"
import { UserInformation } from "../constant/UserInfo/UserInformation"
import React from "react"
import { Stack, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { CreateRole } from "../constant/CreateRole/CreateRole"

async function GetToken(router: AppRouterInstance) {
  var req = await CallHttp("/api/GetToken", { method: "GET" }, router)
  var token = req["response"]["value"]
  return token;
}


const CreateRole = () => {
  const [cookie, setCookie] = useState('')
  const router = useRouter();
  const [shrink, setShrink] = useState(false);
  const [roleName, setRoleName] = useState('')
  const [transporterId, setTransporterId] = useState('')
  const [roleId, setRoleId] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadingToggle();
    const response = async () => {
      let result = await GetToken(router)
      setCookie(result);
    }
    response()
  }, [])


  const LoadingRequest = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            ''
          );
        }, 1500);
      });
  };

  const loadingToggle = async () => {
    setIsLoading(true);
    await LoadingRequest();
    setIsLoading(false);
  };



  const handleChangeRoleName = (e: any) => {
    e.preventDefault();
    setRoleName(e.target.value);
  };


  async function CreateRole() {
    const modal: CreateRole = {
      name: '1'
    };

    if (modal != undefined) {
      modal.name = roleName
    }

    fetch('https://d736apsi01-wa02skc.azurewebsites.net/User/CreateSystemRole', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cookie}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(modal)
    })
      .then(async (res) => {
        console.log('Create Role Success')
        router.back()
      })
      .catch((data) => {
      });

  };


  return (
    <>
        <div style={{ display: isLoading ? 'flex' : 'none' }} className='loading-toggle'>
        <div className='loading-toggle-content'>
          <div className='loading-toggle-pic'></div>
          <div className='loading-toggle-text'>Loading...</div>
        </div>
      </div>
      <Card className="card-edit">
        <CardContent>
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "center",
              width: "90%",
              maxWidth: "20rem",
              mx: "auto",

              rowGap: 3
            }}
          >
            <div className="card-edit-header">
              <h1>Create Role</h1>
            </div>
            <TextField
              onFocus={() => setShrink(true)}
              onBlur={(e) => setShrink(!!e.target.value)}
              InputLabelProps={{ shrink: true }}
              name="rolename"
              label="Rolename"
              /*InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                )
              }}*/
              variant="outlined"
              value={roleName}
              onChange={handleChangeRoleName}
              fullWidth
            />



            <div className="card-edit-button">
              <Button style={{ marginRight: '15px', background: 'red' }} className="card-edit-button-1" variant="contained" onClick={() => router.back()} >CANCLE</Button>
              <Button style={{ marginRight: '15px', background: 'green' }} className="card-edit-button-2" variant="contained" onClick={CreateRole} endIcon={<AddIcon />} >CREATE</Button>
            </div>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

export default CreateRole;

