import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Select, MenuItem } from "@material-ui/core";

import getSeasonsList from "util/getSeasonsList";

const SeasonsSelect = props => {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let data = await getSeasonsList();
      data.reverse();
      setSeasons(data);
    }
    fetchData();
  }, []);

  return (
    <Select
      value={props.value}
      onChange={props.onChange}
      inputProps={{
        name: "season",
        id: "season-select"
      }}
    >
      <MenuItem value="current">Current</MenuItem>
      {seasons.map(row => (
        <MenuItem value={row.season} key={row.url}>
          {row.season}
        </MenuItem>
      ))}
    </Select>
  );
};

SeasonsSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default SeasonsSelect;
