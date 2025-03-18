import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { grayColor } from "../constants/color";

const Home = () => {
  return (
    <Box bgcolor={grayColor} height={"100%"}>
      <Typography p={"12rem"} variant="h5" textAlign={"center"}>
        welcome to CrackTheTrend 
        <br />
        Select a friend to chat
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
