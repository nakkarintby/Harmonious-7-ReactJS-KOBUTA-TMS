
'use client'
import "./DatatableRoles.scss";
import React, { useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CallHttp } from "../../api/ApiCallPlateform";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { alpha, styled } from '@mui/material/styles';
import { gridClasses } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Modal from 'react-modal';
import Link from 'next/link'


async function GetRoleList(router: AppRouterInstance) {
  var req = await CallHttp("/api/GetRoleList", { method: "GET" }, router)
  let data: [] = req["response"]["data"]
  return data;
}


const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
          theme.palette.action.selectedOpacity +
          theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));


const DatatableRoles = () => {
  const MyCustomNoRowsOverlay = () => (
    <img className="notfound" src="https://qph.cf2.quoracdn.net/main-qimg-5357d4bafce6753e6e40baaeeef0356c" alt="no-item" height="299px" width="480px" />
  );
  const [data, setData] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    loadingToggle();
    async function fetchMyAPI() {
      let result = await GetRoleList(router)
      setData(result);
    }
    fetchMyAPI()
  }, [])

  const LoadingRequest = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            ''
          );
        }, 1500);
      });
  };

  const loadingToggle = async () => {
    setIsLoading(true);
    await LoadingRequest();
    setIsLoading(false);
  };



  const columns: GridColDef[] = [
    { field: "systemRoleId", headerName: "systemRoleId", minWidth: 50, flex: 0.5, headerAlign: 'left', align: 'left', headerClassName: 'grid-header' },
    {
      field: "name", headerName: "name", minWidth: 50, flex: 2, headerAlign: 'left', align: 'left', headerClassName: 'grid-header'
      , renderCell: (params: any) => {
        return (
          <div className="cellAction" onClick={() => viewInfo(params.row.systemRoleId)} >
            <a className="active-name" >{params.row.name}</a>
          </div>
        );
      },
    }
  ];


  async function viewInfo(params: any) {
    localStorage.setItem('roleid', params);
    /*var cookie2 = localStorage.setItem('uid',
    JSON.stringify({name: params,name2: params}));*/
    router.push('/EditRole');
  }

  return (
    <div className="body">
    <div style={{ display: isLoading ? 'flex' : 'none' }} className='loading-toggle'>
      <div className='loading-toggle-content'>
        <div className='loading-toggle-pic'></div>
        <div className='loading-toggle-text'>Loading...</div>
      </div>
    </div>


    <div className="container" >
      <div className="table-card">
        <div className="header">
          <div className="header-item">
            <Button  variant="contained" endIcon={<AddBoxIcon />} onClick={() => router.push('/CreateRole')} >
              CREATE
            </Button>
          </div>
        </div>
 
        <div className="content" style={{ height: data.length == 0 ? '410px' : '' }}>
          <StripedDataGrid
            sx={{
              height: '100%',
              width: '100%',
              '& .grid-header': {
                backgroundColor: 'rgb(37, 150, 190)',
                color: "white",
                fontSize: '16px'
              },
            }}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'odd' : 'even'
            }
            initialState={{
              pagination: {
                paginationModel: { pageSize: 8, page: 0 },
              },
            }}

            rows={data}
            columns={columns}
            getRowId={(data: any) => data.systemRoleId}
            slots={{
              noRowsOverlay: MyCustomNoRowsOverlay
            }}
            pageSizeOptions={[8]}
          />

        </div>
        <div className="footer">
          Master Role
        </div>
      </div>
    </div>
  </div>
  );
};

export default DatatableRoles;
