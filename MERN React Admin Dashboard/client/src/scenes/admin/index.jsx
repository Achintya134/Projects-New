import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetAdminsQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "component/Header";
import CustomColumnMenu from "component/DataGridCustomColumnMenu"

const Admin = () =>{
    const theme = useTheme();
    const{data, isLoading} = useGetAdminsQuery();
    console.log("data",data);
    const columns=[
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.5,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 0.5,
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{3})/,"($1)$2-$3")
            }
        },
        {
            field: "country",
            headerName: "Country",
            flex: 1,
        },
        {
            field: "occupation",
            headerName: "Occupation",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 0.5,
        },
    ]
    return <Box>
    <Header title="ADMINS" subtitle="List Of Admins"></Header>
    <Box
        mt="40px"
        height="70vh"
        sx={{
            "& .MuiDataGrid-root": {
                border:"none"
            },
            "& .MuiDataGrid-cell": {
                borderBottom:"none"
            },
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.primary.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none"

            },
            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light
            },
            "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.primary.alt,
                color: theme.palette.secondary[100],
                borderTop: "none"

            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[100]} !important`,
                
            },
        }}
    
    >
        <DataGrid
            loading={isLoading || !data}
            getRowId={(row)=>row._id}
            rows={data || []}
            columns={columns}
            slots={{
                CustomColumnMenu,
            }}
            />
    </Box>
</Box>
}

export default Admin
