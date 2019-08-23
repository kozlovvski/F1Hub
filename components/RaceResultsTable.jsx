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

import PositionDifference from "components/ui/PositionDifference";
import TeamColorBar from "components/ui/TeamColorBar";

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
							<TableCell style={{ paddingRight: 0 }}>
								{index + 1 + "."}
							</TableCell>
							<TableCell colSpan={4} style={{ fontWeight: 700, whiteSpace: "nowrap" }}>
								{row.raceName}
							</TableCell>
						</TableRow>
					)}
					{row.Results.map(actualResultsRow => (
						<TableRow key={actualResultsRow.grid}>
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
									<TableCell style={{ paddingRight: 0 }}>
										{index + 1 + "."}
									</TableCell>
									<TableCell style={{ fontWeight: 700, whiteSpace: "nowrap" }}>
										{row.raceName}
									</TableCell>
								</>
							)}
							<TableCell style={{whiteSpace: "nowrap"}}>
								{actualResultsRow.position}
								<PositionDifference
									initPos={actualResultsRow.grid}
									endPos={actualResultsRow.position}
								/>
							</TableCell>
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
