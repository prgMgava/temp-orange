// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";
// Custom styles for SoftSelect
import styles from "components/SoftSelect/styles";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import { forwardRef } from "react";
// react-select components
import Select from "react-select";

const SoftSelect = forwardRef(({ size, error, success, ...rest }, ref) => {
  const { light } = colors;

  return (
    <Select
      {...rest}
      ref={ref}
      styles={styles(size, error, success)}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: light.main,
          primary: light.main,
        },
      })}
    />
  );
});

// Setting default values for the props of SoftSelect
SoftSelect.defaultProps = {
  size: "medium",
  error: false,
  success: false,
};

// Typechecking props for the SoftSelect
SoftSelect.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  error: PropTypes.bool,
  success: PropTypes.bool,
};

export default SoftSelect;
