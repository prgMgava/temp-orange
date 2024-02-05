/* eslint-disable react/prop-types */
// Orange APi components
// Images
import Icon from "@mui/material/Icon";
import { textResume } from "utils/text.utils";

import SoftBadge from "components/SoftBadge";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function WebInstanceName({ icon, name }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <Icon fontSize="default" color="warning">
          {icon}
        </Icon>
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

const authorsTableData = {
  columns: [
    { name: "nome", align: "left" },
    { name: "tipo", align: "left" },
    { name: "id", align: "center" },
    { name: "token", align: "center" },
    { name: "status", align: "center" },
    { name: "vencimento", align: "center" },
    { name: "pagamento", align: "center" },
    { name: "visualizar", align: "center" },
  ],

  rows: [
    {
      nome: <WebInstanceName icon={"warning"} name="Tele Vendas" />,
      tipo: (
        <SoftBox>
          <SoftTypography
            variant="button"
            color="secondary"
            fontWeight="medium"
          >
            Pagar.Me
          </SoftTypography>
        </SoftBox>
      ),
      id: (
        <SoftBox display="flex" alignItems="center" gap="2px" px={1} py={0.5}>
          <SoftBox display="flex" flexDirection="column">
            <SoftTypography variant="button" fontWeight="medium">
              {textResume("4206ea92-bd1a-407a-b624-1a7e1cb21743", 10)}
            </SoftTypography>
          </SoftBox>
          <SoftBox mr={2}>
            <button>
              <Icon fontSize="small" color="secondary">
                copy
              </Icon>
            </button>
          </SoftBox>
        </SoftBox>
      ),
      token: (
        <SoftBox display="flex" alignItems="center" gap="2px" px={1} py={0.5}>
          <SoftBox display="flex" flexDirection="column">
            <SoftTypography variant="button" fontWeight="medium">
              {textResume("4206ea92-bd1a-407a-b624-1a7e1cb21743", 10)}
            </SoftTypography>
          </SoftBox>
          <SoftBox mr={2}>
            <button>
              <Icon fontSize="small" color="secondary">
                copy
              </Icon>
            </button>
          </SoftBox>
        </SoftBox>
      ),
      status: (
        <SoftBadge
          variant="gradient"
          badgeContent="desconectada"
          color="secondary"
          size="xs"
          container
        />
      ),
      vencimento: (
        <SoftTypography variant="button" color="secondary" fontWeight="medium">
          12/02/2024
        </SoftTypography>
      ),
      pagamento: (
        <SoftBadge
          variant="gradient"
          badgeContent="pendente"
          color="secondary"
          size="xs"
          container
        />
      ),
      visualizar: (
        <SoftBox display="flex" justifyContent="center" alignItems="center">
          <SoftTypography
            style={{ marginTop: "16px" }}
            component="a"
            href={`/web-instances/4206ea92`}
            variant="button"
          >
            <Icon fontSize="small" color="info">
              visibility
            </Icon>
          </SoftTypography>
        </SoftBox>
      ),
    },
    {
      nome: <WebInstanceName icon={""} name="Comercio Digital" />,
      tipo: (
        <SoftBox>
          <SoftTypography
            variant="button"
            color="secondary"
            fontWeight="medium"
          >
            Pagar.Me
          </SoftTypography>
        </SoftBox>
      ),
      id: (
        <SoftBox display="flex" alignItems="center" gap="2px" px={1} py={0.5}>
          <SoftBox display="flex" flexDirection="column">
            <SoftTypography variant="button" fontWeight="medium">
              {textResume("4206ea92-bd1a-407a-b624-1a7e1cb21743", 10)}
            </SoftTypography>
          </SoftBox>
          <SoftBox mr={2}>
            <button>
              <Icon fontSize="small" color="secondary">
                copy
              </Icon>
            </button>
          </SoftBox>
        </SoftBox>
      ),
      token: (
        <SoftBox display="flex" alignItems="center" gap="2px" px={1} py={0.5}>
          <SoftBox display="flex" flexDirection="column">
            <SoftTypography variant="button" fontWeight="medium">
              {textResume("4206ea92-bd1a-407a-b624-1a7e1cb21743", 10)}
            </SoftTypography>
          </SoftBox>
          <SoftBox mr={2}>
            <button>
              <Icon fontSize="small" color="secondary">
                copy
              </Icon>
            </button>
          </SoftBox>
        </SoftBox>
      ),
      status: (
        <SoftBadge
          variant="gradient"
          badgeContent="online"
          color="success"
          size="xs"
          container
        />
      ),
      vencimento: (
        <SoftTypography variant="button" color="secondary" fontWeight="medium">
          12/02/2024
        </SoftTypography>
      ),
      pagamento: (
        <SoftBadge
          variant="gradient"
          badgeContent="pago"
          color="success"
          size="xs"
          container
        />
      ),
      visualizar: (
        <SoftBox display="flex" justifyContent="center" alignItems="center">
          <SoftTypography
            style={{ marginTop: "16px" }}
            component="a"
            href={`/web-instances/4206ea92`}
            variant="button"
          >
            <Icon fontSize="small" color="info">
              visibility
            </Icon>
          </SoftTypography>
        </SoftBox>
      ),
    },
  ],
};

export default authorsTableData;
