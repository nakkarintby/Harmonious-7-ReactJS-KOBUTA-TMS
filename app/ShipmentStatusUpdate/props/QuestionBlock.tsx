'use client'
import { Button, ButtonOwnProps, CheckboxProps } from "@mui/material";
import Link from "next/link";
import { ConverToQuestionShipment, QuestionGroup, QuestionShipment } from "../../constant/QuestionShipment/QuestionShipment";
import { DetailedHTMLProps, InputHTMLAttributes, Suspense, use, useCallback, useEffect } from "react";
import { CallHttp, CallHttp2 } from "../../api/ApiCallPlateform";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React from "react";

let questionGroup1:QuestionShipment[] = [
    {variant:"outlined", id:1, form:5, seqNo:1, checkPoint:"ฝากระโปรงด้านซ้าย", comment:undefined, choice:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined", id:2, form:5, seqNo:2, checkPoint:"ล้อยาง", comment:undefined, choice:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined", id:3, form:5, seqNo:3, checkPoint:"ไฟหน้า", comment:undefined, choice:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined", id:4, form:5, seqNo:4, checkPoint:"ฝากระโปรงด้านขวา", comment:undefined, choice:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined", id:5, form:5, seqNo:5, checkPoint:"ล้อยาง/กะทะด้านขวา", comment:undefined, choice:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined", id:6, form:5, seqNo:6, checkPoint:"กระจกมองหลัง", comment:undefined, choice:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined", id:7, form:5, seqNo:7, checkPoint:"พวงมาลัย", comment:undefined, choice:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined", id:8, form:5, seqNo:8, checkPoint:"เบาะนั่งคนขับ", comment:undefined, choice:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined", id:9, form:5, seqNo:9, checkPoint:"บังโคลนหลังขวา", comment:undefined, choice:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined", id:10, form:5, seqNo:10, checkPoint:"ล้อยาง/กะทะหลังขวา", comment:undefined, choice:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined", id:11, form:5, seqNo:11, checkPoint:"ไฟเลี้ยวหลังข้างขวา", comment:undefined, choice:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined", id:12, form:5, seqNo:12, checkPoint:"หางลาก", comment:undefined, choice:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined", id:13, form:5, seqNo:13, checkPoint:"ไฟเลี้ยวด้านซ้าย", comment:undefined, choice:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined", id:14, form:5, seqNo:14, checkPoint:"บังโคลนหลังซ้าย", comment:undefined, choice:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined", id:15, form:5, seqNo:15, checkPoint:"ล้อยาง/กะทะหลังซ้าย", comment:undefined, choice:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined", id:16, form:5, seqNo:16, checkPoint:"ระดับน้ำมัน", comment:undefined, choice:undefined, disabletextField:true, color:"primary"},
  ];

  let questionGroup2:QuestionShipment[] = [
    {variant:"outlined",  id:1, form:5, seqNo:1, checkPoint:"ส่งทันเวลา", comment:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined",  id:2, form:5, seqNo:2, checkPoint:"ส่งตรงเวลา", comment:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined",  id:3, form:5, seqNo:3, checkPoint:"ส่งพอดีเวลา", comment:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined",  id:4, form:5, seqNo:4, checkPoint:"ส่งปานกลางเวลา", comment:undefined, disabletextField:true, color:"primary"},
    {variant:"outlined",  id:5, form:5, seqNo:5, checkPoint:"ส่งพอเหมาะเวลา", comment:undefined, disabletextField:true, color:"primary"},
  ]

  const testCallQuestionForm = async (router:AppRouterInstance, matCode:string) => {
    var request = await CallHttp2(`/api/GetFormMatCode/`, 
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
  const FetchMenu = async (router:AppRouterInstance, demoMatCode:string) => {
    let questForm:QuestionShipment[] = []
    let result = await testCallQuestionForm(router, demoMatCode)
    if(result === "NotFound") {
        let q1:QuestionGroup = {groupId:1, Question:undefined, isSuccessed:false}
        if(document.getElementById("Q1-link")) {
            document.getElementById("Q1-link")?.classList.add("link-disable")
        }
        localStorage.setItem("question1", JSON.stringify(q1))
        return
    }
    for(var i=0; i<result!.length; i++){
        let injector = ConverToQuestionShipment(result![i])
        questForm.push(injector)
    }

    let q1:QuestionGroup = {groupId:1, Question:questForm, isSuccessed:false}
    localStorage.setItem("question1", JSON.stringify(q1))
  }
  

export default function QuestionBlock ({ demoMatCode }:{demoMatCode:string}) {
    const router = useRouter()
    const handleLoop = useCallback(()=>{},[])
    let Group_1_Check = document.getElementById("question_group_1") as HTMLInputElement
    useEffect(()=>{
        FetchMenu(router, demoMatCode)
    },[demoMatCode])
    let storageQ1 = localStorage.getItem("question1")
    let storageQ2 = localStorage.getItem("question2")
    if (global?.window !== undefined) {
    }
    
    window.onload = () => {
        if(storageQ1 !== null) {
            let instanceAgent:QuestionGroup = JSON.parse(storageQ1)
            if(instanceAgent.isSuccessed === true) {
                Group_1_Check.checked = true
            }else{
                Group_1_Check.checked = false
            }
        }
    }
    return(
    <>
    <Suspense>
    <div className="Question-block">
        <div className="Q1-block">
            <Link id="Q1-link" className="Q1-link" 
            href={{pathname:"/ShipmentStatusUpdate/questionnaire", query:{matCode:demoMatCode}}}>
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
            {/* {<Button onClick={()=>
            {
                console.log(demoMatCode)
            }}>TEST</Button>} */}
        </div>
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