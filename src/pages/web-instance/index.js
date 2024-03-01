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
import {
  Grid,
  Icon,
  Link,
  Menu,
  MenuItem,
  Tooltip,
  ListItem,
  Alert,
} from "@mui/material";
import Card from "@mui/material/Card";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AuthService } from "services/api/orangeApi/endpoints/AuthService";
import { WebInstanceService } from "services/api/orangeApi/endpoints/WebInstanceService";
import io from "socket.io-client";
import { handleErrorResponse } from "utils/handleResponses";
import { removeCharacterFromPhone, validPhoneFormat } from "utils/phone.utils";
import { copyText, textResume } from "utils/text.utils";

import { useState } from "react";
import toast from "react-hot-toast";
import { PhoneInput } from "react-international-phone";
import { useMutation, useQueries } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "react-spinner-loader";

// Data
// Orange API examples
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { ModalActionConfirmation } from "components/ModalActionConfirmation";
// Orange API components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";

import ModalSendMessage from "./components/ModalSendMessage";

dayjs.extend(relativeTime);
function WebInstance() {
  const [menu, setMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const [paid, setPaid] = useState(false);
  const [connected, setConnected] = useState(false);
  const [timeoutIntervalId, setTimeoutIntervalId] = useState();

  const [isTrial, setIsTrial] = useState(false);

  const [openSendMessage, setOpenSendMessage] = useState(false);
  const { webInstanceId } = useParams();

  const [confirmationDetails, setConfirmationDetails] = useState(null);

  const [connectWithPhoneNumber, setConnectWithPhoneNumber] = useState(false);

  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const queries = useQueries([
    {
      queryFn: () => {
        return WebInstanceService.findOne(webInstanceId);
      },
      queryKey: `web-instance-${webInstanceId}`,
      onError: (e) => {
        handleErrorResponse(
          "Não foi possível obter a instância",
          e.response?.data
        );
      },
      onSuccess: (data) => {
        setPaid(data.paid);
        setIsTrial(data.isTrial);
        setConnected(data.state.id == 1);
        if (data.state.id == 3 || data.state.id == 2) connectWebInstance(data);
      },
    },
    {
      queryFn: () => {
        return AuthService.me();
      },
      queryKey: `auth-me`,
      onError: (e) => {
        handleErrorResponse(
          "Não foi possível obter o usuário logado",
          e.response?.data
        );
      },
    },
  ]);

  const {
    isLoading: isLoadingWebInstance,
    data: webInstance,
    refetch: refetchWebInstance,
  } = queries[0];
  const { data: user } = queries[1];

  const {
    mutate: connectWebInstance,
    data: qrCodeData,
    isLoading: isLoadingQrCode,
    reset: resetQrCodeData,
  } = useMutation({
    mutationFn: (body) =>
      WebInstanceService.connect(body.id, {
        qrCode: !connectWithPhoneNumber,
        phoneNumber: body.phoneNumber || "",
      }),
    onError: (e) => {
      handleErrorResponse(
        "Não foi possível conectar a instância web",
        e.response?.data
      );
    },
    onSuccess: (_, request) => {
      const socket = io("http://localhost:3456");
      if (timeoutIntervalId) {
        clearInterval(timeoutIntervalId);
      }
      const timeoutId = setInterval(
        () =>
          connectWebInstance({
            id: request.id,
            phoneNumber: connectWithPhoneNumber
              ? removeCharacterFromPhone(phone)
              : "",
          }),
        40000
      );
      setTimeoutIntervalId(timeoutId);
      socket.on("web-instance/connected", (message) => {
        clearInterval(timeoutId);
        refetchWebInstance();
        toast.success("Instância conectou com sucesso!");
        socket.close();
      });
      socket.emit("web-instance/connect", {
        instanceName: request.instanceName,
        userId: user.id,
      });
    },
  });

  const { mutate: disconnectWebInstance } = useMutation({
    mutationFn: () => WebInstanceService.disconnect(webInstance.id),
    onError: (e) => {
      handleErrorResponse(
        "Não foi possível desconectar a instância web",
        e.response?.data
      );
    },
    onSuccess: () => {
      refetchWebInstance();
    },
  });

  const { mutate: deleteWebInstance } = useMutation({
    mutationFn: () => WebInstanceService.delete(webInstance.id),
    onError: (e) => {
      handleErrorResponse(
        "Não foi possível excluir a instância web",
        e.response?.data
      );
    },
    onSuccess: () => {
      navigate("/web-instances");
    },
  });

  const handleConnectWithPhone = () => {
    const phoneIsValid = validPhoneFormat(phone);
    if (!phoneIsValid) {
      toast.error("Formato de telefone inválido");
      return;
    }
    const phoneFormatted = removeCharacterFromPhone(phone);
    connectWebInstance({ id: webInstance.id, phoneNumber: phoneFormatted });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      {webInstance ? (
        <SoftBox py={3}>
          <SoftBox mb={3} pt={2} px={2}>
            <Card
              sx={{ padding: "16px", display: "flex", flexDirection: "row" }}
            >
              <div style={{ flex: 1 }}>
                {paid || isTrial ? (
                  <SoftBox>
                    <SoftTypography
                      fontWeight="bold"
                      variant="h6"
                      display="flex"
                      justifyContent="space-between"
                    >
                      1. Dados da instância webInstanceName
                      <SoftBox color="text" px={2}>
                        <Icon
                          sx={{ cursor: "pointer", fontWeight: "bold" }}
                          fontSize="small"
                          onClick={openMenu}
                        >
                          more_vert
                        </Icon>
                      </SoftBox>
                    </SoftTypography>
                    <SoftTypography variant="caption">
                      Essas são suas informações para integração com esta
                      instância, não compartilhe essas informações.
                    </SoftTypography>
                    <Grid container spacing={1} mt={3}>
                      <Grid
                        item
                        sm={12}
                        md={!connected ? 7 : 12}
                        display={"flex"}
                      >
                        <Grid container spacing={2} alignItems={"center"}>
                          <Grid
                            item
                            sm={12}
                            md={12}
                            display="flex"
                            flexDirection="column"
                            sx={{ maxHeight: "max-content" }}
                            width={"100%"}
                          >
                            <SoftBox
                              pt={1}
                              mb={1}
                              display="flex"
                              alignItems="center"
                            >
                              <SoftTypography variant="caption" color="text">
                                API da instância
                              </SoftTypography>
                              <Tooltip title="Copiar texto">
                                <button>
                                  <Icon fontSize="small" color="secondary">
                                    copy
                                  </Icon>
                                </button>
                              </Tooltip>
                            </SoftBox>

                            <SoftBox mb={0}>
                              <SoftInput
                                type="text"
                                icon={{
                                  component: "storage",
                                  direction: "left",
                                }}
                                value={webInstance.serverUrl}
                                disabled
                              ></SoftInput>
                            </SoftBox>
                          </Grid>

                          <Grid
                            item
                            sm={12}
                            md={6}
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
                                  icon={{
                                    component: "grid_3x3",
                                    direction: "left",
                                  }}
                                  placeholder="Nome"
                                  value={textResume(
                                    webInstance.instanceName,
                                    20
                                  )}
                                  disabled
                                ></SoftInput>
                              </SoftBox>
                            </SoftBox>
                          </Grid>

                          <Grid
                            item
                            sm={12}
                            md={6}
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
                            </SoftBox>

                            <SoftBox mb={0}>
                              <SoftInput
                                type="text"
                                icon={{ component: "link", direction: "left" }}
                                placeholder="Nome"
                                value={textResume(webInstance.token, 20)}
                                disabled
                              ></SoftInput>
                            </SoftBox>
                          </Grid>

                          <Grid item md={12} sm={12}>
                            <SoftBox mt="16px">
                              <SoftTypography fontWeight="bold" variant="h6">
                                2. Assinatura
                              </SoftTypography>
                              <SoftBox>
                                <SoftTypography
                                  fontWeight="bold"
                                  variant="caption"
                                >
                                  Status atual:{" "}
                                </SoftTypography>
                                <SoftTypography
                                  fontWeight="bold"
                                  variant="button"
                                  color={
                                    isTrial
                                      ? "primary"
                                      : paid
                                      ? "success"
                                      : "error"
                                  }
                                >
                                  {isTrial
                                    ? "AVALIAÇÃO GRATUITA"
                                    : paid
                                    ? "PAGO"
                                    : "PENDENTE ASSINATURA"}
                                </SoftTypography>
                              </SoftBox>
                              <SoftBox>
                                <SoftTypography
                                  fontWeight="medium"
                                  variant="caption"
                                >
                                  <SoftTypography
                                    fontWeight="bold"
                                    variant="caption"
                                  >
                                    Expira em:{" "}
                                  </SoftTypography>
                                  <SoftTypography
                                    fontWeight="medium"
                                    variant="caption"
                                  >
                                    {new Date(webInstance.dueDate) < new Date()
                                      ? "Expirado!"
                                      : dayjs(webInstance.dueDate).fromNow(
                                          true
                                        )}
                                  </SoftTypography>
                                </SoftTypography>
                              </SoftBox>
                            </SoftBox>
                            <SoftBox mt="8px">
                              <SoftButton color={"info"}>Assinar</SoftButton>
                            </SoftBox>
                          </Grid>
                        </Grid>
                      </Grid>
                      {!connected && (
                        <Grid item sm={12} md={5}>
                          <Grid
                            container
                            justifyContent={"center"}
                            textAlign={"center"}
                          >
                            <Grid mt="16px" sm={12} item>
                              <SoftTypography
                                fontWeight="bold"
                                variant="hr"
                                color="dark"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap={2}
                              >
                                {connectWithPhoneNumber
                                  ? "Conectar via telefone"
                                  : "Leia o QRCode"}
                              </SoftTypography>
                            </Grid>
                            <Grid item sm={12} md={10} maxWidth={"200px"}>
                              <SoftTypography variant="caption">
                                {connectWithPhoneNumber
                                  ? "Conecte sua instância pelo número de telefone"
                                  : "Abra o aplicativo do whatsApp e leia o QRCode abaixo para se conectar a esta instância"}
                              </SoftTypography>
                            </Grid>

                            <Grid item md={12} sm={6} mt={2}>
                              {connectWithPhoneNumber ? (
                                <>
                                  {qrCodeData ? (
                                    <Grid item md={12}>
                                      <SoftBox
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                      >
                                        <SoftTypography variant="caption">
                                          Número: {phone}
                                        </SoftTypography>
                                        <SoftButton
                                          onClick={() => resetQrCodeData()}
                                          variant="text"
                                          color="dark"
                                        >
                                          Alterar
                                        </SoftButton>
                                      </SoftBox>
                                      <SoftBox>
                                        <SoftTypography
                                          variant="caption"
                                          display="flex"
                                          justifyContent="center"
                                          alignItems="center"
                                        >
                                          Código:
                                          <Tooltip title="Copiar código">
                                            <button
                                              onClick={() =>
                                                copyText(qrCodeData.pairingCode)
                                              }
                                            >
                                              <Icon
                                                fontSize="small"
                                                color="secondary"
                                              >
                                                copy
                                              </Icon>
                                            </button>
                                          </Tooltip>
                                        </SoftTypography>

                                        <SoftTypography
                                          variant="h4"
                                          fontWeight="bold"
                                        >
                                          {qrCodeData.pairingCode}
                                        </SoftTypography>
                                      </SoftBox>
                                      <Alert
                                        variant="outlined"
                                        severity="info"
                                        sx={{
                                          marginTop: "16px",
                                          fontSize: "12px",
                                          textAlign: "center",
                                        }}
                                      >
                                        <ListItem>
                                          1. Abre o aplicativo do{" "}
                                          <i>Whatsapp</i>;
                                        </ListItem>
                                        <ListItem>
                                          2. No menu, selecione &nbsp;{" "}
                                          <b>Aparelhos conectados</b>;
                                        </ListItem>
                                        <ListItem>
                                          3. Clique em{" "}
                                          <b>&nbsp;Conectar um aparelho</b>;
                                        </ListItem>
                                        <ListItem>
                                          4. Selecione "Conectar com número de
                                          telefone" e digite seu código.
                                        </ListItem>
                                      </Alert>
                                    </Grid>
                                  ) : isLoadingQrCode ? (
                                    <Loader show={isLoadingQrCode}></Loader>
                                  ) : (
                                    <>
                                      <PhoneInput
                                        value={phone}
                                        onChange={(phone) => setPhone(phone)}
                                        defaultCountry="br"
                                        style={{
                                          justifyContent: "center",
                                          maxWidth: "250px",
                                          margin: "0 auto",
                                        }}
                                      />
                                      <SoftTypography variant="caption">
                                        Obs: Em caso de erro, tente solicitar o
                                        código sem o nono digito.
                                      </SoftTypography>
                                      <SoftBox style={{ marginTop: "16px" }}>
                                        <SoftButton
                                          variant="contained"
                                          color="success"
                                          circular
                                          disabled={!phone}
                                          onClick={handleConnectWithPhone}
                                        >
                                          Solicitar código
                                        </SoftButton>
                                      </SoftBox>
                                    </>
                                  )}
                                </>
                              ) : qrCodeData ? (
                                <img
                                  alt="QR CODE para conectar instância"
                                  src={qrCodeData.base64}
                                  width={"50%"}
                                />
                              ) : (
                                <Loader show={isLoadingQrCode}></Loader>
                              )}
                            </Grid>

                            <Grid item sm={12} sx={{ marginTop: "24px" }}>
                              <SoftButton
                                variant="text"
                                color="info"
                                onClick={() => {
                                  setConnectWithPhoneNumber(
                                    !connectWithPhoneNumber
                                  );
                                  if (!connectWithPhoneNumber) {
                                    resetQrCodeData();
                                    clearInterval(timeoutIntervalId);
                                  } else {
                                    connectWebInstance({ id: webInstance.id });
                                  }
                                }}
                                disabled={isLoadingQrCode}
                              >
                                {connectWithPhoneNumber
                                  ? "Conectar com QR Code"
                                  : "Conectar com o número de telefone"}
                              </SoftButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </SoftBox>
                ) : (
                  <>
                    <SoftBox>
                      <SoftTypography fontWeight="bold" variant="h6">
                        1. Realize o pagamento
                      </SoftTypography>
                      <SoftTypography fontWeight="medium" variant="caption">
                        Para utilizar essa instância é necessário realizar o
                        pagamento da mesma. O valor é de R$ 99,00
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox mt="16px">
                      <SoftTypography fontWeight="bold" variant="h6">
                        2. Assinatura
                      </SoftTypography>
                      <SoftBox>
                        <SoftTypography fontWeight="bold" variant="caption">
                          Status atual:{" "}
                        </SoftTypography>
                        <SoftTypography
                          fontWeight="bold"
                          variant="button"
                          color="error"
                        >
                          PENDENTE ASSINATURA
                        </SoftTypography>
                      </SoftBox>
                      <SoftBox>
                        <SoftTypography fontWeight="medium" variant="caption">
                          <SoftTypography fontWeight="bold" variant="caption">
                            Expira em:{" "}
                          </SoftTypography>
                          <SoftTypography fontWeight="medium" variant="caption">
                            Expirado!
                          </SoftTypography>
                        </SoftTypography>
                      </SoftBox>
                    </SoftBox>
                    <SoftBox mt="8px">
                      <SoftButton color={"info"}>Assinar</SoftButton>
                    </SoftBox>
                  </>
                )}
              </div>

              <Menu
                id="simple-menu"
                anchorEl={menu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(menu)}
                onClose={closeMenu}
              >
                <MenuItem onClick={closeMenu}>
                  {" "}
                  <Link
                    href={`/web-instances/4260ea235/edit`}
                    sx={{ display: "flex" }}
                  >
                    <SoftTypography color="text" px={2} display="flex">
                      <Icon sx={{ cursor: "pointer" }} fontSize="small">
                        edit
                      </Icon>
                    </SoftTypography>
                    Editar
                  </Link>
                </MenuItem>
                <MenuItem onClick={closeMenu}>
                  <Link
                    href={`/web-instances/4260ea235/payment`}
                    sx={{ display: "flex" }}
                  >
                    <SoftTypography color="text" px={2} display="flex">
                      <Icon sx={{ cursor: "pointer" }} fontSize="small">
                        credit_card
                      </Icon>
                    </SoftTypography>
                    Pagamentos
                  </Link>
                </MenuItem>
                {connected && (
                  <MenuItem
                    onClick={() => {
                      closeMenu();
                      setOpen(true);
                      setConfirmationDetails({
                        title: "Realmente deseja reiniciar esta instância",
                      });
                    }}
                  >
                    {" "}
                    <SoftBox color="text" px={2} display="flex">
                      <Icon sx={{ cursor: "pointer" }} fontSize="small">
                        restart_alt
                      </Icon>
                    </SoftBox>
                    Reiniciar
                  </MenuItem>
                )}
                {connected && (
                  <MenuItem
                    onClick={() => {
                      closeMenu();
                      setOpen(true);
                      setConfirmationDetails({
                        title: "Realmente deseja desconectar esta instância",
                        actionDescription: "Desconectar",
                        action: disconnectWebInstance,
                      });
                    }}
                  >
                    {" "}
                    <SoftBox color="text" px={2} display="flex">
                      <Icon sx={{ cursor: "pointer" }} fontSize="small">
                        power_off
                      </Icon>
                    </SoftBox>
                    Desconectar
                  </MenuItem>
                )}
                {connected && (
                  <MenuItem
                    onClick={() => {
                      closeMenu();
                      setOpenSendMessage(true);
                    }}
                  >
                    {" "}
                    <SoftBox color="text" px={2} display="flex">
                      <Icon sx={{ cursor: "pointer" }} fontSize="small">
                        send
                      </Icon>
                    </SoftBox>
                    Enviar mensagem
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    closeMenu();
                    setOpen(true);
                    setConfirmationDetails({
                      title: "Realmente deseja excluir",
                      description:
                        "A instância web será excluída, porém a assinatura não será reembolsada, permanecendo ativa até o momento do vencimento",
                      typeSecurity: true,
                      actionDescription: "Excluir",
                      action: deleteWebInstance,
                    });
                  }}
                >
                  {" "}
                  <SoftBox color="text" px={2} display="flex">
                    <Icon sx={{ cursor: "pointer" }} fontSize="small">
                      delete_outlined
                    </Icon>
                  </SoftBox>
                  Excluir
                </MenuItem>
              </Menu>
            </Card>
          </SoftBox>
        </SoftBox>
      ) : (
        <Loader show={isLoadingWebInstance}></Loader>
      )}

      <Footer />
      {open && (
        <ModalActionConfirmation
          title={confirmationDetails?.title}
          handleModal={{ onClose: () => setOpen(false), open: open }}
          description={confirmationDetails?.description}
          typeSecurity={confirmationDetails?.typeSecurity}
          handleAction={confirmationDetails.action}
          actionDescription={confirmationDetails.actionDescriptionc}
        ></ModalActionConfirmation>
      )}
      <ModalSendMessage
        handleModal={{
          onClose: () => setOpenSendMessage(false),
          open: openSendMessage,
        }}
      />
    </DashboardLayout>
  );
}

export default WebInstance;
