// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

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
  return (
    <Card sx={{ overflow: "initial" }} height="100%">
      <SoftBox p={2} height="100%">
        <Grid container spacing={3} height="100%">
          <Grid
            item
            xs={12}
            sm={6}
            xl={4}
            display="flex"
            flexDirection="column"
            height="100%"
          >
            <SoftBox pt={1} mb={0.5}>
              <SoftTypography variant="body2" color="text" fontWeight="medium">
                Instâncias web
              </SoftTypography>
            </SoftBox>

            <SoftBox component="form" role="form">
              <SoftBox mb={2}>
                <SoftSelect
                  options={[{ value: "january", label: "Todas" }]}
                  isSearchable
                  isMulti
                ></SoftSelect>
              </SoftBox>
            </SoftBox>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            xl={4}
            display="flex"
            flexDirection="column"
            height="100%"
          >
            <SoftBox pt={1} mb={0.5}>
              <SoftTypography variant="body2" color="text" fontWeight="medium">
                Período
              </SoftTypography>
            </SoftBox>
            <SoftBox pt={1} mb={0.5} display="flex" flexWrap="wrap" gap="8px">
              <button>
                <SoftBadge
                  variant="contained"
                  color={"secondary"}
                  size="sm"
                  badgeContent={"Este mês"}
                  circular
                  container
                />
              </button>
              <button>
                <SoftBadge
                  variant="contained"
                  color={"secondary"}
                  size="sm"
                  badgeContent={"Mês passado"}
                  circular
                  container
                />
              </button>
              <button>
                <SoftBadge
                  variant="contained"
                  color={"secondary"}
                  size="sm"
                  badgeContent={"Ontem"}
                  circular
                  container
                />
              </button>
              <button>
                <SoftBadge
                  variant="contained"
                  color={"info"}
                  size="sm"
                  badgeContent={"Hoje"}
                  circular
                  container
                />
              </button>
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
