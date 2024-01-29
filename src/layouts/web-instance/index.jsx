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
import { Box, Icon, Link, Menu, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";

import { useState } from "react";

// Data
// Orange APi examples
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { ModalActionConfirmation } from "components/ModalActionConfirmation";
// Orange APi components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

function WebInstance() {
  const [menu, setMenu] = useState(null);
  const [open, setOpen] = useState(false);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SoftBox py={3}>
        <SoftBox mb={3} pt={2} px={2}>
          <Card sx={{ padding: "16px", display: "flex", flexDirection: "row" }}>
            <div style={{ flex: 1 }}>
              <SoftBox>
                <SoftTypography fontWeight="bold" variant="h6" noWrap>
                  Realize o pagamento
                </SoftTypography>
                <SoftTypography fontWeight="normal" variant="caption">
                  Para utilizar essa instância é necessário realizar o pagamento
                  da mesma. O valor é de R$ 99,00
                </SoftTypography>
              </SoftBox>
              <SoftBox mt="16px">
                <SoftTypography fontWeight="bold" variant="h6" noWrap>
                  Assinatura
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