// @mui material components
import Grid from "@mui/material/Grid";

import { useState } from "react";

// Dashboard layout components
import FilterWebInstances from "pages/dashboard/components/FilterWebInstances";
import InfoMessages from "pages/dashboard/components/InfoMessages";
import SendedMessages from "pages/dashboard/components/SendedMessages";
import gradientLineChartData from "pages/dashboard/data/gradientLineChartData";

import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import Footer from "examples/Footer";
// Orange API examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import WebInstancesInfo from "examples/WebInstances";

// Orange API components
import SoftBox from "components/SoftBox";

function Dashboard() {
  const [filters, setFilters] = useState([]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <WebInstancesInfo />

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
