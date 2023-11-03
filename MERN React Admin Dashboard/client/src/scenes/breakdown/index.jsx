import React from "react";
import {Box, useTheme} from "@mui/material"
import Header from "component/Header";
import BreakdownChart from "component/BreakdownChart"

const Breakdown=() => {
    const theme = useTheme();

    return <Box m="1.5rem 2.5rem">
        <Header title="BREAKDOWN" subtitle="Breakdown of sales by category"></Header>
        <Box m="40px" height="75vh">
            <BreakdownChart/>
        </Box>
    </Box>
}

export default Breakdown