// @mui material components
import CachedIcon from "@mui/icons-material/Cached";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
// Dashboard layout components
import FilterWebInstances from "layouts/dashboard/components/FilterWebInstances";
import InfoMessages from "layouts/dashboard/components/InfoMessages";
import SendedMessages from "layouts/dashboard/components/SendedMessages";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

import { useState } from "react";

import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import Footer from "examples/Footer";
// Orange APi examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Orange APi components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function Dashboard() {
  const [filters, setFilters] = useState([]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox pt={1} mb={0.5} textAlign="end">
          <SoftTypography
            color="text"
            fontSize="14px"
            display="flex"
            alignItems="center"
            justifyContent="end"
            gap="4px"
          >
            <CachedIcon /> <span>Última atualização à 5 horas atrás</span>
          </SoftTypography>
        </SoftBox>
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

        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8}>
            <GradientLineChart
              title="Total recebidos/enviados hoje"
              height="20.25rem"
              chart={gradientLineChartData}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <SendedMessages />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
