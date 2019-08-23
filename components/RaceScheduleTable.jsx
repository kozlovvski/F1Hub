import PropTypes from "prop-types";
import {
	makeStyles,
	Typography,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Toolbar
} from "@material-ui/core";

const RaceScheduleTable = ({data}) => (
	<Table size="small">
		<TableHead>
			<TableRow>
				<TableCell style={{ paddingRight: 0 }}>No.</TableCell>
				<TableCell>Race</TableCell>
				<TableCell>Date</TableCell>
				<TableCell>Circuit</TableCell>
			</TableRow>
		</TableHead>
		<TableBody>
			{data.map((row, index) => (
				<TableRow key={row.raceName}>
					<TableCell style={{ paddingRight: 0 }}>{index + 1 + "."}</TableCell>
					<TableCell style={{ fontWeight: 700, whiteSpace: "nowrap" }}>
						{row.raceName}
					</TableCell>
					<TableCell>{new Date(row.date).toLocaleDateString("en-GB", {day: "numeric", month: "long"})}</TableCell>
					<TableCell>{row.Circuit.circuitName}</TableCell>
				</TableRow>
			))}
		</TableBody>
	</Table>
);

export default RaceScheduleTable;
