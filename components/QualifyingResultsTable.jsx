import PropTypes from "prop-types";
import NextLinkComponent from "components/NextLinkComponent";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Link
} from "@material-ui/core";

import TeamColorBar from "components/TeamColorBar";

const QualifyingResultsTable = ({ data, racesData, isConstructor }) => (
	<Table size="small">
		<TableHead>
			<TableRow>
				<TableCell style={{ paddingRight: 0 }}>No.</TableCell>
				<TableCell>{isConstructor ? "Driver" : "Race"}</TableCell>
				<TableCell>Q1</TableCell>
				<TableCell>Q2</TableCell>
				<TableCell>Q3</TableCell>
				<TableCell>Pos.</TableCell>
			</TableRow>
		</TableHead>
		<TableBody>
			{/* Between 2000-2003 qualifying data is available only for few races and before 2000 for none.
					We want to list every race that happened and populate the table with available data
			*/}
			{racesData.map((row, index) => (
				<React.Fragment key={row.raceName}>
					{isConstructor && (
						<TableRow>
							<TableCell style={{ paddingRight: 0 }}>
								{index + 1 + "."}
							</TableCell>
							<TableCell
								colSpan={5}
								style={{
									paddingRight: 0,
									fontWeight: 700,
									whiteSpace: "nowrap"
								}}
							>
								{row.raceName}
							</TableCell>
						</TableRow>
					)}
					{/* check if qualifyings data contains results for given race and render them. If not, render cells with "no data" */}
					{data.some(qualifyingRow => qualifyingRow.raceName == row.raceName)
						? data
								.find(qualifyingRow => qualifyingRow.raceName == row.raceName)
								.QualifyingResults.map(actualResultsRow => (
									<TableRow key={actualResultsRow.position}>
										{isConstructor ? (
											<>
												<TableCell />
												<TableCell>
													<TeamColorBar
														team={actualResultsRow.Constructor.name}
													>
														<Link
															component={NextLinkComponent}
															color="textPrimary"
															href={
																"/drivers/" + actualResultsRow.Driver.driverId
															}
														>
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
												<TableCell
													style={{ fontWeight: 700, whiteSpace: "nowrap" }}
												>
													{row.raceName}
												</TableCell>
											</>
										)}
										<TableCell>{actualResultsRow.Q1 || "—"}</TableCell>
										<TableCell>{actualResultsRow.Q2 || "—"}</TableCell>
										<TableCell>{actualResultsRow.Q3 || "—"}</TableCell>
										<TableCell>{actualResultsRow.position || "—"}</TableCell>
									</TableRow>
								))
						: row.Results.map(actualResultsRow => (
								<TableRow key={actualResultsRow.position}>
									{isConstructor ? (
										<>
											<TableCell />
											<TableCell>
												<TeamColorBar team={actualResultsRow.Constructor.name}>
													<Link
														component={NextLinkComponent}
														color="textPrimary"
														href={
															"/drivers/" + actualResultsRow.Driver.driverId
														}
													>
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
											<TableCell
												style={{ fontWeight: 700, whiteSpace: "nowrap" }}
											>
												{row.raceName}
											</TableCell>
										</>
									)}
									{[...Array(4)].map((elem, index) => (
										<TableCell key={index}>
											<span style={{ opacity: 0.5 }}>no data</span>
										</TableCell>
									))}
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
