/* eslint-disable react/prop-types */
// Orange APi components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

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
