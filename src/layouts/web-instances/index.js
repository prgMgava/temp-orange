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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// Data
import authorsTableData from "layouts/web-instances/data/authorsTableData";
import projectsTableData from "layouts/web-instances/data/projectsTableData";

import { useSearchParams } from "react-router-dom";

// Orange APi examples
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import WebInstancesInfo from "examples/WebInstances";

import SoftBadge from "components/SoftBadge";
// Orange APi components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function WebInstances() {
  const { columns, rows } = authorsTableData;
  const [searchParams, setSearchParams] = useSearchParams();
  const stateParams = searchParams.get("state") || "all";

  const handleParams = (key, value) => {
    const params = searchParams.get(key);
    if (!params) {
      setSearchParams((prevParams) => [...prevParams.entries(), [key, value]]);
    } else {
      searchParams.set(key, value);
      setSearchParams(searchParams);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <WebInstancesInfo />

      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid item xs={12} lg={5} pb={4}>
            <SoftBox display="flex" flexDirection="column" height="100%">
              <SoftBox pt={1} mb={0.5} display="flex" flexWrap="wrap" gap="8px">
                <button onClick={() => handleParams("state", "all")}>
                  <SoftBadge
                    variant="contained"
                    color={`${stateParams == "all" ? "info" : "secondary"}`}
                    size="sm"
                    badgeContent={"Todas"}
                    circular
                    container
                  />
                </button>
                <button onClick={() => handleParams("state", "connecting")}>
                  <SoftBadge
                    variant="contained"
                    color={`${
                      stateParams == "connecting" ? "info" : "secondary"
                    }`}
                    size="sm"
                    badgeContent={"Mês passado"}
                    circular
                    container
                  />
                </button>
                <button onClick={() => handleParams("state", "close")}>
                  <SoftBadge
                    variant="contained"
                    color={`${stateParams == "close" ? "info" : "secondary"}`}
                    size="sm"
                    badgeContent={"Ontem"}
                    circular
                    container
                  />
                </button>
              </SoftBox>
            </SoftBox>
          </Grid>
          <Card>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
              {rows.length == 0 && (
                <SoftTypography
                  variant="button"
                  fontWeight="bold"
                  style={{ textAlign: "center", display: "block" }}
                  opacity={0.8}
                  padding={4}
                >
                  Nenhuma Instância Web encontrada
                </SoftTypography>
              )}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default WebInstances;
