import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Select, MenuItem } from "@material-ui/core";

import getSeasonsList from "util/getSeasonsList";

const SeasonsSelect = props => (
    <Select
      value={props.value}
      onChange={props.onChange}
      inputProps={{
        name: "season",
        id: "season-select"
      }}
    >
      <MenuItem value="current">Current</MenuItem>
      {props.seasonsList.map(row => (
        <MenuItem value={row.season} key={row.season}>
          {row.season}
        </MenuItem>
      ))}
    </Select>
  );

SeasonsSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  seasonsList: PropTypes.array.isRequired
};

export default SeasonsSelect;
