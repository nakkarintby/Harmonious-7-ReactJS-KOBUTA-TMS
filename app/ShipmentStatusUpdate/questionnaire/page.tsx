'use client'
import { Box, Button, ButtonOwnProps, TextField } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles";
import { useRouter, useSearchParams } from 'next/navigation'
import "../props/Home.css";
import TopToolbar from "../props/Toolbar"
import React, { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import SelectQuestion, { SelectFormChoice } from "../props/SelectQuestion";
import Materialinfo from "../props/Materialinfo";
import defaultTheme from "../props/Theme";
import FooterCom from "../props/footer/footer";
import { ProductForm } from "../../constant/OrderForm/OrderForm";

async function UpdataFormByForm(source:ProductForm) {
  var request = await fetch("https://d736apsi01-wa02skc.azurewebsites.net/Order/UpdateFormByForm", 
  {method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(source)})
  var response = await request.json()
  if(request.status === 200) {
    return
  }
  alert(JSON.stringify(response))
}


function CriteriaButton(value:ProductForm, Type:String, setQuests:React.Dispatch<React.SetStateAction<ProductForm[]>>, choosed: ProductForm[]) {
    let Color:ButtonOwnProps["color"] = "primary"
      let Variant:ButtonOwnProps["variant"] = "outlined"
      let ButtonValue:String = ""
      if(Type == "Accept") {
        ButtonValue = "ผ่าน"
        if(value.isCheck == true) {
          if(value.isPass === true) {
            Color = "success"
            Variant = "contained"
          }
        }
      }else if(Type == "Cancel") {
        ButtonValue = "ไม่ผ่าน"
        if(value.isCheck === true) {
          if(value.isPass === false) {
            Color = "error"
            Variant = "contained"
          }
        }
      }
      return(<><Button className='VerifyButtonCriteria' variant={Variant} color={Color} onClick={async ()=>{
        let newArray = choosed.slice(0)
        let index = value.seq - 1
        if(Type == "Accept"){
          if(value.isCheck === false) {
            newArray[index].isCheck = true
            newArray[index].isPass = true
            newArray[index].reason = ""

          } else {
            if(value.isPass === false) {
              newArray[index].isCheck = true
              newArray[index].isPass = true
              newArray[index].reason = ""
            }else {
              newArray[index].isCheck = false
              newArray[index].isPass = undefined
            }
          }
          
        } else if(Type == "Cancel") {
          if(value.isCheck === false) {
            newArray[index].isCheck = true
            newArray[index].isPass = false
          } else {
            if(value.isPass === true) {
              newArray[index].isCheck = true
              newArray[index].isPass = false
            }else{
              newArray[index].isCheck = false
              newArray[index].isPass = undefined
            }
          }
        }
        var forUpdate:ProductForm = newArray[index]
        /* await UpdataFormByForm(forUpdate) */
        setQuests(newArray)
        if (typeof window !== 'undefined') {
          localStorage.setItem("question1", JSON.stringify(newArray))
        }
      }}>{ButtonValue}</Button>
      </>)
}

function QuestionIterlator(source: ProductForm[], setQuestGroupState:React.Dispatch<React.SetStateAction<ProductForm[]>>, router:AppRouterInstance) {
  let [quests, setQuests] = React.useState<ProductForm[]>(source)
  let lastIndex:number = source.length - 1
  let [counter, setCounter] = useState<number>(0)
  let q_AtIndex = source[counter]
  let questionChoice = q_AtIndex.isCheck
  let TESTEST = createSelectChoice(source, counter, setCounter)
  return (
  <>
    <div className="Criteria_Block" key={counter}>
      <SelectQuestion selectChioce={TESTEST} counter={counter} setCounter={setCounter}/>
      {/* <Button onClick={()=>{
        console.log(TESTEST)
      }}>TEST</Button> */}
      <p style={{textAlign:'center'}}>{counter+1}.{q_AtIndex.checkPoint}</p>
      {CriteriaButton(q_AtIndex, "Accept", setQuests, quests)}
      <br/>
      {CriteriaButton(q_AtIndex, "Cancel", setQuests, quests)}
      <br/>
      <TextField id="outlined-basic" label="หมายเหตุ" variant="outlined" 
      disabled={
        (questionChoice === false) ? true : (q_AtIndex.isPass === false) ? false : true
      }
      value={q_AtIndex.reason}
      onChange={(event)=>{
        let newArray = quests.slice(0)
        let targetQuest = newArray[counter]
        if(targetQuest.isCheck === true) {
          if(targetQuest.isPass === false) {
            targetQuest.reason = event.target.value
            setQuests(newArray)
          }
        }else {
          targetQuest.reason = ""
          setQuests(newArray)
        }
      }}
      />
      <br/>
      <div className="Criteria-Paginate-block">
        {(counter >= 1) ? 
        (<><Button className="Criteria-paginate-button" variant="contained" color="error" onClick={()=>{
          if(counter >= 1) {
            setCounter(counter - 1)
          }
        }}>ย้อนกลับ</Button></>) : (<></>)}
        {(counter === lastIndex) ? <></> : 
        <Button className="Criteria-paginate-button" variant="contained" onClick={()=>{
          if(counter === lastIndex) {
            setQuestGroupState(source)
            if (typeof window !== 'undefined'){
              localStorage.setItem("question1",JSON.stringify(source))
            }
            /* router.back() */
            return
          }
          if(counter >= lastIndex) return
          setCounter(counter+1)
          
        }}>ถัดไป</Button>}
        
      </div>
    </div>
  </>
  )
}

function QuestionNaire () {
  const Router = useRouter()
  const searchParams = useSearchParams()
  if (typeof window !== 'undefined') {
    var productForm = localStorage.getItem("question1")
    if(productForm === undefined) {
      Router.back()
    }
  }
  let questionGroup:ProductForm[] = JSON.parse(productForm!)
  let [questGroupState, setQuestGroupState] = React.useState<ProductForm[]>(questionGroup)
  return (
  <>
    <ThemeProvider theme={defaultTheme}>
        <div className="Kanit-M">
          <TopToolbar />
          <Box component="main" sx={{ pt: 8 }}>
           <Materialinfo matCode={searchParams.get('matCode')!}/>
            {/* <PhotoDetail /> */}
            {QuestionIterlator(questGroupState, setQuestGroupState, Router)}
            {/* <ButtonPhoto /> */}
            <FooterCom />
          </Box>
        </div>
      </ThemeProvider>
  </>
  )
}

export default QuestionNaire

function createSelectChoice(source:ProductForm[], 
                            counter:number, 
                            setCounter:React.Dispatch<React.SetStateAction<number>>) 
{
  let pack:SelectFormChoice[] = []
  for(let i=0; i<source.length; i++) {
    let injector:SelectFormChoice = 
    {
      key:i,
      value:source[i].checkPoint
    }
    pack.push(injector)
  }
  return pack
}



/* function VerifyStep1(choosed: Criteria[], setChoosed:React.Dispatch<React.SetStateAction<Criteria[]>>) {
  
  return (<>
  <h2>ตรวจสอบคุณภาพสินค้า</h2>
  {choosed.map((row, index)=>{
    
    (
      <div className="Criteria_Block" key={index}>
        <p style={{textAlign:'center'}}>{index+1}.{row.name}</p>
        {CriteriaButton(row, "Accept", setChoosed, choosed)}
        {CriteriaButton(row, "Cancel", setChoosed, choosed)}
        <TextField id="outlined-basic" label="หมายเหตุ" variant="outlined" disabled={row.DisabletextField}/>
      </div>
    )
  })}</>)
} */


/* let newArray = choosed.slice(0)
        let index = value.seq - 1
        if(Type == "Accept"){
          if(value.isPass == false || value.isPass == undefined) {
            newArray[index].isPass = true

          } else {
            newArray[index].isPass = undefined

          }
          
        } else if(Type == "Cancel") {
          if(value.isPass == true || value.isPass == undefined) {
            newArray[index].isPass = false

          } else {
            newArray[index].isPass = undefined

          }
        }
        setChoosed(newArray) */