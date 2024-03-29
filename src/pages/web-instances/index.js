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
// @mui material components
import { Icon } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { WebInstanceService } from "services/api/orangeApi/endpoints/WebInstanceService";
import { handleErrorResponse } from "utils/handleResponses";

import { useState } from "react";
import { useQueries } from "react-query";
import { Link, useSearchParams } from "react-router-dom";

// Data
import authorsTableData from "pages/web-instances/data/authorsTableData";

// Orange API examples
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import WebInstancesInfo from "examples/WebInstances";

import SoftBadge from "components/SoftBadge";
// Orange API components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";

function WebInstances() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const stateParams = searchParams.get("state") || "all";
  const searchTextParams = searchParams.get("search") || "";

  const handleParams = (key, value) => {
    const params = searchParams.get(key);
    if (!params) {
      setSearchParams((prevParams) => [...prevParams.entries(), [key, value]]);
    } else {
      if (!value) {
        searchParams.delete(key);
        setSearchParams(searchParams);
      } else {
        searchParams.set(key, value);
        setSearchParams(searchParams);
      }
    }
  };

  const queries = useQueries([
    {
      queryFn: () => {
        return WebInstanceService.findAll({
          filters: getFilters(),
        });
      },
      queryKey: [`web-instances`, stateParams, searchTextParams],
      onError: (e) => {
        handleErrorResponse(
          "Não foi possível obter as instâncias",
          e.response?.data
        );
      },
      onSuccess: (data) => {
        const { rows, columns } = authorsTableData(data.data);
        setRows(rows);
        setColumns(columns);
      },
    },
  ]);

  const getFilters = () => {
    const filters = {};

    if (searchTextParams) {
      filters.searchable = searchTextParams;
    }
    if (stateParams && stateParams != "all") {
      filters.state = {
        id: stateParams == "connecting" ? 1 : stateParams == "close" ? 3 : null,
      };
    }

    return filters;
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <WebInstancesInfo />

        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Grid container spacing={3} pb={4}>
              <Grid item sm={12} md={5}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox
                    pt={1}
                    mb={0.5}
                    display="flex"
                    flexWrap="wrap"
                    gap="8px"
                  >
                    <button onClick={() => handleParams("state", "all")}>
                      <SoftBadge
                        variant="contained"
                        color={`${stateParams == "all" ? "info" : "secondary"}`}
                        size="sm"
                        badgeContent={"Todas"}
                        circular
                        container
                      />
                    </button>
                    <button onClick={() => handleParams("state", "connecting")}>
                      <SoftBadge
                        variant="contained"
                        color={`${
                          stateParams == "connecting" ? "info" : "secondary"
                        }`}
                        size="sm"
                        badgeContent={"Conectadas"}
                        circular
                        container
                      />
                    </button>
                    <button onClick={() => handleParams("state", "close")}>
                      <SoftBadge
                        variant="contained"
                        color={`${
                          stateParams == "close" ? "info" : "secondary"
                        }`}
                        size="sm"
                        badgeContent={"desconectadas"}
                        circular
                        container
                      />
                    </button>
                  </SoftBox>
                </SoftBox>
              </Grid>
              <Grid item sm={11} md={6}>
                <SoftInput
                  type="text"
                  placeholder="Busque aqui..."
                  onChange={(e) => handleParams("search", e.target.value)}
                  value={searchTextParams}
                />
              </Grid>
              <Grid item sm={1} md={1} textAlign={"end"}>
                <Link to={"/web-instances/register"}>
                  <SoftButton variant="gradient" color="info" iconOnly>
                    <Icon>add</Icon>
                  </SoftButton>
                </Link>
              </Grid>
            </Grid>
            <Card>
              <SoftBox
                sx={{
                  "& .MuiTableRow-root:not(:last-child)": {
                    "& td": {
                      borderBottom: ({
                        borders: { borderWidth, borderColor },
                      }) => `${borderWidth[1]} solid ${borderColor}`,
                    },
                  },
                }}
              >
                <Table columns={columns} rows={rows} />
                {rows.length == 0 && (
                  <SoftTypography
                    variant="button"
                    fontWeight="bold"
                    style={{ textAlign: "center", display: "block" }}
                    opacity={0.8}
                    padding={4}
                  >
                    Nenhuma Instância Web encontrada
                  </SoftTypography>
                )}
              </SoftBox>
            </Card>
          </SoftBox>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default WebInstances;
