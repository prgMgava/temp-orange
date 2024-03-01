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
import { Grid, Link, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Switch from "@mui/material/Switch";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import { WebInstanceService } from "services/api/orangeApi/endpoints/WebInstanceService";
import { handleErrorResponse } from "utils/handleResponses";
import { isEmpty } from "utils/object.utils";
import { copyText, textResume } from "utils/text.utils";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueries } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "react-spinner-loader";
import uuid from "react-uuid";

// Data
// Orange API examples
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Orange API components
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
  const navigate = useNavigate();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm();

  const rejectCallWatch = useWatch({ control, name: "rejectCall" });
  const readMessagesWatch = useWatch({ control, name: "readMessages" });

  const queries = useQueries([
    {
      queryFn: () => {
        if (webInstanceId) {
          return WebInstanceService.findOne(webInstanceId);
        }
        return {};
      },
      queryKey: `web-instance-${webInstanceId}`,
      onError: (e) => {
        handleErrorResponse(
          "Não foi possível obter a instância",
          e.response?.data
        );
      },
      onSuccess: (data) => {
        reset({
          name: data.name,
          rejectCall: data.settings?.rejectCall,
          readMessages: data.settings?.readMessages,
          whChatPresence: data.settings?.whChatPresence,
          whConnecting: data.settings?.whConnecting,
          whDisconnecting: data.settings?.whDisconnecting,
          whReceiving: data.settings?.whReceiving,
          whSending: data.settings?.whSending,
          whStatusMessage: data.settings?.whStatusMessage,
          defaultResponseMessage: data.settings?.defaultResponseMessage,
        });
      },
    },
  ]);

  const { isLoading: isLoadingWebInstance, data: webInstance } = queries[0];

  const { mutate: updateWebInstance } = useMutation({
    mutationFn: (body) =>
      WebInstanceService.update(body.webInstanceId, body.data),
    onError: (e) => {
      handleErrorResponse(
        "Algo inesperado aconteceu ao tentar editar a instância",
        e.response.data
      );
    },
    onSuccess: (data, body) => {
      toast.success("Instância editada com sucesso");
      navigate(`/web-instances/${webInstance.id}`);
    },
  });

  const { mutate: registerWebInstance } = useMutation({
    mutationFn: (body) => WebInstanceService.register(body),
    onError: (e) => {
      handleErrorResponse(
        "Algo inesperado aconteceu ao tentar criar uma instância",
        e.response.data
      );
    },
    onSuccess: (data, body) => {
      toast.success("Instância criada com sucesso");
      navigate(`/web-instances/${data.id}`);
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmit = (data) => {
    const { name, ...settings } = data;
    const body = {
      name: name,
      settings: { ...settings },
    };
    if (webInstanceId) {
      updateWebInstance({ webInstanceId, data: body });
    } else {
      registerWebInstance(body);
    }
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
            <Tab
              label={isEmpty(errors) ? "Instância *" : "Instância"}
              {...a11yProps(0)}
            />
            <Tab label="Web hooks" {...a11yProps(1)} />
          </Tabs>
        </SoftBox>
        <CustomTabPanel value={value} index={0} style={{ padding: 0 }}>
          {!webInstance ? (
            <Loader show={isLoadingWebInstance}></Loader>
          ) : (
            <Card>
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
                      <SoftTypography
                        variant="caption"
                        color="text"
                        component="label"
                        htmlFor="name"
                      >
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
                        id="name"
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
                        <button onClick={() => copyText(webInstance.id)}>
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
                          icon={{ component: "grid_3x3", direction: "left" }}
                          value={webInstance.id}
                          disabled
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
                        <button onClick={() => copyText(webInstance.token)}>
                          <Icon fontSize="small" color="secondary">
                            copy
                          </Icon>
                        </button>
                      </Tooltip>
                      {/* <Link
                        variant="caption"
                        color="inherit"
                        href="#"
                        underline="always"
                        textAlign={"end"}
                        flex={"auto"}
                      >
                        Gerar novo token{" "}
                      </Link> */}
                    </SoftBox>

                    <SoftBox mb={0}>
                      <SoftInput
                        type="text"
                        icon={{ component: "link", direction: "left" }}
                        disabled
                        value={webInstance.token}
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
                      <Switch
                        {...register("rejectCall")}
                        id="rejectCall"
                        checked={rejectCallWatch}
                      />
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
                      <Switch
                        {...register("readMessages")}
                        id="readMessages"
                        checked={readMessagesWatch}
                      />
                      <SoftTypography
                        variant="caption"
                        component="label"
                        htmlFor="readMessages"
                      >
                        Ler mensagens automático
                      </SoftTypography>
                    </SoftBox>
                  </Grid>

                  {rejectCallWatch && (
                    <Grid
                      item
                      sm={12}
                      md={12}
                      display="flex"
                      flexDirection="column"
                      width={"100%"}
                    >
                      <SoftBox mb={0}>
                        <SoftInput
                          type="text"
                          icon={{ component: "sms", direction: "left" }}
                          placeholder="Mensagem de resposta padrão"
                          {...register("defaultResponseMessage")}
                        ></SoftInput>
                      </SoftBox>
                    </Grid>
                  )}
                </Grid>
              </SoftBox>
              <SoftButton
                color="dark"
                type="button"
                style={{ transform: "scale(1.02", marginTop: "16px" }}
                onClick={() => setValue(1)}
              >
                {"Continuar"}
              </SoftButton>
            </Card>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Card component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <SoftBox
              display="flex"
              gap="16px"
              sx={{ padding: "16px", flexDirection: "column", gap: "4px" }}
            >
              <SoftTypography color="dark">
                3. Configure webhooks
              </SoftTypography>
              <SoftTypography color="dark" variant="caption">
                Se quiser, você pode configurar webhooks para sua instância,
                isso te permite ouvir eventos dela.
              </SoftTypography>
              <Grid container spacing={2} mt={1}>
                <Grid
                  item
                  sm={12}
                  md={6}
                  display="flex"
                  flexDirection="column"
                  height="100%"
                  width={"100%"}
                >
                  <SoftBox pt={1} mb={1} display="flex" alignItems="center">
                    <SoftTypography
                      variant="caption"
                      color="text"
                      component="label"
                      htmlFor="whSending"
                    >
                      Ao enviar
                    </SoftTypography>
                  </SoftBox>

                  <SoftBox mb={0}>
                    <SoftInput
                      type="text"
                      icon={{
                        component: "keyboard_double_arrow_right",
                        direction: "left",
                      }}
                      {...register("whSending")}
                      id="whSending"
                    ></SoftInput>
                  </SoftBox>
                </Grid>

                <Grid
                  item
                  sm={12}
                  md={6}
                  display="flex"
                  flexDirection="column"
                  height="100%"
                  width={"100%"}
                >
                  <SoftBox pt={1} mb={1} display="flex" alignItems="center">
                    <SoftTypography
                      variant="caption"
                      color="text"
                      component="label"
                      htmlFor="whReceiving"
                    >
                      Ao receber
                    </SoftTypography>
                  </SoftBox>

                  <SoftBox mb={0}>
                    <SoftInput
                      type="text"
                      icon={{
                        component: "keyboard_double_arrow_left",
                        direction: "left",
                      }}
                      {...register("whReceiving")}
                      id="whReceiving"
                    ></SoftInput>
                  </SoftBox>
                </Grid>

                <Grid
                  item
                  sm={12}
                  md={6}
                  display="flex"
                  flexDirection="column"
                  height="100%"
                  width={"100%"}
                >
                  <SoftBox pt={1} mb={1} display="flex" alignItems="center">
                    <SoftTypography
                      variant="caption"
                      color="text"
                      component="label"
                      htmlFor="whChatPresence"
                    >
                      Presença de chat
                    </SoftTypography>
                  </SoftBox>

                  <SoftBox mb={0}>
                    <SoftInput
                      type="text"
                      icon={{ component: "chat_bubble", direction: "left" }}
                      {...register("whChatPresence")}
                      id="whChatPresence"
                    ></SoftInput>
                  </SoftBox>
                </Grid>

                <Grid
                  item
                  sm={12}
                  md={6}
                  display="flex"
                  flexDirection="column"
                  height="100%"
                  width={"100%"}
                >
                  <SoftBox pt={1} mb={1} display="flex" alignItems="center">
                    <SoftTypography
                      variant="caption"
                      color="text"
                      component="label"
                      htmlFor="whStatusMessage"
                    >
                      Receber status da mensagem
                    </SoftTypography>
                  </SoftBox>

                  <SoftBox mb={0}>
                    <SoftInput
                      type="text"
                      icon={{ component: "mark_chat_read", direction: "left" }}
                      {...register("whStatusMessage")}
                      id="whStatusMessage"
                    ></SoftInput>
                  </SoftBox>
                </Grid>

                <Grid
                  item
                  sm={12}
                  md={6}
                  display="flex"
                  flexDirection="column"
                  height="100%"
                  width={"100%"}
                >
                  <SoftBox pt={1} mb={1} display="flex" alignItems="center">
                    <SoftTypography
                      variant="caption"
                      color="text"
                      component="label"
                      htmlFor="whConnecting"
                    >
                      Ao conectar
                    </SoftTypography>
                  </SoftBox>

                  <SoftBox mb={0}>
                    <SoftInput
                      type="text"
                      icon={{ component: "power", direction: "left" }}
                      {...register("whConnecting")}
                      id="whConnecting"
                    ></SoftInput>
                  </SoftBox>
                </Grid>

                <Grid
                  item
                  sm={12}
                  md={6}
                  display="flex"
                  flexDirection="column"
                  height="100%"
                  width={"100%"}
                >
                  <SoftBox pt={1} mb={1} display="flex" alignItems="center">
                    <SoftTypography
                      variant="caption"
                      color="text"
                      component="label"
                      htmlFor="whDisconnecting"
                    >
                      Ao desconectar
                    </SoftTypography>
                  </SoftBox>

                  <SoftBox mb={0}>
                    <SoftInput
                      type="text"
                      icon={{ component: "power_off", direction: "left" }}
                      {...register("whDisconnecting")}
                      id="whDisconnecting"
                    ></SoftInput>
                  </SoftBox>
                </Grid>
              </Grid>
            </SoftBox>

            <SoftButton
              color="dark"
              type={value == 0 ? "button" : "submit"}
              style={{ transform: "scale(1.02", marginTop: "16px" }}
              onClick={() => setValue(1)}
              disabled={!isValid}
            >
              {value == 0 ? "Continuar" : webInstanceId ? "Editar" : "Salvar"}
            </SoftButton>
          </Card>
        </CustomTabPanel>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default WebInstanceForm;
