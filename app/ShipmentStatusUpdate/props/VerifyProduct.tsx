import * as React from 'react';
import "./Home.css"
import Button, { ButtonOwnProps, ButtonProps, ButtonPropsColorOverrides, ButtonPropsVariantOverrides } from '@mui/material/Button';
import { TextField, TextFieldProps, colors, styled } from '@mui/material';
import { useRouter } from 'next/navigation';
import ConfirmProduct from './ConfirmProduct';

type Criteria = { variant :ButtonOwnProps["variant"], index:number, name:String, choice?:boolean, textFieldStatus:boolean, color:ButtonOwnProps["color"]}
  let rows:Criteria[] = [
    {variant:"outlined", index:0, name:"แตร", choice:undefined, textFieldStatus:true, color:"primary"},
    {variant:"outlined", index:1, name:"ฝากระโปรงด้านซ้าย", textFieldStatus:true, color:"primary"},
    {variant:"outlined", index:2, name:"ล้อยาง", textFieldStatus:true, color:"primary"},
    {variant:"outlined", index:3, name:"ไฟหน้า", textFieldStatus:true, color:"primary"},
    {variant:"outlined", index:4, name:"ฝากระโปรงด้านขวา", textFieldStatus:true, color:"primary"},
    {variant:"outlined", index:5, name:"ล้อยาง/กะทะด้านขวา", textFieldStatus:true, color:"primary"},
    {variant:"outlined", index:6, name:"กระจกมองหลัง", textFieldStatus:true, color:"primary"},
    {variant:"outlined", index:7, name:"พวงมาลัย", textFieldStatus:true, color:"primary"},
    {variant:"outlined", index:8, name:"เบาะนั่งคนขับ", textFieldStatus:true, color:"primary"},
    {variant:"outlined", index:9, name:"บังโคลนหลังขวา", textFieldStatus:true, color:"primary"},
    {variant:"outlined", index:10, name:"ล้อยาง/กะทะหลังขวา", textFieldStatus:true, color:"primary"},
    {variant:"outlined", index:11, name:"ไฟเลี้ยวหลังข้างขวา", textFieldStatus:true, color:"primary"},
    {variant:"outlined", index:12, name:"หางลาก", textFieldStatus:true, color:"primary"},
    {variant:"outlined", index:13, name:"ไฟเลี้ยวด้านซ้าย", textFieldStatus:true, color:"primary"},
    {variant:"outlined", index:14, name:"บังโคลนหลังซ้าย", textFieldStatus:true, color:"primary"},
    {variant:"outlined", index:15, name:"ล้อยาง/กะทะหลังซ้าย", textFieldStatus:true, color:"primary"},
    {variant:"outlined", index:16, name:"ระดับน้ำมัน", textFieldStatus:true, color:"primary"},
  ];
