/**
=========================================================
* Orange APi - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// @mui material components
import StorageIcon from "@mui/icons-material/Storage";
import { Grid, Link, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Switch from "@mui/material/Switch";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import { textResume } from "utils/text.utils";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

// Data
// Orange APi examples
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Orange APi components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <SoftBox>{children}</SoftBox>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function WebInstanceForm() {
  const params = useParams();
  const webInstanceId = params["webInstanceId"];
  const [value, setValue] = useState(0);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const copyTextToClipboard = async (field) => {
    await navigator.clipboard.writeText(field);
  };

  const onSubmit = (data) => {
    console.log(datas);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SoftBox py={3}>
        <SoftBox sx={{ width: "50%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Instância" {...a11yProps(0)} />
            <Tab label="Web hooks" {...a11yProps(1)} />
          </Tabs>
        </SoftBox>
        <CustomTabPanel value={value} index={0} style={{ padding: 0 }}>
          <Card component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <SoftBox
              display="flex"
              gap="16px"
              sx={{ padding: "16px", flexDirection: "column", gap: "4px" }}
            >
              <SoftTypography color="dark">
                1. Dados da instância
              </SoftTypography>
              <Grid container spacing={2}>
                <Grid
                  item
                  sm={12}
                  md={4}
                  display="flex"
                  flexDirection="column"
                  height="100%"
                  width={"100%"}
                >
                  <SoftBox pt={1} mb={1} display="flex" alignItems="center">
                    <SoftTypography variant="caption" color="text">
                      Nome da instância <span>*</span>
                    </SoftTypography>
                    <button style={{ cursor: "auto" }}>
                      <Icon
                        fontSize="small"
                        color="inherit"
                        style={{ visibility: "hidden" }}
                      >
                        copy
                      </Icon>
                    </button>
                  </SoftBox>

                  <SoftBox mb={0}>
                    <SoftInput
                      type="text"
                      icon={{ component: "storage", direction: "left" }}
                      placeholder="Nome"
                      {...register("name", { required: true })}
                      error={!!errors.name}
                    ></SoftInput>
                  </SoftBox>
                </Grid>

                <Grid
                  item
                  sm={12}
                  md={4}
                  display="flex"
                  flexDirection="column"
                  width={"100%"}
                >
                  <SoftBox
                    pt={1}
                    mb={1}
                    display="flex"
                    gap="4px"
                    alignItems="center"
                  >
                    <SoftTypography variant="caption" color="text">
                      ID da instância{" "}
                    </SoftTypography>
                    <Tooltip title="Copiar texto">
                      <button>
                        <Icon fontSize="small" color="secondary">
                          copy
                        </Icon>
                      </button>
                    </Tooltip>
                  </SoftBox>

                  <SoftBox>
                    <SoftBox mb={0}>
                      <SoftInput
                        type="text"
                        icon={{ component: "storage", direction: "left" }}
                        placeholder="Nome"
                        value={textResume(webInstanceId, 30)}
                        disabled={!!webInstanceId}
                        {...register("webInstanceId", { required: true })}
                        error={!!errors.webInstanceId}
                      ></SoftInput>
                    </SoftBox>
                  </SoftBox>
                </Grid>

                <Grid
                  item
                  sm={12}
                  md={4}
                  display="flex"
                  flexDirection="column"
                  width={"100%"}
                >
                  <SoftBox
                    pt={1}
                    mb={1}
                    display="flex"
                    gap="4px"
                    alignItems="center"
                  >
                    <SoftTypography variant="caption" color="text">
                      Token de integração{" "}
                    </SoftTypography>
                    <Tooltip title="Copiar texto">
                      <button>
                        <Icon fontSize="small" color="secondary">
                          copy
                        </Icon>
                      </button>
                    </Tooltip>
                    <Link
                      variant="caption"
                      color="inherit"
                      href="#"
                      underline="always"
                      textAlign={"end"}
                      flex={"auto"}
                    >
                      Gerar novo token{" "}
                    </Link>
                  </SoftBox>

                  <SoftBox mb={0}>
                    <SoftInput
                      type="text"
                      icon={{ component: "link", direction: "left" }}
                      placeholder="Nome"
                      value={textResume(webInstanceId, 30)}
                      disabled={!!webInstanceId}
                      {...register("webInstanceToken", { required: true })}
                      error={!!errors.webInstanceToken}
                    ></SoftInput>
                  </SoftBox>
                </Grid>
              </Grid>
            </SoftBox>
            <SoftBox
              display="flex"
              gap="16px"
              sx={{ padding: "16px", flexDirection: "column", gap: "4px" }}
            >
              <SoftTypography color="dark">2. Configurações</SoftTypography>
              <Grid container spacing={2}>
                <Grid
                  item
                  sm={12}
                  md={4}
                  display="flex"
                  flexDirection="column"
                  height="100%"
                  width={"100%"}
                >
                  <SoftBox
                    pt={1}
                    mb={1}
                    display="flex"
                    alignItems="center"
                    gap="8px"
                  >
                    <Switch {...register("rejectCall")} id="rejectCall" />
                    <SoftTypography
                      variant="caption"
                      component="label"
                      htmlFor="rejectCall"
                    >
                      Rejeitar chamadas automático
                    </SoftTypography>
                  </SoftBox>
                </Grid>

                <Grid
                  item
                  sm={12}
                  md={4}
                  display="flex"
                  flexDirection="column"
                  width={"100%"}
                >
                  <SoftBox
                    pt={1}
                    mb={1}
                    display="flex"
                    alignItems="center"
                    gap="8px"
                  >
                    <Switch {...register("readMessages")} id="readMessages" />
                    <SoftTypography
                      variant="caption"
                      component="label"
                      htmlFor="readMessages"
                    >
                      Ler mensagens automático
                    </SoftTypography>
                  </SoftBox>
                </Grid>
              </Grid>
            </SoftBox>
            <SoftButton
              color="dark"
              type="submit"
              style={{ transform: "scale(1.02", marginTop: "16px" }}
            >
              {"Salvar"}
            </SoftButton>
          </Card>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Web hooks
        </CustomTabPanel>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default WebInstanceForm;
