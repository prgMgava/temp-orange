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
import {
  Box,
  Grid,
  Icon,
  Link,
  Menu,
  MenuItem,
  Tooltip,
  List,
  ListItem,
  Alert,
  Switch,
} from "@mui/material";
import Card from "@mui/material/Card";
import { textResume } from "utils/text.utils";

import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import { useParams } from "react-router-dom";

// Data
// Orange APi examples
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { ModalActionConfirmation } from "components/ModalActionConfirmation";
// Orange APi components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";

function WebInstance() {
  const [menu, setMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const [paid, setPaid] = useState(true);

  const [connectWithPhoneNumber, setConnectWithPhoneNumber] = useState(true);
  const params = useParams();
  const webInstanceId = params["webInstanceId"];
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("");

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SoftBox py={3}>
        <SoftBox mb={3} pt={2} px={2}>
          <Card sx={{ padding: "16px", display: "flex", flexDirection: "row" }}>
            <div style={{ flex: 1 }}>
              {paid ? (
                <SoftBox>
                  <SoftTypography fontWeight="bold" variant="h6" noWrap>
                    1. Dados da instância webInstanceName
                  </SoftTypography>
                  <SoftTypography variant="caption">
                    Essas são suas informações para integração com esta
                    instância, não compartilhe essas informações.
                  </SoftTypography>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      sm={12}
                      md={4}
                      display="flex"
                      flexDirection="column"
                      width={"100%"}
                      sx={{ maxHeight: "max-content" }}
                    >
                      <SoftBox pt={1} mb={1} display="flex" alignItems="center">
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
                          icon={{ component: "storage", direction: "left" }}
                          value={"https://orange-api.io/instances/3CA0ECAE8BC"}
                          disabled
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
                            icon={{ component: "grid_3x3", direction: "left" }}
                            placeholder="Nome"
                            value={textResume(webInstanceId, 30)}
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
                          value={textResume(webInstanceId, 30)}
                          disabled
                        ></SoftInput>
                      </SoftBox>
                    </Grid>
                  </Grid>
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
                        noWrap
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={2}
                      >
                        {connectWithPhoneNumber
                          ? "Conectar via telefone"
                          : "Leia o QRCode"}
                        <SoftBox display="flex">
                          <Switch
                            onChange={(e) => {
                              setConnectWithPhoneNumber(
                                !connectWithPhoneNumber
                              );
                            }}
                          />
                        </SoftBox>
                      </SoftTypography>
                    </Grid>
                    <Grid item sm={12}>
                      <SoftTypography variant="caption" noWrap>
                        {connectWithPhoneNumber
                          ? "Conecte sua instância pelo número de telefone"
                          : "Abra o aplicativo do whatsApp e leia o QRCode abaixo para se conectar a esta instância"}
                      </SoftTypography>
                    </Grid>

                    <Grid item md={12} mt={2}>
                      {connectWithPhoneNumber ? (
                        <>
                          {phoneCode ? (
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
                                  onClick={() => setPhoneCode("")}
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
                                    <button>
                                      <Icon fontSize="small" color="secondary">
                                        copy
                                      </Icon>
                                    </button>
                                  </Tooltip>
                                </SoftTypography>

                                <SoftTypography variant="h4" fontWeight="bold">
                                  {phoneCode}
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
                                  1. Abre o aplicativo do <i>Whatsapp</i>;
                                </ListItem>
                                <ListItem>
                                  2. No menu, selecione &nbsp;{" "}
                                  <b>Aparelhos conectados</b>;
                                </ListItem>
                                <ListItem>
                                  3. Clique em <b>&nbsp;Conectar um aparelho</b>
                                  ;
                                </ListItem>
                                <ListItem>
                                  4. Selecione{" "}
                                  <b>
                                    &nbsp;Conectar com número de telefone&nbsp;
                                  </b>{" "}
                                  e digite seu código.
                                </ListItem>
                              </Alert>
                            </Grid>
                          ) : (
                            <>
                              <PhoneInput
                                value={phone}
                                onChange={(phone) => setPhone(phone)}
                                defaultCountry="br"
                                style={{
                                  justifyContent: "center",
                                }}
                              />
                              <SoftTypography variant="caption" noWrap>
                                Obs: Em caso de erro, tente solicitar o código
                                sem o nono digito.
                              </SoftTypography>
                              <SoftBox style={{ marginTop: "16px" }}>
                                <SoftButton
                                  variant="contained"
                                  color="success"
                                  circular
                                  disabled={!phone}
                                  onClick={() => setPhoneCode("FPR6K-OTK09")}
                                >
                                  Solicitar código
                                </SoftButton>
                              </SoftBox>
                            </>
                          )}
                        </>
                      ) : (
                        <img
                          alt="QR CODE para conectar instância"
                          src={require("../../assets/images/qrCode.png")}
                        />
                      )}
                    </Grid>

                    <Grid item sm={12} sx={{ marginTop: "24px" }}>
                      <SoftButton
                        variant="text"
                        color="info"
                        onClick={() =>
                          setConnectWithPhoneNumber(!connectWithPhoneNumber)
                        }
                      >
                        {connectWithPhoneNumber
                          ? "Conectar com QR Code"
                          : "Conectar com o número de telefone"}
                      </SoftButton>
                    </Grid>
                  </Grid>
                </SoftBox>
              ) : (
                <>
                  <SoftBox>
                    <SoftTypography fontWeight="bold" variant="h6" noWrap>
                      1. Realize o pagamento
                    </SoftTypography>
                    <SoftTypography fontWeight="normal" variant="caption">
                      Para utilizar essa instância é necessário realizar o
                      pagamento da mesma. O valor é de R$ 99,00
                    </SoftTypography>
                  </SoftBox>
                </>
              )}

              <SoftBox mt="16px">
                <SoftTypography fontWeight="bold" variant="h6" noWrap>
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
                  <SoftTypography fontWeight="normal" variant="caption">
                    <SoftTypography fontWeight="bold" variant="caption">
                      Expira em:{" "}
                    </SoftTypography>
                    <SoftTypography fontWeight="normal" variant="caption">
                      Expirado!
                    </SoftTypography>
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
              <SoftBox mt="8px">
                <SoftButton color={"info"}>Assinar</SoftButton>
              </SoftBox>
            </div>
            <SoftBox color="text" px={2}>
              <Icon
                sx={{ cursor: "pointer", fontWeight: "bold" }}
                fontSize="small"
                onClick={openMenu}
              >
                more_vert
              </Icon>
            </SoftBox>
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
              <MenuItem
                onClick={() => {
                  closeMenu();
                  setOpen(true);
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
      <Footer />
      <ModalActionConfirmation
        title={"Realmente deseja cancelar?"}
        handleModal={{ onClose: () => setOpen(false), open: open }}
      >
        <Box textAlign={"center"}>
          <SoftTypography color="text" variant="caption" opacity={0.8}>
            A instância web será excluída, porém a assinatura não será
            reembolsada, permanecendo ativa até o momento do vencimento
          </SoftTypography>
          <br />
          <SoftTypography color="text" variant="button">
            Para continuar digite{" "}
            <SoftTypography color="error" variant="caption" fontWeight="bold">
              CANCELAR{" "}
            </SoftTypography>
            no campo abaixo
          </SoftTypography>
        </Box>
      </ModalActionConfirmation>
    </DashboardLayout>
  );
}

export default WebInstance;
