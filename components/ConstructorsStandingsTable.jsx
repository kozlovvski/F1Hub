import PropTypes from "prop-types";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import TeamColorBar from "components/TeamColorBar";

const ConstructorsStandingsTable = ({ data }) => (
	<Table size="small" style={{ height: "calc(100% - 1px)" }}>
		<TableHead>
			<TableRow>
				<TableCell>Pos.</TableCell>
				<TableCell>Constructor</TableCell>
				<TableCell>Points</TableCell>
				<TableCell>Wins</TableCell>
			</TableRow>
		</TableHead>
		<TableBody>
			{data.ConstructorStandings.map(row => (
				<TableRow key={row.Constructor.constructorId}>
					<TableCell>{row.position}</TableCell>
					<TableCell>
						<TeamColorBar team={row.Constructor.name}>
							{row.Constructor.name}
						</TeamColorBar>
					</TableCell>
					<TableCell>{row.points}</TableCell>
					<TableCell>{row.wins}</TableCell>
				</TableRow>
			))}
		</TableBody>
	</Table>
);

ConstructorsStandingsTable.propTypes = {
	data: PropTypes.array.isRequired,
};

export default ConstructorsStandingsTable;
