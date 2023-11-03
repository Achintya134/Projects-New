import React from "react";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useGetPerformanceQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "component/Header";
import CustomColumnMenu from "component/DataGridCustomColumnMenu"

const Performance = () =>{
    const theme = useTheme();
    
    const userId=useSelector((state)=>state.global.userId)
    const {data, isLoading} = useGetPerformanceQuery(userId);

    console.log("data",data);
    const columns=[
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "userId",
            headerName: "User Id",
            flex: 0.5,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            flex: 1,
        },
        {
            field: "products",
            headerName: "Products",
            flex: 0.5,
            sortable:false,
            renderCell: (params) => params.value.length
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell:(params) => `$${Number(params.value).toFixed(2)}`
        },
    ]
    return <Box>
    <Header title="PERFORMNCE" subtitle="Track your affiliate performance"></Header>
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
            rows={(data && data.sales) || []}
            columns={columns}
            slots={{
                CustomColumnMenu,
            }}
            />
    </Box>
</Box>
}

export default Performance
