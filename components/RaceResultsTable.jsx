import PropTypes from "prop-types";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Toolbar
} from "@material-ui/core";

const ReceResultsTable = props => (
	<Table size="small">
		<TableHead>
			<TableRow>
				<TableCell style={{ paddingRight: 0 }}>No.</TableCell>
				<TableCell>{props.isConstructor ? "Driver" : "Race"}</TableCell>
				<TableCell>Position</TableCell>
				<TableCell>Status</TableCell>
				<TableCell>Time</TableCell>
			</TableRow>
		</TableHead>
		<TableBody>
			{props.data.map((row, index) => (
				<React.Fragment key={row.raceName}>
					{props.isConstructor && (
						<TableRow>
							<TableCell style={{ paddingRight: 0 }}>{index + 1}</TableCell>
							<TableCell>{row.raceName}</TableCell>
						</TableRow>
					)}
					{row.Results.map(actualResultsRow => (
						<TableRow key={actualResultsRow.grid}>
							{!props.isConstructor && (
								<TableCell style={{ paddingRight: 0 }}>{index + 1}</TableCell>
							)}
							<TableCell>
								{props.isConstructor
									? `${actualResultsRow.Driver.givenName} ${
											actualResultsRow.Driver.familyName
									  }`
									: row.raceName}
							</TableCell>
							<TableCell>{actualResultsRow.position}</TableCell>
							<TableCell>{actualResultsRow.status}</TableCell>
							<TableCell>
								{actualResultsRow.Time ? actualResultsRow.Time.time : "—"}
							</TableCell>
						</TableRow>
					))}
				</React.Fragment>
			))}
		</TableBody>
	</Table>
);

ReceResultsTable.propTypes = {
	data: PropTypes.array.isRequired,
	isConstructor: PropTypes.bool
};

ReceResultsTable.defaultProps = {
	isConstructor: false
};

export default ReceResultsTable;
