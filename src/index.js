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
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "react-international-phone/style.css";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

// Orange APi Context Provider
import { SoftUIControllerProvider } from "./context";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SoftUIControllerProvider>
      <Toaster />
      <App />
    </SoftUIControllerProvider>
  </BrowserRouter>
);
