"use client";
import * as React from "react";
import { Box } from "@mui/system";
import NavbarMenuTheme from "../props/MenuThemeProps/NavbarMenuTheme";
import { IsAuthenticationTemplate } from "../api/MSAuthentication/AuthClientHandle";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import {
  Backdrop,
  ButtonGroup,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useMsal } from "@azure/msal-react";
import moment from "moment";
import dayjs, { Dayjs } from "dayjs";
import {
  CapacityRegisterModel,
  CapacityRegisterModelConvert,
} from "../constant/CapacityRegister/CapacityRegisterModel";
import "dayjs/locale/en-gb";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SummaryCapregisterWEB from "./summarycapacityregister";
import AddLoadRoundComponent from "./addloadround";
import { IPublicClientApplication } from "@azure/msal-browser";
const axios = require("axios");
var _ = require("lodash");

interface TabModel {
  code: string;
  name: string;
}

interface CreateCapacityRegisterWebModel {
  planLoad: string;
  transportId: string;
  licenseTail: string;
}

interface UpdateCapacityRegisterWebModel {
  capacityRegisId: number;
  planLoad: string;
  transportId: string;
  loadRound: number;
  vehicleTypeCode: string;
  licenseTail: string;
  returnTime: string | undefined;
  repair: string | undefined;
  leave: string | undefined;
  sapStatus: string | undefined;
}

interface UserDetailObject {
  GetUserDetail: (instance: IPublicClientApplication) => Promise<string[]>;
 
}

 async function GetUserDetail(instance: IPublicClientApplication) : Promise<string[]>{
  let transporterList: string[] = [];
  const account = instance.getAllAccounts()[0];
  if (account != undefined) {
    const accessTokenRequest = {
      scopes: ["user.read"],
      account: account,
    };
    let resultToken = await instance.acquireTokenSilent(accessTokenRequest);
     await axios.get(
      "https://d736apsi01-wa02skc.azurewebsites.net/User/GetByUserDetail",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + resultToken.accessToken,
        },
      }
    ).then(function (response: any) {
      _.forEach(response.data.data, function (value: any, key: any) {
        if (key == "transporterId") {
          transporterList.push(value);
        }
      });
      return transporterList;
    })
    .catch(function (error: any) {
      return transporterList;
    });
    return transporterList;
  }
 return transporterList;
}

 async function GetCapacityRegister(
  instance: IPublicClientApplication,
  transportId: string,
  plantLoad: string
) {
  const account = instance.getAllAccounts()[0];
  const accessTokenRequest = {
    scopes: ["user.read"],
    account: account,
  };
  const transport = transportId;
  const planLoad = plantLoad;
  let resultToken = await instance.acquireTokenSilent(accessTokenRequest);
  const { data } = await axios.post(
    "https://d736apsi01-wa02skc.azurewebsites.net/CapacityRegister/GetCapacityRegisterByParam",
    {
      planLoad: planLoad,
      transportId: transport,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + resultToken.accessToken,
      },
    }
  );
  let CapRegisterModel: CapacityRegisterModel[] = [];

  if (data.data !== undefined) {
    const rsData = data.data;
    for (let i = 0; i < rsData.length; i++) {
      let Injected = CapacityRegisterModelConvert(rsData[i]);
      CapRegisterModel.push(Injected);
    }
  }

  return CapRegisterModel;
}

// export async function GetCapRegisterByTransport(
//   value: string,
//   capRegisList: CapacityRegisterModel[]
// ) {
//   const selected = capRegisList;
//   return selected.find((element) => {
//     return element.transportId === value;
//   });
// }

async function CreateCapacityRegisterWeb(
  instance: IPublicClientApplication,
  obj: CreateCapacityRegisterWebModel
) {
  const account = instance.getAllAccounts()[0];
  const accessTokenRequest = {
    scopes: ["user.read"],
    account: account,
  };

  let resultToken = await instance.acquireTokenSilent(accessTokenRequest);
  const { data } = await axios.post(
    "https://d736apsi01-wa02skc.azurewebsites.net/CapacityRegister/CreateCapacityRegisterWEB",
    {
      planLoad: obj.planLoad,
      transportId: obj.transportId,
      licenseTail: obj.licenseTail,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + resultToken.accessToken,
      },
    }
  );
}

