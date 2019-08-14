import PropTypes from 'prop-types'
import { useState } from "react";
import { Collapse, ButtonBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {ChevronDown, ChevronUp} from "mdi-material-ui";

const useStyles = makeStyles(theme => ({
  buttonBase: {
    display: "flex",
    width: "100%"
  }
}))

const CollapseWithButton = props => {
  const classes = useStyles();
  const [collapseOpen, collapseToggle] = useState(false);

  const handleCollapseToggle = () => {
    collapseToggle(!collapseOpen);
  }

  return (
    <>
      <Collapse collapsedHeight={props.height} in={collapseOpen}>
        {props.children}
      </Collapse>
      <ButtonBase
        onClick={handleCollapseToggle}
        className={classes.buttonBase}
      >
        {collapseOpen ? <ChevronUp /> : <ChevronDown />}
      </ButtonBase>
    </>
  );
};

CollapseWithButton.propTypes = {
  height: PropTypes.string.isRequired
}

CollapseWithButton.defaultProps = {
  height: "200px"
}

export default CollapseWithButton;
