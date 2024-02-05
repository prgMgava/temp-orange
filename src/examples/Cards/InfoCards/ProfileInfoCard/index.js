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
// react-routers components
// @mui material components
import { Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
// prop-types is library for typechecking of props
import PropTypes from "prop-types";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";

// Orange APi components
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";

function ProfileInfoCard({ title, description, action }) {
  const [edit, setEdit] = useState(false);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm({
    defaultValues: {
      name: "Alex Thompson",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
        px={2}
      >
        <SoftTypography variant="h6" fontWeight="medium">
          {title}
        </SoftTypography>
        <SoftTypography
          component={Button}
          onClick={() => setEdit(!edit)}
          variant="body2"
          color="secondary"
        >
          <Tooltip title={action.tooltip} placement="top">
            <Icon>edit</Icon>
          </Tooltip>
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox mb={2} lineHeight={1}>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            {description}
          </SoftTypography>
        </SoftBox>
        <SoftBox>
          <Grid
            container
            spacing={2}
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid
              item
              sm={12}
              md={4}
              display="flex"
              flexDirection="column"
              height="100%"
              width={"100%"}
            >
              <SoftBox pt={1} mb={1} display="flex" alignItems="center">
                <SoftTypography
                  variant="caption"
                  color="text"
                  component="label"
                  htmlFor="name"
                >
                  Nome completo
                </SoftTypography>
              </SoftBox>

              <SoftBox mb={0}>
                <SoftInput
                  type="text"
                  icon={{ component: "person", direction: "left" }}
                  placeholder="Nome"
                  {...register("name", { required: true })}
                  error={!!errors.name}
                  disabled={!edit}
                  id="name"
                ></SoftInput>
              </SoftBox>
            </Grid>

            <Grid
              item
              sm={12}
              md={4}
              display="flex"
              flexDirection="column"
              width={"100%"}
            >
              <SoftBox
                pt={1}
                mb={1}
                display="flex"
                gap="4px"
                alignItems="center"
              >
                <SoftTypography variant="caption" color="text">
                  Email
                </SoftTypography>
              </SoftBox>

              <SoftBox>
                <SoftBox mb={0}>
                  <SoftInput
                    type="text"
                    icon={{ component: "grid_3x3", direction: "left" }}
                    disabled
                    {...register("email")}
                    value={`email@example.com`}
                  ></SoftInput>
                </SoftBox>
              </SoftBox>
            </Grid>

            <Grid
              item
              sm={12}
              md={4}
              display="flex"
              flexDirection="column"
              width={"100%"}
            >
              <SoftBox
                pt={1}
                mb={1}
                display="flex"
                gap="4px"
                alignItems="center"
              >
                <SoftTypography variant="caption" color="text">
                  Telefone{" "}
                </SoftTypography>
              </SoftBox>

              <SoftBox mb={0}>
                <PhoneInput
                  value={"5527999336669"}
                  defaultCountry="br"
                  name="phoneNumber"
                  disabled
                />
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileInfoCard;
