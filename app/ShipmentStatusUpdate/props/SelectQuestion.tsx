'use client'

import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import React from "react";

export interface SelectFormChoice {
    key:number
    value:any
}

export default function SelectQuestion({selectChioce, counter, setCounter}:{selectChioce:SelectFormChoice[], counter:number, setCounter:React.Dispatch<React.SetStateAction<number>>}) {
    const [age, setAge] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
    setCounter(Number(event.target.value))
  };
    let currentSelected = `${selectChioce[counter].key}`
    return(<>
    <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={currentSelected}
        label="Age"
        style={{minWidth: 229}}
        onChange={handleChange}
    >
        {selectChioce.map((key, index)=>{
            return(<MenuItem key={index} value={key.key}>{key.key + 1}.{key.value}</MenuItem>)
        })}
    </Select>
    </>)
}