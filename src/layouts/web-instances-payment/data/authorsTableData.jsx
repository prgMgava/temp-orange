/* eslint-disable react/prop-types */
// Orange APi components
// Images
import Icon from "@mui/material/Icon";
import { textResume } from "utils/text.utils";

import SoftBadge from "components/SoftBadge";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function WebInstanceName({ icon, name }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
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
    { name: "valor", align: "center" },
    { name: "pago em", align: "center" },
    { name: "comprovantes", align: "center" },
  ],

  rows: [
    // {
    //   nome: <WebInstanceName icon={"warning"} name="Tele Vendas" />,
    //   valor: (
    //     <SoftBox>
    //       <SoftTypography
    //         variant="button"
    //         color="secondary"
    //         fontWeight="medium"
    //       >
    //         R$50,00
    //       </SoftTypography>
    //     </SoftBox>
    //   ),
    //   "pago em": (
    //     <SoftTypography variant="button" color="secondary" fontWeight="medium">
    //       12/02/2024
    //     </SoftTypography>
    //   ),
    //   comprovantes: (
    //     <SoftBadge
    //       variant="gradient"
    //       badgeContent="TODO:"
    //       color="secondary"
    //       size="xs"
    //       container
    //     />
    //   ),
    // },
    // {
    //   nome: <WebInstanceName icon={"warning"} name="Tele Vendas" />,
    //   valor: (
    //     <SoftBox>
    //       <SoftTypography
    //         variant="button"
    //         color="secondary"
    //         fontWeight="medium"
    //       >
    //         R$50,00
    //       </SoftTypography>
    //     </SoftBox>
    //   ),
    //   "pago em": (
    //     <SoftTypography variant="button" color="secondary" fontWeight="medium">
    //       12/02/2024
    //     </SoftTypography>
    //   ),
    //   comprovantes: (
    //     <SoftBadge
    //       variant="gradient"
    //       badgeContent="TODO:"
    //       color="secondary"
    //       size="xs"
    //       container
    //     />
    //   ),
    // },
  ],
};

export default authorsTableData;
