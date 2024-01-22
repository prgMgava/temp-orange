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

/** 
  All of the routes for the Orange APi are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/
// Orange APi layouts
import EqualizerIcon from "@mui/icons-material/Equalizer";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import MenuBookIcon from "@mui/icons-material/MenuBook";
// Orange APi icons
import Billing from "layouts/billing";
import Dashboard from "layouts/dashboard";
import Profile from "layouts/profile";
import WebInstances from "layouts/web-instances";

import CreditCard from "examples/Icons/CreditCard";
import Settings from "examples/Icons/Settings";

import WebInstance from "./layouts/web-instance";

const routes = [
  { type: "title", title: "Menu Principal", key: "main-menu" },

  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <EqualizerIcon size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Instâncias web",
    key: "web-instances",
    route: "/web-instances",
    icon: <LaptopMacIcon size="12px" />,
    component: <WebInstances />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Pagamento",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Dados da Conta",
    key: "account",
    route: "/account",
    icon: <Settings size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },

  { type: "title", title: "Ajuda", key: "help" },
  {
    type: "collapse",
    name: "Documentação",
    key: "documentation",
    route: "/documentation",
    icon: <MenuBookIcon size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Visualização de Instância Web",
    key: "web-instances",
    route: "/web-instances/:webInstanceId",
    component: <WebInstance />,
    dynamicRoute: true,
  },
];

export default routes;
