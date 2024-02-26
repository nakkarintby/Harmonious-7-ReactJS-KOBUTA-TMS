"use client";
import * as React from "react";
import { Box, ThemeProvider } from "@mui/system";
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
  TimeField,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import {
  Autocomplete,
  Backdrop,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  styled,
} from "@mui/material";
import { useMsal } from "@azure/msal-react";
import moment from "moment";
import dayjs, { Dayjs } from "dayjs";
import {
  CapacityRegisterModel,
  CapacityRegisterModelConvert,
} from "../constant/CapacityRegister/CapacityRegisterModel";
import { CheckBox, Flag } from "@mui/icons-material";
import "dayjs/locale/en-gb";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import zIndex from "@mui/material/styles/zIndex";

const axios = require("axios");
var _ = require("lodash");

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

interface SummaryCapregisterWebModel {
  transporter: string | null;
  planLoad: string;
  loadRound: number;
  loadLocation: string | undefined;
  vehicleTypeCode: string | undefined;
  vehicleTypeName: string | undefined;
  licenseTail: string;
  licenseHead: string | undefined;
  returnTime: string | undefined;
  repair: string | undefined;
  leave: string | undefined;
  sapStatus: string | undefined;
  sapStatusName: string;
}

export default function SummaryCapregisterWEB({
  data,
}: {
  data: CapacityRegisterModel[];
}) {
  const [summaryList, setSummaryList] = React.useState<
    SummaryCapregisterWebModel[]
  >([]);
  let summaryNewList: SummaryCapregisterWebModel[] = [];
  React.useEffect(() => {
    const FetchData = async () => {
      _(data).forEach(function (n: CapacityRegisterModel) {
        summaryNewList.push({
          transporter: n.transportId,
          planLoad: n.planLoad,
          loadRound: n.loadRound,
          loadLocation: n.loadLocation,
          vehicleTypeCode: n.vehicleTypeCode,
          vehicleTypeName: n.vehicleTypeName,
          licenseTail: n.licenseTail,
          licenseHead: n.licenseHead,
          returnTime: n.returnTime,
          repair: n.repair,
          leave: n.leave,
          sapStatus: n.sapStatus,
          sapStatusName:
            n.sapStatus == "I" || n.sapStatus == undefined
              ? "ลงทะเบียน"
              : n.sapStatus == "U"
              ? "อัพเดทข้อมูล"
              : "",
        });
      });
      setSummaryList(summaryNewList);
    };

    FetchData();
  }, []);

  return (
    <>
      <Container sx={{ py: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{ py: 2 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={12}>
            <div>รถที่ทำการลงทะเบียนทั้งหมด : {summaryList.length} </div>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ minWidth: 100 }}>สถานะ</TableCell>
                      <TableCell style={{ minWidth: 100 }}>ขนส่ง</TableCell>
                      <TableCell style={{ minWidth: 100 }}>จุดโหลดสินค้า</TableCell>
                      <TableCell style={{ minWidth: 100 }}>ประเภทรถ</TableCell>
                      <TableCell style={{ minWidth: 100 }}>ทะเบียนหาง</TableCell>
                      <TableCell style={{ minWidth: 100 }}>ทะเบียนหัว</TableCell>
                      <TableCell style={{ minWidth: 100 }}>รถซ่อม</TableCell>
                      <TableCell style={{ minWidth: 100 }}>เวลากลับ</TableCell>
                      <TableCell style={{ minWidth: 100 }}>ลา</TableCell>
                      <TableCell style={{ minWidth: 100 }}>รถเที่ยวที่</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {summaryList?.map((row) => (
                      <TableRow
                        key={`${row.transporter}_${row.licenseTail}_${row.licenseHead}`}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{row.sapStatusName}</TableCell>

                        <TableCell component="th" scope="row">
                          {row.transporter}
                        </TableCell>
                        <TableCell align="left">{row.loadLocation}</TableCell>
                        <TableCell align="left">
                          {row.vehicleTypeName}
                        </TableCell>
                        <TableCell align="left">{row.licenseTail}</TableCell>
                        <TableCell align="left">{row.licenseHead}</TableCell>
                        <TableCell align="left">{row.repair}</TableCell>

                        <TableCell align="left">{row.returnTime}</TableCell>
                        <TableCell align="left">{row.leave}</TableCell>
                        <TableCell align="left">{row.loadRound}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
