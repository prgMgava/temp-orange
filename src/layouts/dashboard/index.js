// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
// Dashboard layout components
import FilterWebInstances from "layouts/dashboard/components/FilterWebInstances";
import InfoMessages from "layouts/dashboard/components/InfoMessages";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import Projects from "layouts/dashboard/components/Projects";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";

import { useState } from "react";

import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import PieChart from "examples/Charts/PieChart";
import Footer from "examples/Footer";
// Orange APi examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Orange APi components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Orange APi base styles
import typography from "assets/theme/base/typography";

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [filters, setFilters] = useState([]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Total de instâncias web" }}
                count="5"
                description={{
                  color: "secondary",
                  text: "O total de instâncias web executando",
                }}
                icon={{ color: "info", component: "storage" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Instâncias web conectadas" }}
                count="2"
                description={{
                  color: "secondary",
                  text: "Total de instâncias web conectadas",
                }}
                icon={{ color: "success", component: "check_circle" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Instâncias web desconectadas" }}
                count="3"
                description={{
                  color: "secondary",
                  text: "Total de instâncias web desconectadas",
                }}
                icon={{ color: "error", component: "power_settings_new" }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <FilterWebInstances filters={filters} />
            </Grid>
            <Grid item xs={12} lg={5}>
              <InfoMessages />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <PieChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox
                      fontSize={size.lg}
                      color="success"
                      mb={0.3}
                      mr={0.5}
                      lineHeight={0}
                    >
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography
                      variant="button"
                      color="text"
                      fontWeight="medium"
                    >
                      4% more{" "}
                      <SoftTypography
                        variant="button"
                        color="text"
                        fontWeight="regular"
                      >
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={{
                  labels: ["Facebook", "Direct", "Organic", "Referral"],
                  datasets: {
                    label: "Projects",
                    backgroundColors: [
                      "info",
                      "primary",
                      "dark",
                      "secondary",
                      "primary",
                    ],
                    data: [15, 20, 12, 60],
                  },
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
