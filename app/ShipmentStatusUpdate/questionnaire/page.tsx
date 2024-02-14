'use client'
import { Box, Button, ButtonOwnProps, TextField } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles";
import { useRouter, useSearchParams } from 'next/navigation'
import "../props/Home.css";
import TopToolbar from "../props/Toolbar"
import DropPoint from "../props/DropPoint"
import PhotoDetail from "../props/PhotoDetail"
import ButtonPhoto from "../props/ButtonPhoto"
import FooterCom from "../../pages/footer/footer"
import defaultTheme from "../props/Theme";
import React, { useState } from "react";
import { Criteria, QuestionGroup, QuestionShipment } from "../../constant/QuestionShipment/QuestionShipment";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import SelectQuestion, { SelectFormChoice } from "../props/SelectQuestion";
import { name } from "msal/lib-commonjs/packageMetadata";
import Materialinfo from "../props/Materialinfo";



function CriteriaButton(value:QuestionShipment, Type:String, setChoosed:React.Dispatch<React.SetStateAction<QuestionShipment[]>>, choosed: QuestionShipment[]) {
    let Color:ButtonOwnProps["color"] = "primary"
      let Variant:ButtonOwnProps["variant"] = "outlined"
      let ButtonValue:String = ""
      if(Type == "Accept") {
        ButtonValue = "ผ่าน"
        if(value.choice == true) {
          Color = "success"
          Variant = "contained"
        }
      }else if(Type == "Cancel") {
        ButtonValue = "ไม่ผ่าน"
        if(value.choice == false) {
          Color = "error"
          Variant = "contained"
        }
      }
      return(<><Button className='VerifyButtonCriteria' variant={Variant} color={Color} onClick={()=>{
        let newArray = choosed.slice(0)
        let index = value.seqNo - 1
        if(Type == "Accept"){
          if(value.choice == false || value.choice == undefined) {
            newArray[index].choice = true
            newArray[index].disabletextField = true
          } else {
            newArray[index].choice = undefined
            newArray[index].disabletextField = true
          }
          
        } else if(Type == "Cancel") {
          if(value.choice == true || value.choice == undefined) {
            newArray[index].choice = false
            newArray[index].disabletextField = false
          } else {
            newArray[index].choice = undefined
            newArray[index].disabletextField = false
          }
        }
        setChoosed(newArray)
      }}>{ButtonValue}</Button>
      </>)
}

function QuestionIterlator(source: QuestionGroup, setChoosed:React.Dispatch<React.SetStateAction<QuestionGroup>>, router:AppRouterInstance) {
  let [quests, setQuests] = React.useState<QuestionShipment[]>(source.Question!)
  let lastIndex:number = quests.length - 1
  let [counter, setCounter] = useState<number>(0)
  let q_AtIndex = quests[counter]
  let questionChoice = q_AtIndex.choice
  let TESTEST = createSelectChoice(quests, counter, setCounter)
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
      <TextField id="outlined-basic" label="หมายเหตุ" variant="outlined" disabled={(questionChoice === false) ? false : true}
      value={q_AtIndex.comment}
      onChange={(event)=>{
        let newArray = quests.slice(0)
        let targetQuest = newArray[counter]
        if(targetQuest.choice === true || undefined) {
          targetQuest.comment = undefined
          setQuests(newArray)
          return
        }
        targetQuest.comment = event.target.value
        setQuests(newArray)
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
        <Button className="Criteria-paginate-button" variant="contained" onClick={()=>{
          console.log(counter)
          console.log(lastIndex)
          if(counter === lastIndex) {
            source.Question = quests
            source.isSuccessed = true
            setChoosed(source)
            localStorage.setItem("question1",JSON.stringify(source))
            /* router.back() */
            return
          }
          if(counter >= lastIndex) return
          setCounter(counter+1)
          
        }}>ถัดไป</Button>
      </div>
    </div>
  </>
  )
}

function QuestionNaire () {
  const Router = useRouter()
  const searchParams = useSearchParams()
  let questG1get = localStorage.getItem("question1")
  /* let questionGroup2 = localStorage.getItem("question2") */
  if(questG1get == null) {
    Router.back()
  }
  let questionGroup:QuestionGroup = JSON.parse(questG1get!)
  let [questGroupState, setQuestGroupState] = React.useState<QuestionGroup>(questionGroup)
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

function createSelectChoice(source:QuestionShipment[], 
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