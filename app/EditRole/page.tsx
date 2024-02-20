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
import SaveIcon from '@mui/icons-material/save';
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
import { Role } from "../constant/Role/Role"

async function GetToken(router: AppRouterInstance) {
  var req = await CallHttp("/api/GetToken", { method: "GET" }, router)
  var token = req["response"]["value"]
  return token;
}


const EditRole = () => {
  const [cookie, setCookie] = useState('')
  const [role, setRole] = React.useState<Role>()
  const router = useRouter();
  const [shrink, setShrink] = useState(false);
  const [roleName, setRoleName] = useState('')
  const [transporterId, setTransporterId] = useState('')
  const [systemRoleId, setsystemRoleId] = useState('')
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


  useEffect(() => {
    if (cookie !== undefined) {
      var roleid = localStorage.getItem("roleid")
      var tmp = ''+roleid
      setsystemRoleId(tmp)
      fetch('https://d736apsi01-wa02skc.azurewebsites.net/User/GetSystemRoleById?systemRoleId=' + roleid, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${cookie}`,
          'Content-Type': 'application/json'
        }
      })
        .then(async (res) => {
          var response = await res.json();
          var test = JSON.stringify(response["data"])
          var result: Role = JSON.parse(test);
          setRole(result);
          setRoleName(result.name);
        })
        .catch((data) => {
        });
    }
  }, [cookie]);

  const handleChangeRoleName = (e:any) => {
    e.preventDefault();
    setRoleName(e.target.value);
  };

  async function SaveRoleInfo () {
    if (role != undefined) {
      role.name = roleName
      role.systemRoleId = parseInt(systemRoleId)
    }

        fetch('https://d736apsi01-wa02skc.azurewebsites.net/User/UpdateSystemRole' , {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${cookie}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(role)
        })
          .then(async (res) => {
            console.log('Edit Role Success')
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
              <h1>Edit Role</h1>
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
              <Button style={{ marginRight: '15px', background: 'green' }} className="card-edit-button-2" variant="contained" onClick={SaveRoleInfo} endIcon={<SaveIcon />} >SAVE</Button>
            </div>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

export default EditRole;

