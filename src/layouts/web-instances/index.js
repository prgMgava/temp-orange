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

// Orange APi examples
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import WebInstancesInfo from "examples/WebInstances";

// Orange APi components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function WebInstances() {
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <WebInstancesInfo />

      <SoftBox py={3}>
        <SoftBox mb={3}>
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
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default WebInstances;
