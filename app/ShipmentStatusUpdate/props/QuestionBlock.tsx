'use client'
import { Button, ButtonOwnProps, CheckboxProps } from "@mui/material";
import Link from "next/link";
import { ConverToQuestionShipment, QuestionGroup, QuestionShipment } from "../../constant/QuestionShipment/QuestionShipment";
import { DetailedHTMLProps, InputHTMLAttributes, Suspense, use, useCallback, useEffect } from "react";
import { CallHttp, CallHttp2 } from "../../api/ApiCallPlateform";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React from "react";
import { DetailSearch, matDetail } from "../ShipmentDetail/page";
import { OrderForm, ProductForm } from "../../constant/OrderForm/OrderForm";
import ConfirmProduct from "./ConfirmProduct";

  async function ShipmentFormSearch(license:string, shipmentGroup:string,shipTo:string, matCode:string, serialNo:string) {
    var request = await fetch("https://d736apsi01-wa02skc.azurewebsites.net/Order/GetOrderFormByMatCode",
    {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({license:license, shipmentGroup:shipmentGroup, shipTo:shipTo, matCode:matCode, serialNo:serialNo})})
    var response = await request.json()
    console.log(response)
    var resultJson:OrderForm = JSON.parse(JSON.stringify(response["data"]))
    if(request.status === 500 || request.status === 404) {
        if(resultJson.productForm === undefined || resultJson.productForm.length === 0) {
            return "NotFound"
        }
        return "NotFound"
    }
    return resultJson.productForm
  }

  const testCallQuestionForm = async (router:AppRouterInstance, matCode:string) => {
    var request = await CallHttp2(`/api/GetFormMatCode`, 
    {method:"POST", body:JSON.stringify({matCode:matCode})}, router)
    var result = JSON.stringify(await request?.json())
    var resultObject = JSON.parse(result)
    var resultStatus = resultObject.response.statusCode
    if(resultStatus === 500 || resultStatus === 404) {
        return "NotFound"
    }
    if(resultStatus === 200) {
        return resultObject.response.data["data"]
    }
    return
  }
  const FetchMenu = async ( currMatCode:matDetail, detailSearch:DetailSearch) => {
    let result = await ShipmentFormSearch(detailSearch.license, detailSearch.shipingGroup, detailSearch.shipingTo, currMatCode.materialCode, currMatCode.serialNo)
    if(result === "NotFound") {
        if(document.getElementById("Q1-link")) {
            document.getElementById("Q1-link")?.classList.add("link-disable")
        }
        localStorage.setItem("question1", JSON.stringify(undefined))
        return
    }
    localStorage.setItem("question1", JSON.stringify(result))
  }

export default function QuestionBlock ({ currMatCode, matDetailList, detailSearch }:{currMatCode:matDetail | undefined, matDetailList:matDetail[], detailSearch:DetailSearch}) {
    const router = useRouter()
    const handleLoop = useCallback(()=>{},[])
    let Group_1_Check = document.getElementById("question_group_1") as HTMLInputElement
    useEffect(()=>{
        if(currMatCode !== undefined) {
            FetchMenu(currMatCode, detailSearch)
        }
    },[currMatCode, detailSearch, handleLoop])
    /* window.onload = () => {
        if(storageQ1 !== null) {
            let instanceAgent:QuestionGroup = JSON.parse(storageQ1)
            if(instanceAgent.isSuccessed === true) {
                Group_1_Check.checked = true
            }else{
                Group_1_Check.checked = false
            }
        }
    } */
    return(
    <>
    <Suspense>
    <div className="Question-block">
        <div className="Q1-block">
            <Link id="Q1-link" className="Q1-link" 
            href={{pathname:"/ShipmentStatusUpdate/questionnaire", query:{matCode:currMatCode?.materialCode}}}>
                <h2>ตรวจสอบคุณภาพสินค้า</h2>
            </Link>
            {/* <a href="/pages/driver/questionnaire" className="Q1-link">
                
            </a> */}
            <div className="Checkbox-space">
                <label className="container-checkbox">
                    <input id="question_group_1" type="checkbox" disabled/>
                    <span className="checkmark"></span>
                </label>
            </div>
            {/* {<Button onClick={async()=>
            {
               var test = await CallHttp2("/api/GetOrderFormByMatCode", {method:"POST", body:JSON.stringify({Test:"DATATEST"})}, router)
            }}>TEST</Button>} */}
        </div>
        <ConfirmProduct/>
        <div className="Q1-block">
            <a href="" className="Q1-link link-disable">
                <h2>ตรวจสอบคุณภาพการขนส่ง</h2>
            </a>
            <div className="Checkbox-space">
                <label className="container-checkbox">
                    <input type="checkbox" disabled/>
                    <span className="checkmark"></span>
                </label>
            </div>
        </div>
    </div>
    </Suspense>
    </>)
}