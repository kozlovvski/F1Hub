import PropTypes from "prop-types";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import PositionDifference from 'components/ui/PositionDifference'

const ReceResultsTable = props => (
	<Table size="small">
		<TableHead>
			<TableRow>
				<TableCell style={{ paddingRight: 0 }}>No.</TableCell>
				<TableCell>{props.isConstructor ? "Driver" : "Race"}</TableCell>
				<TableCell>Pos.</TableCell>
				<TableCell>Status</TableCell>
				<TableCell>Time</TableCell>
			</TableRow>
		</TableHead>
		<TableBody>
			{props.data.map((row, index) => (
				<React.Fragment key={row.raceName}>
					{props.isConstructor && (
						<TableRow>
							<TableCell style={{ paddingRight: 0}}>{index + 1 + "."}</TableCell>
							<TableCell colSpan={4} style={{ fontWeight: 700}}>{row.raceName}</TableCell>
						</TableRow>
					)}
					{row.Results.map(actualResultsRow => (
						<TableRow key={actualResultsRow.grid}>
							{props.isConstructor ? (
								<>
									<TableCell />
									<TableCell>
										{`${actualResultsRow.Driver.givenName} ${
											actualResultsRow.Driver.familyName
										}`}
									</TableCell>
								</>
							) : (
								<>
									<TableCell style={{ paddingRight: 0 }}>{index + 1 + "."}</TableCell>
									<TableCell style={{ fontWeight: 700}}>{row.raceName}</TableCell>
								</>
							)}
							<TableCell>{actualResultsRow.position}<PositionDifference initPos={actualResultsRow.grid} endPos={actualResultsRow.position} /></TableCell>
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
