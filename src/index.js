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
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import "dayjs/plugin/relativeTime";

import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "react-international-phone/style.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

// Orange API Context Provider
import { SoftUIControllerProvider } from "./context";
import "./index.css";

dayjs.locale("pt-br");

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SoftUIControllerProvider>
      <Toaster
        toastOptions={{ style: { fontSize: "12px", fontWeight: "bold" } }}
      />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </SoftUIControllerProvider>
  </BrowserRouter>
);
