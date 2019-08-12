import PropTypes from "prop-types";
import getConstructorColor from "../../util/getConstructorColor";
import { Box } from "@material-ui/core";

const TeamColorBar = props => (
  <Box
    style={{
      borderLeft: "4px",
      borderLeftColor: getConstructorColor(props.team),
      borderLeftStyle: "solid",
      paddingLeft: "6px"
    }}
  >
    {props.children}
  </Box>
);

TeamColorBar.propTypes = {
  team: PropTypes.string.isRequired
};

export default TeamColorBar;
