import { Box, Grid } from "@mui/material";

import SoftTypography from "components/SoftTypography";

const NotFound404 = () => {
  return (
    <Box
      bgcolor={"#000"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
      color={"#fff"}
    >
      <Grid
        container
        sx={{ maxWidth: "500px" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item md={3} lg={3} sm={3} borderRight={"2px solid #fff"}>
          <SoftTypography variant="h1" color="light">
            404
          </SoftTypography>
        </Grid>
        <Grid
          item
          md={8}
          lg={8}
          sm={8}
          marginLeft={"16px"}
          textAlign={"center"}
          verticalAlign="medium"
        >
          <SoftTypography
            variant="caption"
            color="light"
            textWeight="medium"
            noWrap
            verticalAlign="medium"
          >
            Página não encontrada
          </SoftTypography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotFound404;
