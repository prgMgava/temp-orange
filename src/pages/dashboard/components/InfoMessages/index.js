/**
=========================================================
* Orange API - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// @mui material components
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Orange API components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function InfoMessages() {
  return (
    <Card sx={{ height: "100%" }}>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <SoftBox position="relative" height="100%" p={2}>
            <SoftBox
              display="flex"
              flexDirection="column"
              height="100%"
              py={2}
              px={2}
              borderRadius="lg"
              bgColor="info"
            >
              <SoftBox mb={3} pt={1}>
                <SoftTypography
                  variant="h5"
                  color="white"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  gap="4px"
                >
                  <KeyboardDoubleArrowRightIcon /> Total enviado
                </SoftTypography>
              </SoftBox>
              <SoftBox mb={2}>
                <SoftTypography variant="body2" color="white">
                  356 mensagens
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} lg={6}>
          <SoftBox position="relative" height="100%" p={2}>
            <SoftBox
              display="flex"
              flexDirection="column"
              height="100%"
              py={2}
              px={2}
              borderRadius="lg"
              bgColor="primary"
            >
              <SoftBox mb={3} pt={1}>
                <SoftTypography
                  variant="h5"
                  color="white"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  gap="4px"
                >
                  <KeyboardDoubleArrowLeftIcon /> Total recebido
                </SoftTypography>
              </SoftBox>
              <SoftBox mb={2}>
                <SoftTypography variant="body2" color="white">
                  1401 mensagens
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Grid>
      </Grid>
    </Card>
  );
}

export default InfoMessages;
