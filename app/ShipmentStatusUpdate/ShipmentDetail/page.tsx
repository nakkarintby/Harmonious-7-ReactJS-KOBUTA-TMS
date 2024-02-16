'use client'
import { Box, Button } from "@mui/material";
import { IsAuthenticationTemplate } from "../../api/MSAuthentication/AuthClientHandle";
import MenuTheme from "../../props/MenuThemeProps/MenuTheme";
import TopToolbar from "../props/Toolbar";
import DropPoint from "../props/DropPoint";
import PhotoDetail from "../props/PhotoDetail";
import ButtonPhoto from "../props/ButtonPhoto";
import QuestionBlock from "../props/QuestionBlock";
import React, { useCallback, useEffect } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ConverToQuestionShipment, QuestionGroup, QuestionShipment } from "../../constant/QuestionShipment/QuestionShipment";
import { CallHttp2 } from "../../api/ApiCallPlateform";
import Materialinfo from "../props/Materialinfo";
import { OrderForm } from "../../constant/OrderForm/OrderForm";
import { useRouter } from "next/navigation";
import FooterCom from "../props/footer/footer";
import VerifyProduct from "../props/VerifyProduct";
import ConfirmProduct from "../props/ConfirmProduct";

export interface matDetail {
  materialCode:string,
  serialNo:string
};

export interface DetailSearch {
  license:string,
  shipingGroup:string,
  shipingTo:string
}

async function ShipmentSearchSubmit(license:string, shipingGroup:string, shipTo:string) {
  var request = await fetch("https://d736apsi01-wa02skc.azurewebsites.net/Order/GetOrderFormByMatCode",
  {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({license:license, shipmentGroup:shipingGroup, shipTo:shipTo})})
  var response = await request.json()
  var resultJson:OrderForm = JSON.parse(JSON.stringify(response["data"]))
  if (typeof window !== 'undefined') {
    localStorage.setItem("OrderForm", JSON.stringify(resultJson))
  }
  return resultJson
}

function GetDataFromLocalStorage(router:AppRouterInstance,/*  setPreviousData:React.Dispatch<React.SetStateAction<string>> */) {
  var result = localStorage.getItem("DetailSearch")
  if(result !== null) {
      return result
  }
}

function SetDetailSearch (license:string, shipingGroup:string, shipingTo:string) {
  var pack:DetailSearch = {license:license, shipingGroup:shipingGroup, shipingTo:shipingTo}
  return pack
}

function createMatDetailList(orderForm: OrderForm) {
  var listPack:matDetail[] = []
  var pack:matDetail = {materialCode:orderForm.materialCode, serialNo:orderForm.serialNo}
  var source = orderForm.matDetail
  for(var i=0; i<source.length; i++) {
    var tempPack:matDetail = {materialCode:source[i].materialCode, serialNo:source[i].serialNo}
    listPack.push(tempPack)
  }
/*   listPack.push({materialCode:"sfv", serialNo:"fsvfs"})
  listPack.push({materialCode:"sfvthstn", serialNo:"dnbdnsbs"}) */
  return listPack
}

export default function ShipmentStatusUpdate() {
  const router = useRouter()
  /* let MatCodesList = ["W9500-68011-P", "5T072-00000-2T", "W9500-94751"] */
  let [orderForm, setOrderForm] = React.useState<OrderForm>()
  var [detailSearch, setDetailSearchState] = React.useState<DetailSearch>()
  let [currMatCode, setCurrMatcode] = React.useState<matDetail|undefined>(undefined)
  let [matDetailList, setMatDetailList] = React.useState<matDetail[]>([])
  if (typeof window !== 'undefined') {
    var getPrevious = GetDataFromLocalStorage(router)
    var previousObj = JSON.parse(getPrevious!)
    var license = previousObj["license"]
    var shipingGroup = previousObj["shipingGroup"]
    var shipingTo = previousObj["shipingTo"]
  }
  useEffect(()=>{
    const fetchData = async ()=>{
      var request = await ShipmentSearchSubmit(license, shipingGroup, shipingTo)
      var result:matDetail[] = createMatDetailList(request)
      setMatDetailList(result)
      setOrderForm(request)
      if(currMatCode === undefined) {
        setCurrMatcode(result[0])
      }
      var detailResult = SetDetailSearch(request.licensePlate, shipingGroup, shipingTo)
      setDetailSearchState(detailResult)
    }
    fetchData()
  }, [currMatCode])
  /* if(orderForm !== undefined) {
    var result:matDetail[] = createMatDetailList(orderForm)
    setMatDetailList(result)
  } */
  
    return (<>
    <IsAuthenticationTemplate>
        <MenuTheme>
        <div className="Kanit-M">
          <TopToolbar />
          <Box component="main" sx={{ pt: 8 }}>
            <DropPoint orderForm={orderForm!} matDetailList={matDetailList} currMatCode={currMatCode!} setCurrMatcode={setCurrMatcode} />
            <PhotoDetail />
            <ButtonPhoto />
            {/* <Button onClick={()=>{
          }} >TEST</Button> */}
            <QuestionBlock matDetailList={matDetailList} currMatCode={currMatCode} detailSearch={detailSearch!}/>
            {/* <Signature/> */}
            <FooterCom />
          </Box>
        </div>
        </MenuTheme>
    </IsAuthenticationTemplate>
    </>)
}

/* Object.keys(previousObj).map((key)=>{
        console.log(previousObj[key])
      }) */
