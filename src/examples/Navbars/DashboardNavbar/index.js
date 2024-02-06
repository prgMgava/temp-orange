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
// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
// Orange API context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
} from "context";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

import { useState, useEffect } from "react";
// react-router components
import { useLocation, Link } from "react-router-dom";

import Breadcrumbs from "examples/Breadcrumbs";
// Orange API examples
import NotificationItem from "examples/Items/NotificationItem";
// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Orange API components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } =
    controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      );
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => {
    setMiniSidenav(dispatch, !miniSidenav);
  };
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        color="secondary"
        image={
          <Icon
            fontSize="small"
            sx={{ color: ({ palette: { white } }) => white.main }}
          >
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={light}
          />
        </SoftBox>
        {isMini ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })} gap="32px">
            <SoftBox color={light ? "white" : "inherit"}>
              <Link to="/account">
                <IconButton sx={navbarIconButton} size="small">
                  <Icon
                    sx={({ palette: { dark, white } }) => ({
                      color: light ? white.main : dark.main,
                    })}
                  >
                    account_circle
                  </Icon>
                  <SoftTypography
                    variant="button"
                    fontWeight="medium"
                    color={light ? "white" : "dark"}
                  >
                    Perfil
                  </SoftTypography>
                </IconButton>
              </Link>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={light ? "text-white" : "text-dark"}>
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>

              {renderMenu()}
            </SoftBox>
            <IconButton
              size="large"
              color="inherit"
              sx={navbarIconButton}
              onClick={() => alert("logout")}
            >
              <Icon fontSize="20px">logout</Icon>
            </IconButton>
          </SoftBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
