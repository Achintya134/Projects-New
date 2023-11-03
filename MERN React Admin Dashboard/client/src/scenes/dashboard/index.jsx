import React from 'react'
import FlexBetween from 'component/FlexBetween';
import Header from 'component/Header';
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic
} from '@mui/icons-material'
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material"
import { DataGrid } from '@mui/x-data-grid'; 
import BreakdownChart from 'component/BreakdownChart';
import OverviewChart from 'component/OverviewChart';
import { useGetDashboardStatsQuery } from 'state/api';
import StatBox from 'component/statbox'

const Dashboard = () => {
  const theme= useTheme()
  const isNonMediumScreen= useMediaQuery("(min-width:1200px)")
  const {data, isLoading} = useGetDashboardStatsQuery()
  console.log("data",data)
  const columns=[
    {
        field: "_id",
        headerName: "ID",
        flex: 1,
    },
    {
        field: "userId",
        headerName: "User ID",
        flex: 0.5,
    },
    {
        field: "createdAt",
        headerName: "Created At",
        flex: 1,
    },
    {
        field: "products",
        headerName: "# of Products",
        flex: 0.5,
        sortable:false,
        renderCell: (params ) => params.value.length
    },
    {
        field: "cost",
        headerName: "Cost",
        flex: 1,
        renderCells: (params) => `$${Number(params.value).toFixed(2)}`
    },
]
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Dashboard" subtitle="Welcome to your dashboard"/>
        <Box>
          <Button
            sx={{
              backgroundColor:theme.palette.secondary.light,
              color:theme.palette.background.palette
              

            }}
            fontSize="14px"
            fontWeight="bold"
            padding="10px 20px"
          >
            <DownloadOutlined sx={{mr:"10px"}}/>Download Report</Button>
        </Box>
      </FlexBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div":{
            gridColumn:isNonMediumScreen ? undefined : "span 12"

          }
        }}>
          <StatBox 
          title="Total Customers"
          value={data && data.totalCustomers}
          increase="20%"
          description="since last month"
          icon={
            <Email sx={{color:theme.palette.secondary[300], fontSize:"26px"}}/>
          
          }/>
          <StatBox 
          title="Total Sales"
          value={data && data.todayStats.totalSales}
          increase="21%"
          description="since last month"
          icon={
            <PointOfSale sx={{color:theme.palette.secondary[300], fontSize:"26px"}}/>
          
          }/>
          <Box gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1px"
          borderRadius="5px">
            <OverviewChart isDashboard={true} view="sales" />
          </Box>
          <StatBox 
          title="Monthly Sales"
          value={data && data.thisMonthStats.totalSales}
          increase="5%"
          description="since last month"
          icon={
            <PersonAdd sx={{color:theme.palette.secondary[300], fontSize:"26px"}}/>
          
          }/>
          
          <StatBox 
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="22%"
          description="since last month"
          icon={
            <Traffic sx={{color:theme.palette.secondary[300], fontSize:"26px"}}/>
          
          }/>
          <Box gridColumn="span 8"
          gridRow="span 3"
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
        }}>
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row)=>row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
            />
        </Box>
        <Box gridColumn="span 4"
        gridRow="span 3"
        backgroundColor={theme.palette.background.alt}
        p="5px"
        borderradius="1px">
          <Typography variant="h6" sx={{color:theme.palette.secondary[100]}}>
            Sale By Category
          </Typography>
          <BreakdownChart isDashboard={true}/>

        </Box>

      </Box>
    </Box>
  )
}

export default Dashboard; 
