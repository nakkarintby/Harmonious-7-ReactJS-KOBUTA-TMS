'use client'
import { Box } from "@mui/material";
import { IsAuthenticationTemplate } from "../../api/MSAuthentication/AuthClientHandle";
import MenuTheme from "../../props/MenuThemeProps/MenuTheme";
import TopToolbar from "../props/Toolbar";
import DropPoint from "../props/DropPoint";
import PhotoDetail from "../props/PhotoDetail";
import ButtonPhoto from "../props/ButtonPhoto";
import QuestionBlock from "../props/QuestionBlock";
import FooterCom from "../../pages/footer/footer";
import React, { useEffect } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ConverToQuestionShipment, QuestionGroup, QuestionShipment } from "../../constant/QuestionShipment/QuestionShipment";
import { CallHttp2 } from "../../api/ApiCallPlateform";
import Materialinfo from "../props/Materialinfo";

export default function ShipmentStatusUpdate() {
  let MatCodesList = ["W9500-68011-P", "5T072-00000-2T", "W9500-94751"]
  let [counter, setCounter] = React.useState<number>(0)
  let [questionForm, setQuestionForm] = React.useState<QuestionShipment[]>()
  let [demoMatCode, setDeomoMatcode] = React.useState<string>(MatCodesList[0])
    return (<>
    <IsAuthenticationTemplate>
        <MenuTheme>
        <div className="Kanit-M">
          <TopToolbar />
          <Box component="main" sx={{ pt: 8 }}>
            <DropPoint MatCodesList={MatCodesList} currentMatCode={demoMatCode} setMatCode={setDeomoMatcode} />
            <PhotoDetail />
            <ButtonPhoto />
            <QuestionBlock demoMatCode={demoMatCode}/>
            {/* <VerifyProduct /> */}
            {/* <Signature/> */}
            <FooterCom />
          </Box>
        </div>
        </MenuTheme>
    </IsAuthenticationTemplate>
    </>)
}


