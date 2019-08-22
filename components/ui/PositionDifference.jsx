import { Typography } from "@material-ui/core";

const PositionDifference = props => {
	const { initPos, endPos } = props;
	const posDiff = initPos - endPos;

	return posDiff > 0 ? (
		<Typography variant="caption" style={{ color: "#15b33f" }}>{` (+${posDiff})`}</Typography>
	) : (
		(posDiff == 0 ? (
			<Typography variant="caption" style={{ color: "#dba100" }}>{` (0)`}</Typography>
		) : (
			<Typography variant="caption" style={{ color: "#bf0f0f" }}>{` (${posDiff})`}</Typography>
		))
	);
};

export default PositionDifference;
