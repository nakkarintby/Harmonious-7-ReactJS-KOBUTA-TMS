
'use client'
import "./DatatableUser.scss";
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
import AddIcon from '@mui/icons-material/Add';
import Modal from 'react-modal';
import Link from 'next/link'


async function GetUserList(router: AppRouterInstance) {
  var req = await CallHttp("/api/GetUserList", { method: "GET" }, router)
  let data: [] = req["response"]["data"]
  return data;
}

async function viewInfo(params: any) {
  const router = useRouter();
  localStorage.setItem('uid', params);
  router.push('/EditUser');
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


const DatatableDocument = () => {
  const MyCustomNoRowsOverlay = () => (
    <img className="notfound" src="https://qph.cf2.quoracdn.net/main-qimg-5357d4bafce6753e6e40baaeeef0356c" alt="no-item" height="299px" width="480px" />
  );
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    loadingToggle();
    async function fetchMyAPI() {
      let result = await GetUserList(router)
      setData(result);
      console.log(result)
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
    { field: "userId", headerName: "id", minWidth: 50, flex: 0.5, headerAlign: 'left', align: 'left', headerClassName: 'grid-header' },
    {
      field: "userName", headerName: "UserName", minWidth: 50, flex: 2, headerAlign: 'left', align: 'left', headerClassName: 'grid-header'
      , renderCell: (params: any) => {
        return (
          <div className="cellAction" onClick={() => viewInfo(params.row.userId)} >
            <a className="active-name" >{params.row.userName}</a>
          </div>
        );
      },
    },
    { field: "transporterId", headerName: "TransporterId", minWidth: 50, flex: 1, headerAlign: 'left', align: 'left', headerClassName: 'grid-header' },
    { field: "systemRoleId", headerName: "RoleId", minWidth: 50, flex: 1, headerAlign: 'left', align: 'left', headerClassName: 'grid-header' },
    { field: "createdBy", headerName: "createdBy", minWidth: 50, flex: 1, headerAlign: 'left', align: 'left', headerClassName: 'grid-header' },
  ];

  const handleChangeSearch = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  async function viewInfo(params: any) {
    localStorage.setItem('uid', params);
    /*var cookie2 = localStorage.setItem('uid',
    JSON.stringify({name: params,name2: params}));*/
    router.push('/EditUser');
  }

  return (
    
    <div className="allitem">
          <div style={{ display: isLoading ? 'flex' : 'none' }} className='loading-toggle'>
        <div className='loading-toggle-content'>
          <div className='loading-toggle-pic'></div>
          <div className='loading-toggle-text'>Loading...</div>
        </div>
      </div>
      <div className="item-header">
        <div className="item-header-text">
          <h1>User</h1>
        </div>

        <div className="item-header-space"></div>

        <Button className="item-header-button" variant="contained" endIcon={<AddIcon />} onClick={() => router.push('/CreateUser')} >
          CREATE
        </Button>
      </div>

      <div className="item-datatable" style={{ height: data.length == 0 ? '410px' : '' }}>

        <StripedDataGrid

          sx={{
            height: '100%',
            width: '100%',
            '& .grid-header': {
              backgroundColor: 'rgba(79, 149, 201, 0.8)',


            },
          }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          initialState={{
            pagination: {
              paginationModel: { pageSize: 8, page: 0 },
            },
          }}

          rows={data}
          columns={columns}
          getRowId={(data: any) => data.userId}
          slots={{
            noRowsOverlay: MyCustomNoRowsOverlay
          }}
          pageSizeOptions={[8]}
        />

      </div>
    </div>
  );
};

export default DatatableDocument;
