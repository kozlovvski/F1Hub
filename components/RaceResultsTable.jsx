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

import TeamColorBar from "components/ui/TeamColorBar";

const ReceResultsTable = props => (
	<Table size="small">
		<TableHead>
			<TableRow>
				<TableCell>
					{props.isConstructor ? "Driver" : "Race"}
				</TableCell>
				<TableCell>Position</TableCell>
				<TableCell>Status</TableCell>
				<TableCell>Time</TableCell>
			</TableRow>
		</TableHead>
		<TableBody>
			{props.data.map(row => (
				<React.Fragment key={row.raceName}>
					{props.isConstructor && (
						<TableRow>
							{row.raceName}
						</TableRow>
					)}
					{row.Results.map(actualResultsRow => (
						<TableRow key={actualResultsRow.grid}>
							<TableCell>{props.isConstructor ? `${actualResultsRow.Driver.givenName} ${actualResultsRow.Driver.familyName}` : row.raceName}</TableCell>
              <TableCell>{actualResultsRow.position}</TableCell>
							<TableCell>{actualResultsRow.status}</TableCell>
							<TableCell>{actualResultsRow.Time ? actualResultsRow.Time.time : "—"}</TableCell>
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
