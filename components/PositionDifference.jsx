const PositionDifference = props => {
	const { initPos, endPos } = props;
	const posDiff = initPos - endPos;

	return posDiff > 0 ? (
		<span style={{ color: "#15b33f", fontSize: "0.85em"}}>{` (+${posDiff})`}</span>
	) : (
		(posDiff == 0 ? (
			<span style={{ color: "#dba100", fontSize: "0.85em"}}>{` (0)`}</span>
		) : (
			<span style={{ color: "#bf0f0f", fontSize: "0.85em"}}>{` (${posDiff})`}</span>
		))
	);
};

export default PositionDifference;
