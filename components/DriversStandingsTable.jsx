import PropTypes from "prop-types";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import TeamColorBar from "components/TeamColorBar";

const DriversStandingsTable = ({ data }) => (
	<Table size="small" style={{ height: "calc(100% - 1px)" }}>
		<TableHead>
			<TableRow>
				<TableCell>Pos.</TableCell>
				<TableCell>Driver</TableCell>
				<TableCell>Points</TableCell>
				<TableCell>Wins</TableCell>
			</TableRow>
		</TableHead>
		<TableBody>
			{data.DriverStandings.map(row => (
				<TableRow key={row.Driver.driverId}>
					<TableCell>{row.position}</TableCell>
					<TableCell>
						<TeamColorBar team={row.Constructors[0].name}>
							{`${row.Driver.givenName} ${row.Driver.familyName}`}
						</TeamColorBar>
					</TableCell>
					<TableCell>{row.points}</TableCell>
					<TableCell>{row.wins}</TableCell>
				</TableRow>
			))}
		</TableBody>
	</Table>
);

DriversStandingsTable.propTypes = {
	data: PropTypes.array.isRequired,
};

DriversStandingsTable.defaultProps = {
	year: "current",
};

export default DriversStandingsTable;
