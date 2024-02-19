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
import { Data } from "../constant/User/User"
import React from "react"
import { Stack, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { CreateUser } from "../constant/CreateUser/CreateUser"

async function GetToken(router: AppRouterInstance) {
  var req = await CallHttp("/api/GetToken", { method: "GET" }, router)
  var token = req["response"]["value"]
  return token;
}


const CreateUser = () => {
  const [cookie, setCookie] = useState('')
  const [user, setUser] = React.useState<CreateUser>()
  const router = useRouter();
  const [shrink, setShrink] = useState(false);
  const [userName, setUserName] = useState('')
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



  const handleChangeUserName = (e: any) => {
    e.preventDefault();
    setUserName(e.target.value);
  };

  const handleChangeTransporterId = (e: any) => {
    e.preventDefault();
    setTransporterId(e.target.value);
  };

  const handleChangeRoleId = (e: any) => {
    e.preventDefault();
    setRoleId(e.target.value);
  };

  async function SaveUserInfo() {
    const modal: CreateUser = {
      userName: '1',
      transporterId: '1',
      systemRoleId: 1,
      systemRoleName: '1',
      isDeleted: false,
      employeeNo: '1',
      plantId: 1,
      role: '1',
      status: true,
      title: '1',
      firstName: '1',
      lastName: '1',
      email: '1',
    };

    if (modal != undefined) {
      modal.userName = userName
      modal.transporterId = transporterId;
      modal.systemRoleId = parseInt(roleId)
      modal.systemRoleName = '1'
      modal.isDeleted = false;
      modal.employeeNo = '1'
      modal.plantId = 0,
        modal.role = '1'
      modal.status = true
      modal.title = '1'
      modal.firstName = '1'
      modal.lastName = '1'
      modal.email = '1'
    }
    console.log('------SET--------');
    console.log(JSON.stringify(modal));

    fetch('https://d736apsi01-wa02skc.azurewebsites.net/User/Create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cookie}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(modal)
    })
      .then(async (res) => {
        console.log('Create User Success')
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
              <h1>Create User</h1>
            </div>



            <TextField
              onFocus={() => setShrink(true)}
              onBlur={(e) => setShrink(!!e.target.value)}
              InputLabelProps={{ shrink: true }}
              name="username"
              label="Username"
              /*InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                )
              }}*/
              variant="outlined"
              value={userName}
              onChange={handleChangeUserName}
              fullWidth
            />

            <TextField
              onFocus={() => setShrink(true)}
              onBlur={(e) => setShrink(!!e.target.value)}
              InputLabelProps={{ shrink: true }}
              name="trasporterid"
              label="TrasporterId"
              /*InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                )
              }}*/
              variant="outlined"
              value={transporterId}
              onChange={handleChangeTransporterId}
              fullWidth
            />

            <TextField
              onFocus={() => setShrink(true)}
              onBlur={(e) => setShrink(!!e.target.value)}
              InputLabelProps={{ shrink: true }}
              name="roleid"
              label="RoleId"
              /*InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                )
              }}*/
              variant="outlined"
              value={roleId}
              onChange={handleChangeRoleId}
              fullWidth
            />


            <div className="card-edit-button">
              <Button style={{ marginRight: '15px', background: 'red' }} className="card-edit-button-1" variant="contained" onClick={() => router.back()} >CANCLE</Button>
              <Button style={{ marginRight: '15px', background: 'green' }} className="card-edit-button-2" variant="contained" onClick={SaveUserInfo} endIcon={<AddIcon />} >CREATE</Button>
            </div>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

export default CreateUser;

