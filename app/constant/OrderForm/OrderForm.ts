
export interface OrderForm {
    orderHeaderId: number;
    orderDetailId: number;
    shipmentGroup: string;
    licensePlate: string;
    qty: string;
    materialCode: string;
    serialNo: string;
    doNumber: string;
    productForm: ProductForm[];
    matDetail: MatDetail[];
    IsCompleted: boolean;
    isCheckComplete: boolean;
    transportForm?: any;
    isSignature: boolean;
}

export interface MatDetail {
    materialCode: string;
    serialNo: string;
  }
export interface ProductForm {
    orderFormId: number;
    orderDetailId: number;
    orderHeaderId: number;
    form: number;
    type: number;
    seq: number;
    checkPoint: string;
    isPass: boolean|undefined;
    reason?: string;
    isCheck: boolean;
    createdBy: string;
    createdOn: string;
    modifiedBy?: any;
    modifiedOn?: any;
}