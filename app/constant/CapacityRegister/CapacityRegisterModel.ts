'use client'
export interface CapacityRegisterModel  {
  capacityRegisId: number;
  planLoad : string;
  transportId: string;
  loadRound: number;
  licenseTail: string;
  licenseHead: string| undefined;
  loadLocation: string| undefined;
  vehicleTypeCode: string| undefined;
  vehicleTypeName: string| undefined;
  returnTime: string| undefined;
  repair: string| undefined;
  leave: string| undefined;
  laosFlag: string| undefined;
  camboFlag: string| undefined;
  twoShiftFlag : string| undefined;
  progressFlag: string| undefined;
  revision : number;
  isDeleted : string| undefined;
  createdBy : string| undefined ;
  createdOn : string| undefined;
  modifiedBy : string| undefined;
  modifiedOn : string| undefined;
  sapStatus : string| undefined ;
  dataType : string| undefined;
  isUpdate : boolean | false;
}

export function CapacityRegisterModelConvert (source:CapacityRegisterModel) {
    let SourceSlice = source
    let InjectTer:CapacityRegisterModel  = SourceSlice as CapacityRegisterModel 
    return InjectTer 
}

