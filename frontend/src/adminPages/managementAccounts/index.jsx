import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../adminComponents/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import "adminComponents/responsive.css";

const URL_API_ACCOUNTS = "http://localhost:5000/api/users/management-accounts";

const AdminManagementAccounts = () => {
  const theme = useTheme();
  const [listAccounts, setListAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const getListAccounts = async () => {
    setLoading(true);
    const response = await axios.post(URL_API_ACCOUNTS);
    return response.data;
  };
  useEffect(() => {
    getListAccounts().then((listAccounts) => {
      setListAccounts(listAccounts);
      setLoading(false);
    });
  }, []);

  const handleEnableUser = async (idUser) => {
    const response = await axios.put(
      `http://localhost:5000/api/users/action/${idUser}/1`
    );
    return response.data;
  };

  const handleDisableUser = async (idUser) => {
    console.log(idUser);
    const response = await axios.put(
      `http://localhost:5000/api/users/action/${idUser}/0`
    );
    return response.data;
  };

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
      field: "job",
      headerName: "Job",
      flex: 0.5,
    },
    {
      field: "status",
      align: "center",
      headerName: "User Status",
      renderCell(params) {
        return params.row.status ? (
          <div className="bg-green-500 border-green-500 rounded-lg shadow-md pointer w-screen text-center">
            Online
          </div>
        ) : (
          <div className="bg-gray-400 text-black rounded-lg shadow-md pointer w-screen text-center">
            Offline
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div>
          <button
            className={`${
              !params.row.is_enabled ? "bg-gray-300" : "bg-red-700"
            } p-2 mr-2 rounded ${!params.row.is_enabled ? "disabled" : ""}`}
            onClick={() => handleDisableUser(params.row.id)}
          >
            Disable
          </button>
          <button
            className={`${
              params.row.is_enabled ? "bg-gray-300" : "bg-green-700"
            } p-2 rounded ${params.row.is_enabled ? "disabled" : ""}`}
            disabled={params.row.is_enabled}
            onClick={() => handleEnableUser(params.row.id)}
          >
            Enable
          </button>
        </div>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ACCOUNTS" subtitle="These Are The Accounts" />
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
        {/* <DataGrid
                    loading={loading || !listAccounts}
                    getRowId={(row) => row.id}
                    rows={listAccounts || []}
                    columns={columns}
                /> */}
        <DataGrid
          loading={loading || !listAccounts}
          getRowId={(row) => row.customId}
          rows={listAccounts.map((row) => ({
            ...row,
            customId: row.id, // Thay thế row.id bằng trường dữ liệu tương ứng trong truy vấn SQL
          }))}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default AdminManagementAccounts;
