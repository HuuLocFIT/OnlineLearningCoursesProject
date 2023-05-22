import React from "react";
import { useNavigate } from 'react-router-dom';
import { Box, useTheme, Button } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../adminComponents/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import "adminComponents/responsive.css";

const URL_API_ACCOUNTS = "http://localhost:5000/api/orders/management-revenues";

const AdminManagementRevenues = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [listRevenues, setListRevenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const getListRevenues = async () => {
    setLoading(true);
    const response = await axios.get(URL_API_ACCOUNTS);
    return response.data;
  };
  useEffect(() => {
    getListRevenues().then((listRevenues) => {
      setListRevenues(listRevenues);
      setLoading(false);
    });
  }, []);

  //   const handleEnableUser = async (idUser) => {
  //     const response = await axios.put(
  //       `http://localhost:5000/api/users/action/${idUser}/1`
  //     );
  //     return response.data;
  //   };

  //   const handleDisableUser = async (idUser) => {
  //     console.log(idUser);
  //     const response = await axios.put(
  //       `http://localhost:5000/api/users/action/${idUser}/0`
  //     );
  //     return response.data;
  //   };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.2,
    },
    {
      field: "fullname",
      headerName: "Full Name",
      flex: 0.75,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.75,
    },
    {
      field: "sum_price",
      headerName: "Total Price",
      flex: 0.5,
    },
    {
      field: "created_at",
      headerName: "Date",
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div>
          <button
            className="rounded bg-green-600 p-2 font-semibold"
            onClick={() => navigate(`/management-revenues/details/${params.row.id}/${params.row.id_user}`)}
          >
            View Details
          </button>
        </div>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className="mb-3"
      >
        <Header title="REVENUES" subtitle="These Are The Revenues" />
        {/* <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.blueAccent[600],
              color: theme.palette.neutral[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: theme.palette.blueAccent[700], // Change the background color on hover
              },
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>
      <Box
        m="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            fontSize: "0.8rem",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
            fontSize: "0.9rem",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
        className="datagrid-table-view-accounts"
      >
        <DataGrid
          loading={loading || !listRevenues}
          getRowId={(row) => row.customId}
          rows={listRevenues.map((row) => ({
            ...row,
            customId: row.id, // Thay thế row.id bằng trường dữ liệu tương ứng trong truy vấn SQL
          }))}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default AdminManagementRevenues;
