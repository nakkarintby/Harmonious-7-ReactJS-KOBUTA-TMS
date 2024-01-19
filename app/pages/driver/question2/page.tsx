'use client'
import { Button, ButtonOwnProps, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import React from "react";

import { useRouter } from "next/navigation";
import Signature from "../../component/Signature";
import StaticDriver from "../StaticDriver";



type TransportEvaluate = { variant :ButtonOwnProps["variant"], index:number, name:String, choice?:boolean, textFieldStatus:boolean, color:ButtonOwnProps["color"]}

  let rows:TransportEvaluate[] = [
    {variant:"outlined", index:0, name:"ความถูกต้องสินค้า", textFieldStatus:false, color:"primary"},
    {variant:"outlined", index:1, name:"สภาพสินค้า", textFieldStatus:false, color:"primary"},
    {variant:"outlined", index:2, name:"เด็กประจำรถบรรทุก", textFieldStatus:false, color:"primary"},
    {variant:"outlined", index:3, name:"การช่วยลงสินค้า", textFieldStatus:false, color:"primary"},
    {variant:"outlined", index:4, name:"มารยาทพนักงานขนส่ง", textFieldStatus:false, color:"primary"},
    {variant:"outlined", index:5, name:"สภาพรถบรรทุก", textFieldStatus:false, color:"primary"},
    {variant:"outlined", index:6, name:"การแต่งกายพนักงานขนส่ง", textFieldStatus:false, color:"primary"}
  ];

export default function EvaluateTransportation () {
  let [choosed, setChoosed] = React.useState<TransportEvaluate[]>([...rows]);
  const router = useRouter()
  let CriteriaButton = (value:TransportEvaluate, Type:String)=>{
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
  let EvaluateContent = (
  <><div className='Evaluate'>
    <h2 style={{display:"flex", justifyContent:"center"}}>ประเมินการขนส่ง</h2>
    {choosed.map((row)=>(
        (
          <div className="Criteria_Block">
            <p style={{textAlign:'center'}}>{row.index+1}.{row.name}</p>
            {CriteriaButton(row, "Accept")}
            {CriteriaButton(row, "Cancel")}
            <TextField id="outlined-basic" label="หมายเหตุ" variant="outlined" disabled={row.textFieldStatus}/>
          </div>
        )
      ))}
      <div className="evaluate_button_block">
        <div className="evaluate_button_space">
        <Button style={{minWidth:"80px"}} variant='contained' color="error" onClick={()=>{
              router.back()
            }}>ย้อนกลับ</Button>
          <Button style={{minWidth:"80px"}} variant='contained' onClick={()=>{
          }}>ยืนยัน</Button>
        </div>
      </div>
      <Signature />
  </div></>)
    return (<>
    <StaticDriver children={EvaluateContent}/>
    </>)
}

{/* <TableContainer component={Paper}>
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
            {rows.map((row) => (
              <TableRow>
              <TableCell>{row}</TableCell>
              <TableCell align="right"> 
                <Button id="button_pass_toogle" variant="outlined" >ผ่าน</Button>
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
      </TableContainer> */}

{/* <div className="Criteria_Block">
            <p style={{textAlign:'center'}}>1.ความถูกต้องสินค้า</p>
            <Button id="button_pass_toogle" className='VerifyButtonCriteria' variant="outlined">ครบ</Button>
            <Button className='VerifyButtonCriteria' variant='outlined' color='error'>ไม่ครบ</Button>
            <TextField id="outlined-basic" label="หมายเหตุ" variant="outlined" />
      </div>
      <div className="Criteria_Block">
            <p style={{textAlign:'center'}}>2.สภาพสินค้า</p>
            <Button id="button_pass_toogle" className='VerifyButtonCriteria' variant="outlined">ดี</Button>
            <Button className='VerifyButtonCriteria' variant='outlined' color='error'>ไม่ดี</Button>
            <TextField id="outlined-basic" label="หมายเหตุ" variant="outlined" />
      </div>
      <div className="Criteria_Block">
            <p style={{textAlign:'center'}}>3.เด็กประจำรถบรรทุก</p>
            <Button id="button_pass_toogle" className='VerifyButtonCriteria' variant="outlined">มี</Button>
            <Button className='VerifyButtonCriteria' variant='outlined' color='error'>ไม่มี</Button>
            <TextField id="outlined-basic" label="หมายเหตุ" variant="outlined" />
      </div>
      <div className="Criteria_Block">
            <p style={{textAlign:'center'}}>4.การช่วยลงสินค้า</p>
            <Button id="button_pass_toogle" className='VerifyButtonCriteria' variant="outlined">ช่วย</Button>
            <Button className='VerifyButtonCriteria' variant='outlined' color='error'>ไม่ช่วย</Button>
            <TextField id="outlined-basic" label="หมายเหตุ" variant="outlined" />
      </div>
      <div className="Criteria_Block">
            <p style={{textAlign:'center'}}>5.มารยาทพนักงานขนส่ง</p>
            <Button id="button_pass_toogle" className='VerifyButtonCriteria' variant="outlined">ดี</Button>
            <Button className='VerifyButtonCriteria' variant='outlined' color='error'>ไม่ดี</Button>
            <TextField id="outlined-basic" label="หมายเหตุ" variant="outlined" />
      </div>
      <div className="Criteria_Block">
            <p style={{textAlign:'center'}}>6.สภาพรถบรรทุก</p>
            <Button id="button_pass_toogle" className='VerifyButtonCriteria' variant="outlined">ดี</Button>
            <Button className='VerifyButtonCriteria' variant='outlined' color='error'>ไม่ดี</Button>
            <TextField id="outlined-basic" label="หมายเหตุ" variant="outlined" />
      </div>
      <div className="Criteria_Block">
            <p style={{textAlign:'center'}}>7.การแต่งกายพนักงานขนส่ง</p>
            <Button id="button_pass_toogle" className='VerifyButtonCriteria' variant="outlined">ดี</Button>
            <Button className='VerifyButtonCriteria' variant='outlined' color='error'>ไม่ดี</Button>
            <TextField id="outlined-basic" label="หมายเหตุ" variant="outlined" />
      </div> */}

      // (<>
      //   <div className='Evaluate'>
      //     <h2>ประเมินการขนส่ง</h2>
      //     {choosed.map((row)=>(
      //         (
      //           <div className="Criteria_Block">
      //             <p style={{textAlign:'center'}}>{row.index+1}.{row.name}</p>
      //             {CriteriaButton(row, "Accept")}
      //             {CriteriaButton(row, "Cancel")}
      //             <TextField id="outlined-basic" label="หมายเหตุ" variant="outlined" disabled={row.textFieldStatus}/>
      //           </div>
      //         )
      //       ))}
      //   </div></>)