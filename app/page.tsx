"use client";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  useIsAuthenticated,
} from "@azure/msal-react";
import {
  IPublicClientApplication,
  InteractionStatus,
} from "@azure/msal-browser";
import { useEffect, useState } from "react";
import { msalConfig } from "./api/MSAuthentication/authConfig";
import Image from "next/image";
import LogoCompany from "./assets/images/skc-logo-company.png";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import { red } from "@mui/material/colors";
import { PublicClientApplication } from "@azure/msal-browser";
import { cookies } from "next/headers";
import { deleteCookie } from "./api/MSAuthentication/AuthHandle";
import { SaveTokenCookie } from "./action/token";
import {
  GetUserLoggedData,
  SaveUserInfo,
} from "./api/MSAuthentication/AuthClientHandle";
import { token } from "./constant/NetworkSetting";
// import { deleteCookie } from "./api/MSAuthentication/AuthHandle";
// import { loginReqest } from "./api/MSAuthentication/authConfig";

export default function Home() {
  const router = useRouter();
  const [userDetail, setuserDetail] = useState(null);
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        await SaveTokenCookie(instance);
        // let UserInfo = await GetUserLoggedData(instance, router);
        // await SaveUserInfo(UserInfo!);
      };
      fetchData();
      instance.handleRedirectPromise().then((tokenResponse) => {
        router.push("/menu");
      });
    }
  });

  const buttonTheme = createTheme({
    palette: {
      primary: {
        main: "#00b09b",
      },
    },
  });
  async function handleLogin() {
    /* await msalInstance.initialize(); */
    const itemKey = "msal.interaction.status";
    if (sessionStorage.getItem(itemKey)) {
      sessionStorage.removeItem(itemKey);
    }
    if (!isAuthenticated && inProgress === InteractionStatus.None) {
      var response = await instance.loginRedirect();
      /* .then((response) => {
          console.log("LOGIN", response)
          setuserDetail({ name: response?.account?.name, token: response? })

          localStorage.setItem("accessToken" , response?.accessToken)
      }) */
    }
  }

  function handleLogout() {
    instance
      .logoutRedirect()
      .catch((e) => {
        console.log("Error");
      })
      .then((rs) => {});
  }

  const makeApiCall = async () => {
    var req = await fetch("api/ApiHelper", {
      method: "POST",
      body: JSON.stringify({
        isDeleted: false,
        pageNumber: 1,
        rowsOfPage: 100,
        user: 3,
        desc: true,
      }),
    });
    var body = JSON.parse(await req.text());
    console.log(body["response"]);


  };
  return (
    <div className="Content-LoginPage">
      <div className="LoginPage-CenterBlock">
        <ThemeProvider theme={buttonTheme}>
          <div style={{ marginTop: 12 }}>
            <Image
              src={LogoCompany}
              height={120}
              width={300}
              alt="Picture of the author"
            />
          </div>
          <div className="LP-text-logo">TMS</div>
          <div className="LPCB-MainContent">
            <div className="LPCB-button-div">
              <AuthenticatedTemplate>
                <Button
                  color="primary"
                  variant="contained"
                  style={{
                    maxWidth: "130px",
                    maxHeight: "130px",
                    minWidth: "130px",
                    minHeight: "50px",
                  }}
                  onClick={async () => {
                    handleLogout();
                  }}
                >
                  <div className="button-login-text">Logout</div>
                </Button>
                <br />
              </AuthenticatedTemplate>
              <UnauthenticatedTemplate>
                <Button
                  color="primary"
                  variant="contained"
                  style={{
                    maxWidth: "130px",
                    maxHeight: "130px",
                    minWidth: "130px",
                    minHeight: "50px",
                  }}
                  onClick={async () => {
                    handleLogin();
                  }}
                >
                  <div className="button-login-text">Login</div>
                </Button>
              </UnauthenticatedTemplate>
            </div>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}
