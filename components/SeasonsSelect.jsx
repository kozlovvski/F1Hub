import PropTypes from "prop-types";
import { Select, MenuItem, InputLabel } from "@material-ui/core";

const SeasonsSelect = props => (
	<>
		<InputLabel htmlFor="select-season">Choose season:</InputLabel>
		<Select
			value={props.value}
			onChange={props.onChange}
			inputProps={{
				name: "season",
				id: "season-select"
			}}
		>
			{props.seasonsList.map(row => (
				<MenuItem value={row.season} key={row.season}>
					{row.season}
				</MenuItem>
			))}
		</Select>
	</>
);

SeasonsSelect.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	seasonsList: PropTypes.array.isRequired
};

export default SeasonsSelect;
