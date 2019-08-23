import { CircularProgress } from "@material-ui/core";

const ConteredLoader = props => (
	<div
		style={{
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)"
		}}
	>
		<CircularProgress />
	</div>
);

export default ConteredLoader;
