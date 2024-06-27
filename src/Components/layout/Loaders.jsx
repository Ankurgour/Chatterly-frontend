import React from "react";
import { Skeleton, Grid, Stack } from "@mui/material";
import { BouncingSkeleton } from "../styles/StyledComponents";

export const LayoutLoader = () => {
  return (
    <Grid container style={{ height: "calc(100vh - 4rem)" }} spacing={1}>
      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        sx={{
          display: { xs: "none", md: "block" },
        }}
        height="100%"
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} lg={6} height="100%">
        <Stack spacing={"1rem"}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={"5rem"} />
          ))}
        </Stack>
      </Grid>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
          // padding: "2rem",
          
          marginTop:"0.7rem",
          bgcolor: "rgba(0,0,0,0.85)",
        }}
        height="100%"
      >
        <Skeleton variant="rectangular" height={"100vh"}  />
      </Grid>
    </Grid>
  );
};

export const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.5rem"}
      direction={"row"}
      padding={"0.5rem"}
      justifyContent={"center"}
    >
      <BouncingSkeleton variant="circular" width={10} height={10} style={{animationDelay:"0.1s"}}/>
      <BouncingSkeleton variant="circular" width={10} height={10} style={{animationDelay:"0.2s"}}/>
      <BouncingSkeleton variant="circular" width={10} height={10} style={{animationDelay:"0.4s"}}/>
      <BouncingSkeleton variant="circular" width={10} height={10} style={{animationDelay:"0.6s"}}/>

    </Stack>
  );
};