type SomeType = {Detail:String}
let anything:SomeType[] =[
  {Detail:"HAHA"},
  {Detail:"HEHE"}
]

  type TransportEvaluate = { variant :ButtonOwnProps["variant"], index:number, name:String, choice?:boolean, textFieldStatus:boolean, color:ButtonOwnProps["color"]}
  let rows2:TransportEvaluate[] = [
    {variant:"outlined", index:0, name:"ความถูกต้องสินค้า", textFieldStatus:false, color:"primary"},
    {variant:"outlined", index:1, name:"สภาพสินค้า", textFieldStatus:false, color:"primary"},
    {variant:"outlined", index:2, name:"เด็กประจำรถบรรทุก", textFieldStatus:false, color:"primary"},
    {variant:"outlined", index:3, name:"การช่วยลงสินค้า", textFieldStatus:false, color:"primary"},
    {variant:"outlined", index:4, name:"มารยาทพนักงานขนส่ง", textFieldStatus:false, color:"primary"},
    {variant:"outlined", index:5, name:"สภาพรถบรรทุก", textFieldStatus:false, color:"primary"},
    {variant:"outlined", index:6, name:"การแต่งกายพนักงานขนส่ง", textFieldStatus:false, color:"primary"}
  ];

  function CriteriaButton(value:Criteria, Type:String, setChoosed:React.Dispatch<React.SetStateAction<Criteria[]>>, choosed: Criteria[]) {
    let Color:ButtonOwnProps["color"] = "primary"
      let Variant:ButtonOwnProps["variant"] = "outlined"
      let ButtonValue:String = ""
      let TextFieldStatus = true
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
        if(Type == "Accept"){
          if(value.choice == false || value.choice == undefined) {
            newArray[value.index].choice = true
          } else {
            newArray[value.index].choice = undefined
          }
          newArray[value.index].textFieldStatus = true
        } else if(Type == "Cancel") {
          if(value.choice == true || value.choice == undefined) {
            newArray[value.index].choice = false
            newArray[value.index].textFieldStatus = false
          } else {
            newArray[value.index].choice = undefined
            newArray[value.index].textFieldStatus = true
          }
        }
        setChoosed(newArray)
      }}>{ButtonValue}</Button>
      </>)
    
  }

  function VerifyStep1(choosed: Criteria[], setChoosed:React.Dispatch<React.SetStateAction<Criteria[]>>) {
    return (<>
    <h2>ตรวจสอบคุณภาพสินค้า</h2>
    {choosed.map((row, index)=>(
      (
        <div className="Criteria_Block" key={index}>
          <p style={{textAlign:'center'}}>{index+1}.{row.name}</p>
          {CriteriaButton(row, "Accept", setChoosed, choosed)}
          {CriteriaButton(row, "Cancel", setChoosed, choosed)}
          <TextField id="outlined-basic" label="หมายเหตุ" variant="outlined" disabled={row.textFieldStatus}/>
        </div>
      )
    ))}</>)
  }

  function VerifyStep2(choosed: Criteria[], setChoosed:React.Dispatch<React.SetStateAction<Criteria[]>>) {
    return (<>
      <h2>ตรวจสอบคุณภาพสินค้า</h2>
      {choosed.map((row, index)=>(
        (
          <div className="Criteria_Block" key={index}>
            <p style={{textAlign:'center'}}>{index+1}.{row.name}</p>
            {CriteriaButton(row, "Accept", setChoosed, choosed)}
            {CriteriaButton(row, "Cancel", setChoosed, choosed)}
            <TextField id="outlined-basic" label="หมายเหตุ" variant="outlined" disabled={row.textFieldStatus}/>
          </div>
        )
      ))}</>)
  }

  function moveToTarget() {
      let target = document.getElementById("#VerifyProduct");
      target?.scrollIntoView({behavior:"smooth"})
  }

export default function VerifyProduct () {
    let [choosed, setChoosed] = React.useState<Criteria[]>([...rows])
    let [choosed2, setChoosed2] = React.useState<Criteria[]>([...rows2])
    let [currBlock, setCurrBlock] = React.useState<number>(0)
    let someList = [VerifyStep1(choosed, setChoosed), VerifyStep2(choosed2, setChoosed2 )]
    const router = useRouter()
    const moveTargetEffect = () => {
      let target = document.getElementById("VerifyProduct");
      target?.scrollIntoView({behavior:"smooth"})
    }

    function ButtonToggle() {
      if(currBlock == 0) {
        return(<>
        <Button variant='contained' onClick={()=>{
            moveTargetEffect()
            setCurrBlock(1)
            if(currBlock == 1) {
              setCurrBlock(0)
              return
            } 
            setCurrBlock(1)
          }}>ถัดไป</Button>  
        </>)
      }else{
        return(<>
          <Button variant='contained' onClick={()=>{
            moveTargetEffect()
            setCurrBlock(1)
            if(currBlock == 1) {
              setCurrBlock(0)
              return
            } 
            setCurrBlock(1)
          }}>ย้อนกลับ</Button>  
          </>)
      }
    }
     
    return (
      (<>
      <div className='VerifyProduct' id='VerifyProduct'>
        {someList[currBlock]}
        <ConfirmProduct/><br/>
      </div>   
      <div className='button-toggle'>
        {ButtonToggle()}      
      </div> 
      </>)
    )
}