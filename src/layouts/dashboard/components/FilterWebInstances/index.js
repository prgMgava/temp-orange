// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import { useSearchParams } from "react-router-dom";

import SoftBadge from "components/SoftBadge";
// Orange APi components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftSelect from "components/SoftSelect";
import SoftTypography from "components/SoftTypography";

/**
 * Componente para filtrar instâncias da web.
 * @component
 * @param {Object} props - As propriedades do componente.
 * @param {string[]} props.filters - Um array de strings representando os filtros.
 * @returns {JSX.Element} Retorna a representação do componente.
 */
function FilterWebInstances({ filters }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const periodParam = searchParams.get("period") || "today";

  const handleParams = (key, value) => {
    const params = searchParams.get(key);
    if (!params) {
      setSearchParams((prevParams) => [...prevParams.entries(), [key, value]]);
    } else {
      searchParams.set(key, value);
      setSearchParams(searchParams);
    }
  };

  return (
    <Card sx={{ overflow: "initial" }} height="100%">
      <SoftBox p={2} height="100%">
        <Grid container spacing={3} height="100%">
          <Grid item xs={12} lg={7}>
            <SoftBox display="flex" flexDirection="column" height="100%">
              <SoftBox pt={1} mb={0.5}>
                <SoftTypography
                  variant="body2"
                  color="text"
                  fontWeight="medium"
                >
                  Instâncias web
                </SoftTypography>
              </SoftBox>

              <SoftBox component="form" role="form">
                <SoftBox mb={2}>
                  <SoftSelect
                    options={[
                      { value: "all", label: "Todas" },
                      { value: "1", label: "web instance 01" },
                    ]}
                    isSearchable
                    isMulti
                    onChange={(e) => {
                      if (e.length > 0) {
                        handleParams("web_instance", e[0].value);
                      } else {
                        searchParams.delete("web_instance");
                        setSearchParams(searchParams);
                      }
                    }}
                  ></SoftSelect>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={5}>
            <SoftBox display="flex" flexDirection="column" height="100%">
              <SoftBox pt={1} mb={0.5}>
                <SoftTypography
                  variant="body2"
                  color="text"
                  fontWeight="medium"
                >
                  Período
                </SoftTypography>
              </SoftBox>
              <SoftBox pt={1} mb={0.5} display="flex" flexWrap="wrap" gap="8px">
                <button onClick={() => handleParams("period", "current_month")}>
                  <SoftBadge
                    variant="contained"
                    color={`${
                      periodParam == "current_month" ? "info" : "secondary"
                    }`}
                    size="sm"
                    badgeContent={"Este mês"}
                    circular
                    container
                  />
                </button>
                <button onClick={() => handleParams("period", "last_month")}>
                  <SoftBadge
                    variant="contained"
                    color={`${
                      periodParam == "last_month" ? "info" : "secondary"
                    }`}
                    size="sm"
                    badgeContent={"Mês passado"}
                    circular
                    container
                  />
                </button>
                <button onClick={() => handleParams("period", "yesterday")}>
                  <SoftBadge
                    variant="contained"
                    color={`${
                      periodParam == "yesterday" ? "info" : "secondary"
                    }`}
                    size="sm"
                    badgeContent={"Ontem"}
                    circular
                    container
                  />
                </button>
                <button onClick={() => handleParams("period", "today")}>
                  <SoftBadge
                    variant="contained"
                    color={`${periodParam == "today" ? "info" : "secondary"}`}
                    size="sm"
                    badgeContent={"Hoje"}
                    circular
                    container
                  />
                </button>
              </SoftBox>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

FilterWebInstances.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string),
};

export default FilterWebInstances;
