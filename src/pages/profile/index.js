/**
=========================================================
* Orange API - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// Data
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Footer from "examples/Footer";
// Orange API examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Orange API components

function Overview() {
  return (
    <DashboardLayout>
      <ProfileInfoCard
        title="Dados da conta"
        action={{ route: "", tooltip: "Edit Profile" }}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
