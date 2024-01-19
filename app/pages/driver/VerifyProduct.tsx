import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./Home.css"
import { useEffect, useState } from 'react';
import Button, { ButtonOwnProps, ButtonProps, ButtonPropsColorOverrides, ButtonPropsVariantOverrides } from '@mui/material/Button';
import { TextField, TextFieldProps, colors, styled } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Refresh, Unarchive } from '@mui/icons-material';
import { Underdog } from 'next/font/google';
import ConfirmProduct from './ConfirmProduct';
import EvaluateTransportation from './question2/page';


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
    {choosed.map((row)=>(
      (
        <div className="Criteria_Block">
          <p style={{textAlign:'center'}}>{row.index+1}.{row.name}</p>
          {CriteriaButton(row, "Accept", setChoosed, choosed)}
          {CriteriaButton(row, "Cancel", setChoosed, choosed)}
          <TextField id="outlined-basic" label="หมายเหตุ" variant="outlined" disabled={row.textFieldStatus}/>
        </div>
      )
    ))}</>)
  }

  function VerifyStep2() {
    return <EvaluateTransportation/>
  }

export default function VerifyProduct () {
    let [choosed, setChoosed] = React.useState<Criteria[]>([...rows])
    let [currBlock, setCurrBlock] = React.useState<number>(0)
    let someList = [VerifyStep1(choosed, setChoosed), VerifyStep2()]
    const router = useRouter()
    return (
      <>
      <div className='VerifyProduct'>
      {someList[currBlock]}
      <ConfirmProduct/><br/>
        <Button variant='contained' onClick={()=>{
          router.push('/pages/driver/question2')
          // if(currBlock == 1) {
          //   setCurrBlock(0)
          //   return
          // } 
          // setCurrBlock(1)
        }}>ถัดไป</Button> 
      </div>
      </>  
    )
}
// const buttonToggle = (value: Criteria) => {
//   let testvalue = value
//   return <Button id="button_pass_toogle" variant={testvalue.variant} onClick={() => { 
//     //testState = testvalue
//     if(testvalue!.variant == "outlined") {
//       testvalue.variant = "contained"
//       //testState!.variant = "contained"
//       //setTestState(testState)
//       //choosed[testvalue.index].variant = "contained"
//     }else{
//       testvalue.variant = "outlined"
//       //setTestState(testvalue)
//       //choosed[testvalue.index].variant = "outlined"
//     }
//     //setChoosed(choosed)
//     //setChoosed(value => value.map((value, i) => i === 0 ? {variant:"contained"}: value))
//     //setSelected({variant:"contained"})
//   }}>ผ่าน</Button>
// };

{/* <div className='VerifyProduct'>
      <h2>ตรวจสอบคุณภาพสินค้า</h2>
      <TableContainer component={Paper}>
        <Table className='table_cell'>
          <TableHead>
            <TableRow>
              <TableCell>จุดตรวจสอบ</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">หมายเหตุ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {choosed.map((row) => (
              <TableRow>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right"> 
              <Button id="button_pass_toogle" variant={row.variant} onClick={() => {
                let newArray = choosed.slice(0)
                console.log(newArray)
                if(row.variant == "outlined"){
                  newArray[row.index].variant = "contained"
                }
                else{
                  newArray[row.index].variant = "outlined"
                }
                setChoosed(newArray)
              }}>ผ่าน</Button>
              </TableCell>
              <TableCell align="left">
                <Button variant='outlined' color='error'>ไม่ผ่าน</Button>
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" label="หมายเหตุ" variant="outlined" />
              </TableCell>
          </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div> */}

    // return (
    //   currBlock == 0 ? (<>
    //   {someList[currBlock]}
    //   <div className='VerifyProduct'>
    //     <Button variant='contained' onClick={()=>{     
    //         setCurrBlock(1)
    //     }}>ถัดไป</Button>
    //   </div>
    //   </>) : currBlock == 1 ? (<></>) : (<></>)
    
    // )