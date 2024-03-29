import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
// Orange API contexts
import {
  useSoftUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
// Orange API routes
import routes from "routes/routes";

// RTL plugins
import { useState, useEffect } from "react";
// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Configurator from "examples/Configurator";
// Orange API examples
import Sidenav from "examples/Sidenav";

// Orange API components
import SoftBox from "components/SoftBox";

// Images
import brand from "assets/images/logo-ct.png";
// Orange API themes
import theme from "assets/theme";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } =
    controller;
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

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "sidenav" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Orange API"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          {/* <Configurator />
          {configsButton} */}
        </>
      )}
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </ThemeProvider>
  );
}
