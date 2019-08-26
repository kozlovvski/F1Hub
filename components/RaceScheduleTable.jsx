import PropTypes from "prop-types";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

const RaceScheduleTable = ({data, includeCircuit}) => (
	<Table size="small">
		<TableHead>
			<TableRow>
				<TableCell style={{ paddingRight: 0 }}>No.</TableCell>
				<TableCell>Race</TableCell>
				<TableCell>Date</TableCell>
				{includeCircuit && <TableCell>Circuit</TableCell>}
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
					{includeCircuit && <TableCell>{row.Circuit.circuitName}</TableCell>}
				</TableRow>
			))}
		</TableBody>
	</Table>
);

RaceScheduleTable.propTypes = {
	data: PropTypes.array.isRequired,
	includeCircuit: PropTypes.bool
};

RaceScheduleTable.defaultProps = {
	includeCircuit: false
}

export default RaceScheduleTable;
