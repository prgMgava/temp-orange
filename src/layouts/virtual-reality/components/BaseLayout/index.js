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
// Images
import brand from "assets/images/logo-ct.png";
// Orange APi components
import SoftBox from "components/SoftBox";
// Orange APi context
import {
  useSoftUIController,
  setMiniSidenav,
  setLayout,
  setTransparentSidenav,
} from "context";
import Footer from "examples/Footer";
// Orange APi examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Sidenav from "examples/Sidenav";
// Custom styles for the BaseLayout
import {
  baseLayout,
  baseLayoutBackground,
  baseLayoutContent,
} from "layouts/virtual-reality/components/BaseLayout/styles";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
// Orange APi routes
import routes from "routes";

import { useEffect, useState } from "react";
// react-router-dom components
import { useLocation } from "react-router-dom";

function BaseLayout({ children }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the document layout to VR for the VR view
  useEffect(() => {
    setLayout(dispatch, "vr");
    setTransparentSidenav(dispatch, false);
  }, [pathname]);

  return (
    <SoftBox sx={baseLayout}>
      <SoftBox mt={3} mx={3}>
        <DashboardNavbar />
      </SoftBox>
      <SoftBox sx={baseLayoutBackground}>
        <SoftBox display={{ xs: "block", lg: "none" }}>
          <Sidenav
            brand={brand}
            brandName="Orange APi PRO"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </SoftBox>
        <SoftBox sx={baseLayoutContent}>
          <SoftBox display={{ xs: "none", lg: "block" }}>
            <Sidenav
              color={sidenavColor}
              brand={brand}
              brandName="Orange APi PRO"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
          </SoftBox>
          <DashboardLayout>{children}</DashboardLayout>
        </SoftBox>
      </SoftBox>
      <SoftBox pb={2} pt={0.25}>
        <Footer />
      </SoftBox>
    </SoftBox>
  );
}

// Typechecking props for the BaseLayout
BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
