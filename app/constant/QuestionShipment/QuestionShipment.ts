import { ButtonOwnProps } from "@mui/material";

export type Criteria = { index:number, variant :ButtonOwnProps["variant"],  name:String, choice?:boolean, DisabletextField:boolean, color:ButtonOwnProps["color"]}

export interface QuestionShipment
{
    id:number,
    form:number,
    seqNo:number
    checkPoint:String, 
    reason?:any,
    choice?:boolean,
    comment?:String
    //Use for Props
    disabletextField:boolean,
    variant :ButtonOwnProps["variant"],
    color:ButtonOwnProps["color"]
}

export interface QuestionGroup 
{
    groupId: number
    Question?: QuestionShipment[]
    isSuccessed: boolean
}

export function ConverToQuestionShipment(sorce:any) {
    let pack:QuestionShipment = 
    {
        id:sorce["id"],
        form:sorce["form"],
        seqNo:sorce["seqNo"],
        checkPoint:sorce["checkPoint"],
        reason:sorce["reason"],
        disabletextField:true,
        variant:"outlined",
        color:"primary"
    }
    return pack
}