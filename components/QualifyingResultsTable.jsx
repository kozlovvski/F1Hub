import PropTypes from "prop-types";
import NextLinkComponent from 'components/ui/NextLinkComponent'
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Link
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
				<TableCell>Pos.</TableCell>
			</TableRow>
		</TableHead>
		<TableBody>
			{props.data.map((row, index) => (
				<React.Fragment key={row.raceName}>
					{props.isConstructor && (
						<TableRow>
							<TableCell style={{ paddingRight: 0}}>{index + 1 + "."}</TableCell>
							<TableCell colSpan={5} style={{ paddingRight: 0, fontWeight: 700}}>{row.raceName}</TableCell>
						</TableRow>
					)}
					{row.QualifyingResults.map(actualResultsRow => (
						<TableRow key={actualResultsRow.position}>
							{props.isConstructor ? (
								<>
									<TableCell />
									<TableCell>
									<TeamColorBar team={actualResultsRow.Constructor.name}>
									<Link component={NextLinkComponent} color="textPrimary" href={"/drivers/" + actualResultsRow.Driver.driverId}>
												{`${actualResultsRow.Driver.givenName} ${
													actualResultsRow.Driver.familyName
												}`}
											</Link>
										</TeamColorBar>
									</TableCell>
								</>
							) : (
								<>
									<TableCell style={{ paddingRight: 0}}>{index + 1 + "."}</TableCell>
									<TableCell style={{ fontWeight: 700}}>{row.raceName}</TableCell>
								</>
							)}
							<TableCell>{actualResultsRow.Q1 || "—"}</TableCell>
							<TableCell>{actualResultsRow.Q2 || "—"}</TableCell>
							<TableCell>{actualResultsRow.Q3 || "—"}</TableCell>
							<TableCell>
								{actualResultsRow.position || "—"}
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
