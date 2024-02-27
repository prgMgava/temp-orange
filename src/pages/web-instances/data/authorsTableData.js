// Orange API components
// Images
import { Tooltip } from "@mui/material";
import Icon from "@mui/material/Icon";
import dayjs from "dayjs";
import { hasWebHook } from "utils/object.utils";
import { copyText, textResume } from "utils/text.utils";

import SoftBadge from "components/SoftBadge";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

const stateObj = {
  1: {
    description: "Conectada",
    color: "success",
  },
  3: {
    description: "Desconectada",
    color: "secondary",
  },
  2: {
    description: "Aguardando conexão",
    color: "primary",
  },
};

function WebInstanceName({ icon, name, webInstanceSettings }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      {hasWebHook(webInstanceSettings) && (
        <SoftBox mr={2}>
          <Tooltip title={"Você pode configurar web hooks"} placement="top">
            <Icon fontSize="default" color="warning">
              {icon}
            </Icon>
          </Tooltip>
        </SoftBox>
      )}
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

const authorsTableData = (webInstances) => ({
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

  rows: formatRows(webInstances),
});

const formatRows = (webInstances) => {
  return webInstances.map((webInstance) => {
    return {
      nome: (
        <WebInstanceName
          icon={"warning"}
          name={webInstance.name}
          webInstanceSettings={webInstance.settings}
        />
      ),
      tipo: (
        <SoftBox>
          <SoftTypography
            variant="button"
            color="secondary"
            fontWeight="medium"
          >
            Stripe
          </SoftTypography>
        </SoftBox>
      ),
      id: (
        <SoftBox display="flex" alignItems="center" gap="2px" px={1} py={0.5}>
          <SoftBox display="flex" flexDirection="column">
            <SoftTypography variant="button" fontWeight="medium">
              {textResume(webInstance.instanceName, 15)}
            </SoftTypography>
          </SoftBox>
          <SoftBox mr={2}>
            <button onClick={() => copyText(webInstance.instanceName)}>
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
              {textResume(webInstance.token, 15)}
            </SoftTypography>
          </SoftBox>
          <SoftBox mr={2}>
            <button onClick={() => copyText(webInstance.token)}>
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
          badgeContent={stateObj[webInstance.state.id].description}
          color={stateObj[webInstance.state.id].color}
          size="xs"
          container
        />
      ),
      vencimento: (
        <SoftTypography variant="button" color="secondary" fontWeight="medium">
          {webInstance.dueDate
            ? dayjs(webInstance.dueDate).format("DD.MM.YYYY")
            : "-".repeat(3)}
        </SoftTypography>
      ),
      pagamento: (
        <SoftBadge
          variant="gradient"
          badgeContent={
            webInstance.isTrial
              ? "Gratuito"
              : webInstance.paid
              ? "Pago"
              : "Pendente"
          }
          color={
            webInstance.isTrial
              ? "primary"
              : webInstance.paid
              ? "success"
              : "error"
          }
          size="xs"
          container
        />
      ),
      visualizar: (
        <SoftBox display="flex" justifyContent="center" alignItems="center">
          <SoftTypography
            style={{ marginTop: "16px" }}
            component="a"
            href={`/web-instances/${webInstance.id}`}
            variant="button"
          >
            <Icon fontSize="small" color="info">
              visibility
            </Icon>
          </SoftTypography>
        </SoftBox>
      ),
    };
  });
};

export default authorsTableData;
