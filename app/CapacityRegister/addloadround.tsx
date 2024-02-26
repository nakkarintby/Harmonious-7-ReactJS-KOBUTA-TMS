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

export default function AddLoadRoundComponent({
  data,
  originList,
}: {
  data: string[];
  originList: CapacityRegisterModel[];
}) {
  const [licenseTailList, setLicenseTailList] = React.useState<string[]>([]);
  const [capacityList, setCapacityList] = React.useState<
    CapacityRegisterModel[]
  >([]);
  const [timePickerval, setTimePickerval] = React.useState<string | null>("");
  const [planLoad, setPlanLoad] = React.useState<string | null>("");
  const [tigerTime, setTigerTime] = React.useState<boolean>(true);

  function GetTime(value: string) {
    
    if (value != null) {
      setTigerTime(false);
      let objSelected = _.filter(
        capacityList,
        function (o: CapacityRegisterModel) {
          return o.licenseTail == value;
        }
      );
      let objMaxLoadRound = _.maxBy(
        objSelected,
        function (o: CapacityRegisterModel) {
          return o.loadRound;
        }
      );
      setTimePickerval(objMaxLoadRound.returnTime);
      setPlanLoad(objMaxLoadRound.planLoad);
    } else {
      setTimePickerval("");
      setTigerTime(true);
    }
  }

  React.useEffect(() => {
    const FetchData = async () => {
      setLicenseTailList(data);
      setCapacityList(originList);
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Autocomplete
                options={licenseTailList}
                size="small"
                onChange={(event, value: any) => {
                  GetTime(value?.label ?? null);
                }}
                sx={{
                  minWidth: 255,
                }}
                renderInput={(params) => (
                  <TextField {...params} label="License Tail" />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={"en-gb"}
            >
              <TimePicker
                label="24 hour format"
                disabled={tigerTime}
                minTime={
                  timePickerval == ""
                    ? null
                    : dayjs(`${planLoad}T${timePickerval}`).add(10, "m")
                }
                value={
                  timePickerval == ""  
                    ? null
                    : dayjs(`${planLoad}T${timePickerval}`).add(10, "m")
                }
                slotProps={{ textField: { size: "small" } }}
                timeSteps={{ minutes: 10 }}
                // onChange={(newValue) =>
                //   handleTimeChange(newValue, row.capacityRegisId)
                // }
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