async function UpdateCapacityRegisterWeb(
  instance: IPublicClientApplication,
  obj: UpdateCapacityRegisterWebModel[]
) {
  const account = instance.getAllAccounts()[0];
  const accessTokenRequest = {
    scopes: ["user.read"],
    account: account,
  };

  let resultToken = await instance.acquireTokenSilent(accessTokenRequest);
  const { data } = await axios.post(
    "https://d736apsi01-wa02skc.azurewebsites.net/CapacityRegister/UpdateCapacityRegisterWEB",
    obj,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + resultToken.accessToken,
      },
    }
  );


}

 async function GetUpdateCapacityRegisterWeb(
  instance: IPublicClientApplication,
  planLoad: string,
  transportId: string
) {
  const account = instance.getAllAccounts()[0];
  const accessTokenRequest = {
    scopes: ["user.read"],
    account: account,
  };

  let resultToken = await instance.acquireTokenSilent(accessTokenRequest);
  const { data } = await axios.post(
    "https://d736apsi01-wa02skc.azurewebsites.net/CapacityRegister/AddCapacityRegisterFromSAPByParam",
    {
      planLoad: planLoad,
      transportId: transportId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + resultToken.accessToken,
      },
    }
  );
  console.log(data);
  return data.data;
}

export default function CapacityRegister() {
  const { instance } = useMsal();
  const [capRegisList, setCapRegisList] = React.useState<
    CapacityRegisterModel[]
  >([]);
  const [capRegisSelectedList, setCapRegisSelectedList] = React.useState<
    CapacityRegisterModel[]
  >([]);
  const [capRegisterUpdateList, setCapRegisterUpdateList] = React.useState<
    CapacityRegisterModel[]
  >([]);
  const [dateValue, setDateValue] = React.useState<Dayjs | null>(
    dayjs(moment().format("YYYY-MM-DD"))
  );
  const [transportList, setTransportList] = React.useState<string[]>([]);
  const [transportSelected, setTransportSelected] = React.useState<string>("0");
  const [tabList, setTabList] = React.useState<TabModel[]>([]);
  const [tabSelected, setTabSelected] = React.useState("");
  const [checked, setChecked] = React.useState([true, false]);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  const [disabledRepairRows, setDisabledRepairRows] = React.useState<
    Set<number>
  >(new Set());
  const [disabledTimePickerRows, setDisabledTimePickerRows] = React.useState<
    Set<number>
  >(new Set());
  const [disabledLeaveRows, setDisabledLeaveRows] = React.useState<Set<number>>(
    new Set()
  );
  const [selectedHd, setSelectedHd] = React.useState<Set<number>>(new Set());
  const handleCheckboxRepairChange = (rowId: number) => {
    setDisabledRepairRows((prev) => {
      const newDisabledRows = new Set(prev);
      if (newDisabledRows.has(rowId)) {
        newDisabledRows.delete(rowId);
      } else {
        newDisabledRows.add(rowId);
      }
      return newDisabledRows;
    });
  };

  const handleTimePickerChange = (rowId: number, time: string | null) => {
    setDisabledTimePickerRows((prev) => {
      const newDisabledRows = new Set(prev);
      if (time == "Invalid Date" || time == null) {
        if (newDisabledRows.has(rowId)) {
          newDisabledRows.delete(rowId);
        }
      } else {
        if (!newDisabledRows.has(rowId)) {
          newDisabledRows.add(rowId);
        }
      }
      return newDisabledRows;
    });
  };

  const handleCheckboxLaveChange = (rowId: number) => {
    setDisabledLeaveRows((prev) => {
      const newDisabledRows = new Set(prev);
      if (newDisabledRows.has(rowId)) {
        newDisabledRows.delete(rowId);
      } else {
        newDisabledRows.add(rowId);
      }
      return newDisabledRows;
    });
  };

  const handleCloseBackDrop = () => {
    setOpenBackDrop(false);
  };
  const handleOpenBackDrop = () => {
    setOpenBackDrop(true);
  };

  // Change Date
  const handleDateChange = (newValue: Dayjs | null) => {
    setDateValue(newValue);
    setTransportSelected(transportSelected);
  };

  //Change TransportDropdown
  const handleTransportChange = (event: SelectChangeEvent) => {
    setTransportSelected(event.target.value as string);
  };
  // // ClickCheckHeaderBoxSelect
  // const handleCheckBoxItemChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   chkId: number
  // ) => {
  //   alert(chkId);
  //   setChecked([event.target.checked, event.target.checked]);
  // };
  // // ClickCheckHeaderBoxSelect
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedHd((prev) => {
        const newDisabledRows = new Set(prev);
        if (event.target.checked) {
          _.forEach(
            capRegisSelectedList,
            function (value: CapacityRegisterModel) {
              let isAdd = _.some(capRegisterUpdateList, {
                capacityRegisId: value.capacityRegisId,
              });
              if (!isAdd) {
                capRegisterUpdateList.push(value);
                newDisabledRows.add(value.capacityRegisId);
              }
            }
          );
        } else {
          newDisabledRows.clear;
        }
        return newDisabledRows;
      });
      return;
    } else {
      setSelectedHd(new Set());
      setCapRegisterUpdateList([]);
    }
  };

  const handleClickAddItemforUpdate = (
    event: React.ChangeEvent<HTMLInputElement>,
    chkId: number
  ) => {
    let origin = capRegisList;
    let selectedList = _.filter(origin, { capacityRegisId: chkId });
    _.find(capRegisList, { capacityRegisId: chkId }).isUpdate =
      event.currentTarget.checked;
    if (event.currentTarget.checked) {
      capRegisterUpdateList.push(selectedList[0]);
    } else {
      _.remove(capRegisterUpdateList, selectedList[0]);
    }
    setCapRegisterUpdateList(capRegisterUpdateList);

    setSelectedHd((prev) => {
      const newDisabledRows = new Set(prev);
      if (newDisabledRows.has(chkId)) {
        newDisabledRows.delete(chkId);
      } else {
        newDisabledRows.add(chkId);
      }
      return newDisabledRows;
    });
  };

  //ClickCheckBoxRepair
  function HandleCheckBoxRepairItemChange(
    event: React.ChangeEvent<HTMLInputElement>,
    chkId: number
  ) {
    let checkedValue = event.currentTarget.checked ? "X" : null;
    var item = _.find(capRegisList, { capacityRegisId: chkId });
    _.find(capRegisList, { capacityRegisId: chkId }).returnTime = null;
    item.repair = checkedValue;
    handleCheckboxRepairChange(chkId);
    return;
  }

  //ClickCheckBoxOn-Leave
  const handleCheckBoxLeaveItemChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    chkId: number
  ) => {
    let checkedValue = event.currentTarget.checked ? "X" : null;
    _.find(capRegisList, { capacityRegisId: chkId }).leave = checkedValue;
    _.find(capRegisList, { capacityRegisId: chkId }).returnTime = null;
    handleCheckboxLaveChange(chkId);
  };

  //ChangeTime
  const handleTimeChange = (newValue: any, chkId: number) => {
    let time = newValue;
    if (time != null) {
      time = dayjs(newValue).format("HH:mm") ?? null;
    }
    _.find(capRegisList, { capacityRegisId: chkId }).returnTime = time;
    handleTimePickerChange(chkId, time);
  };

  //ClickBtnSearch
  const HandleClickSearch = () => {
    setOpenBackDrop(true);
    CreateCapacityRegisterPage(capRegisList);
  
  };

  //ClickBtnTabVehicleName
  const handleClickTab = (newValue: string) => {
    let origin = capRegisList;

    if (newValue == "0") {
      setCapRegisSelectedList(origin);
    } else {
      let selectedList = _.filter(origin, { vehicleTypeCode: newValue });
      setCapRegisSelectedList(selectedList);
    }
  };

  const handleClickUpload = () => {
    let items = capRegisterUpdateList;
    let models: UpdateCapacityRegisterWebModel[] = [];
    let timerInterval: any;
    if (items.length > 0) {
      Swal.fire({
        title: "ต้องการบันทึกการลงทะเบียนรถใช่หรือไม่ ?",
        showCancelButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: `ไม่ใช่`,
        showLoaderOnConfirm: true,
        width: "50%",
        icon: "info",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          withReactContent(Swal)
            .fire({
              title: "สรุปการลงทะเบียนรถ",
              showCancelButton: false,
              confirmButtonText: "ตกลง",
              width: "80%",
              html: (
                <SummaryCapregisterWEB data={items} />
              ),
            })
            .then((rs) => {
              if (rs.isConfirmed) {
                Swal.fire({
                  title: "บันทึกข้อมูลสำเร็จ",
                  icon: "success",
                  showConfirmButton: false,
                  didOpen: () => {
                    // Swal.showLoading();
                    timerInterval = setInterval(() => {
                      _(items).forEach(function (n: CapacityRegisterModel) {
                        models.push({
                          capacityRegisId: n.capacityRegisId,
                          planLoad: n.planLoad,
                          transportId: n.transportId,
                          loadRound: n.loadRound,
                          vehicleTypeCode: n.vehicleTypeCode ?? "",
                          licenseTail: n.licenseTail,
                          returnTime: n.returnTime,
                          repair: n.repair,
                          leave: n.leave,
                          sapStatus: n.sapStatus == null ? "I" : "U",
                        });
                      });

                      UpdateCapacityRegisterWeb(instance, models)
                        .then((x) => {
                          let Item = _.filter(capRegisList, { isUpdate: true });
                          _.find(Item).isUpdate = false;
                          _(capRegisList).forEach(
                            (x: CapacityRegisterModel) => {
                              x.isUpdate = false;
                            }
                          );
                          setCapRegisterUpdateList([]);
                          setCapRegisList(capRegisList);
                          window.location.reload();
                        })
                        .catch((x) => {
                          alert("X");
                        });
                    }, 100);
                  },
                  willClose: () => {
                    clearInterval(timerInterval);
                  },
                });
              }
            });
        }
      });
    } else {
      Swal.fire({
        title: "กรุณาเลือกรายการที่ต้องการบันทึก",
        text: "",
        icon: "warning",
      });
    }
  };

  //ShowModal Add LoadRound
  const openModalAdd = async () => {
    const tempData = capRegisList;
    let newObjLicenseTail = tempData.map((o) => ({
      label: o.licenseTail,
    }));
    let tempLicenseTailList = _.uniqBy(newObjLicenseTail, "label");
    let selectedLicense: "";
    withReactContent(Swal)
      .fire({
        title: "เพิ่มเที่ยวรถ",
        html: (
          <AddLoadRoundComponent
            data={tempLicenseTailList}
            originList={tempData}
           />
        ),
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "เพิ่ม",
      })
      .then((result) => {
        if (result.isConfirmed) {
          AddLoadRound(selectedLicense);
          withReactContent(Swal).fire({
            title: "เพิ่มเที่ยวรถสำเร็จ",
            text: `${selectedLicense}`,
            icon: "success",
          });
        }
      });
  };

  const getData = async () => {
    handleOpenBackDrop;
    let data = await GetUpdateCapacityRegisterWeb(
      instance,
      dateValue?.format("YYYY-MM-DD") ?? "",
      transportSelected
    );

    setCapRegisList(data);
  };

  function AddLoadRound(selectedLicense: string) {
    let item = selectedLicense;
    let tempData = capRegisList;
    let selectedList = _.maxBy(
      _.filter(tempData, { licenseTail: item }),
      function (x: CapacityRegisterModel) {
        return x.loadRound;
      }
    );

    let addModel: CreateCapacityRegisterWebModel = {
      licenseTail: item,
      planLoad: dayjs(dateValue).format("YYYY-MM-DD"),
      transportId: transportSelected,
    };
    CreateCapacityRegisterWeb(instance, addModel).then((x) => {
      selectedList.loadRound += 1;
      capRegisList.push(selectedList);
      CreateCapacityRegisterPage(capRegisList);
    });

  }

  async function CreateTabCapacityRegister(
    capRegisList: CapacityRegisterModel[]
  ) {
    let org = capRegisList;
    let newObjTab: TabModel[] = [];
    _(org).forEach(function (n: CapacityRegisterModel) {
      newObjTab.push({
        code: n.vehicleTypeCode ?? "",
        name: n.vehicleTypeName ?? "",
      });
    });
    let tabVehicle: TabModel[] = _.uniqBy(newObjTab, "code");
    await setTabList(tabVehicle);
    return;
    // return tabVehicle;
  }

  function CreateCapacityRegisterPage(capRegisList: CapacityRegisterModel[]) {
    handleOpenBackDrop;
    GetCapacityRegister(
      instance,
      transportSelected,
      dayjs(dateValue).format("YYYY-MM-DD")
    ).then((x) => {
      CreateTabCapacityRegister(x);
      setCapRegisList(x);
      setCapRegisSelectedList(x);
      handleCloseBackDrop();
      SetUpValueDisabled(x);
    });
  }

  function SetUpValueDisabled(capRegisList: CapacityRegisterModel[]) {
    let itemsRepair = _.filter(capRegisList, { repair: "X" });
    let itemsLeave = _.filter(capRegisList, { leave: "X" });
    let itemsReturnTime = _.reject(capRegisList, ["returnTime", null]);
    _.forEach(itemsRepair, function (value: CapacityRegisterModel) {
      handleCheckboxRepairChange(value.capacityRegisId);
    });
    _.forEach(itemsLeave, function (value: CapacityRegisterModel) {
      handleCheckboxLaveChange(value.capacityRegisId);
    });
    _.forEach(itemsReturnTime, function (value: CapacityRegisterModel) {
      handleTimePickerChange(value.capacityRegisId, value.returnTime as string);
    });
  }

  React.useEffect(() => {
    const FetchData = async () => {
      var rs = await GetCapacityRegister(
        instance,
        transportSelected,
        dayjs(dateValue).format("YYYY-MM-DD")
      );

      await setCapRegisList(rs);
      await setCapRegisSelectedList(rs);

     let rsUserDetail = await GetUserDetail(instance);
     setTransportList(rsUserDetail);
     setTransportSelected(_.head(rsUserDetail));
     await CreateTabCapacityRegister(rs);
     SetUpValueDisabled(rs);
    };
    FetchData();
  }, [instance]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <IsAuthenticationTemplate>
        <div className="NavBoxGlobal">
          <NavbarMenuTheme CanPreviousBack={true} />
        </div>
        <div className="content-body">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={4} md={2} sm={12} xl={2}>
                <FormControl style={{ minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-label">
                    Transport
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={transportSelected}
                    label="Transporter"
                    onChange={handleTransportChange}
                  >
                    {transportList.map((index) => (
                      <MenuItem key={index} value={index}>
                        {index}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} md={2} sm={12} xl={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="YYYY-MM-DD"
                    sx={{ minWidth: 120 }}
                    value={dateValue}
                    onChange={(newValue) => handleDateChange(newValue)}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4} md={8} sm={12} xl={4}>
                <Button variant="contained" onClick={HandleClickSearch}>
                  ค้นหา
                </Button>
              </Grid>
              <Grid item xs={12} md={12} sm={12} xl={12}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="contained" onClick={handleClickUpload}>
                      บันทึกข้อมูล
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={openModalAdd}>
                      เพิ่มเที่ยวรถ
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={getData}>
                      ดึงข้อมูล SAP
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} sm={12} xl={12}></Grid>
              <Grid item xs={12} md={12} sm={12} xl={12}>
                <Box
                  sx={{
                    bgcolor: "background.paper",
                  }}
                >
                  <ButtonGroup variant="text" aria-label="Basic button group">
                    {tabList?.map((row) => (
                      <>
                        <Button
                          key={row.code}
                          onClick={(e) => {
                            handleClickTab(row.code);
                          }}
                        >
                          {row.name}
                        </Button>
                      </>
                    ))}
                  </ButtonGroup>
                </Box>
              </Grid>
              <Grid item xs={12} md={12} sm={12} xl={12}>
                <Paper sx={{ width: "100%" }}>
                  <TableContainer sx={{ maxHeight: 750 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Checkbox onChange={handleSelectAllClick} />
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 100 }}>
                            สถานะ
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 100 }}>
                            ขนส่ง
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 100 }}>
                            จุดพร้อมโหลด
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 100 }}>
                            ประเภทรถ
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 100 }}>
                            ทะเบียน หาง
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 100 }}>
                            ทะเบียน หัว
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 100 }}>
                            ซ่อม
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 170 }}>
                            เวลากลับ
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 100 }}>
                            ลา
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 100 }}>
                            กำลังขนส่ง
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 100 }}>
                            ในประเทศ
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 100 }}>
                            ลาว
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 100 }}>
                            กัมพูชา
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 100 }}>
                            วิ่งกะดึก
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 100 }}>
                            เที่ยวรถ
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {capRegisSelectedList?.map((row) => (
                          <TableRow
                            key={row.capacityRegisId}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>
                              <FormControlLabel
                                label=""
                                control={
                                  <Checkbox
                                    defaultChecked={row.isUpdate}
                                    checked={selectedHd.has(
                                      row.capacityRegisId
                                    )}
                                    onChange={(e) => {
                                      handleClickAddItemforUpdate(
                                        e,
                                        row.capacityRegisId
                                      );
                                    }}
                                  />
                                }
                              />
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.sapStatus == null
                                ? "ยังไม่ได้ลงทะเบียน"
                                : "ลงทะเบียนแล้ว"}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.transportId}
                            </TableCell>
                            <TableCell align="left">
                              {row.loadLocation}
                            </TableCell>
                            <TableCell align="left">
                              {row.vehicleTypeName}
                            </TableCell>
                            <TableCell align="left">
                              {row.licenseTail}
                            </TableCell>
                            <TableCell align="left">
                              {row.licenseHead}
                            </TableCell>
                            <TableCell align="right">
                              <Checkbox
                                id={`repair_${row.capacityRegisId}`}
                                defaultChecked={row.repair == "X"}
                                disabled={
                                  disabledLeaveRows.has(row.capacityRegisId) ||
                                  disabledTimePickerRows.has(
                                    row.capacityRegisId
                                  )
                                }
                                onChange={(e) => {
                                  HandleCheckBoxRepairItemChange(
                                    e,
                                    row.capacityRegisId
                                  );
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}
                              >
                                <TimePicker
                                  label="24 hour format"
                                  disabled={
                                    disabledLeaveRows.has(
                                      row.capacityRegisId
                                    ) ||
                                    disabledRepairRows.has(row.capacityRegisId)
                                  }
                                  value={
                                    row.returnTime != null ||
                                    row.returnTime == ""
                                      ? dayjs(
                                          `${row.planLoad}T${row.returnTime}`
                                        )
                                      : null
                                  }
                                  slotProps={{ textField: { size: "small" } }}
                                  timeSteps={{ minutes: 10 }}
                                  onChange={(newValue) =>
                                    handleTimeChange(
                                      newValue,
                                      row.capacityRegisId
                                    )
                                  }
                                />
                              </LocalizationProvider>
                            </TableCell>
                            <TableCell align="right">
                              <Checkbox
                                id={`leave_${row.capacityRegisId}`}
                                disabled={
                                  disabledTimePickerRows.has(
                                    row.capacityRegisId
                                  ) ||
                                  disabledRepairRows.has(row.capacityRegisId)
                                }
                                defaultChecked={row.leave == "X"}
                                onChange={(e) => {
                                  handleCheckBoxLeaveItemChange(
                                    e,
                                    row.capacityRegisId
                                  );
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              {row.progressFlag}
                            </TableCell>
                            <TableCell align="center">X</TableCell>
                            <TableCell align="center">{row.laosFlag}</TableCell>
                            <TableCell align="center">
                              {row.camboFlag}
                            </TableCell>
                            <TableCell align="center">
                              {row.twoShiftFlag}
                            </TableCell>
                            <TableCell align="center">
                              {row.loadRound}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </div>
      </IsAuthenticationTemplate>
    </>
  );
}
