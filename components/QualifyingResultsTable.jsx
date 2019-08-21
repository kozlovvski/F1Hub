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

const QualifyingResultsTable = props => (
	<Table size="small">
		<TableHead>
			<TableRow>
				<TableCell style={{ paddingRight: 0 }}>No.</TableCell>
				<TableCell>{props.isConstructor ? "Driver" : "Race"}</TableCell>
				<TableCell>Q1</TableCell>
				<TableCell>Q2</TableCell>
				<TableCell>Q3</TableCell>
				<TableCell>Position</TableCell>
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
					{row.QualifyingResults.map(actualQualifyingResultsRow => (
						<TableRow key={actualQualifyingResultsRow.grid}>
							{!props.isConstructor && (
								<TableCell style={{ paddingRight: 0 }}>{index + 1}</TableCell>
							)}
							<TableCell>
								{props.isConstructor
									? `${actualQualifyingResultsRow.Driver.givenName} ${
											actualQualifyingResultsRow.Driver.familyName
									  }`
									: row.raceName}
							</TableCell>
							<TableCell>{actualQualifyingResultsRow.Q1 || "—"}</TableCell>
							<TableCell>{actualQualifyingResultsRow.Q2 || "—"}</TableCell>
							<TableCell>{actualQualifyingResultsRow.Q3 || "—"}</TableCell>
							<TableCell>
								{actualQualifyingResultsRow.position || "—"}
							</TableCell>
						</TableRow>
					))}
				</React.Fragment>
			))}
		</TableBody>
	</Table>
);

QualifyingResultsTable.propTypes = {
	data: PropTypes.array.isRequired,
	isConstructor: PropTypes.bool
};

QualifyingResultsTable.defaultProps = {
	isConstructor: false
};

export default QualifyingResultsTable;
