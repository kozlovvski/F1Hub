import PropTypes from 'prop-types';
import { makeStyles, Typography, Table, TableHead, TableRow, TableCell, TableBody, Toolbar } from "@material-ui/core";

import TeamColorBar from 'components/ui/TeamColorBar';

const useStyles = makeStyles(theme => ({
  tableName: {
		flexGrow: 1,
		flexShrink: 0,
		marginRight: theme.spacing(2)
	},
	tableContainer: {
		height: "calc(100% - 65px)"
	},
	tableHeader: {
		padding: theme.spacing(2)
	},
	tableHeaderCell: {
		position: "sticky",
		top: 0,
		backgroundColor: theme.palette.background.paper
	},
	roundName: {
		textAlign: "right"
	}
}))

const ConstructorsStandings = props => {
	const classes = useStyles();
	return (
		<>
			<Toolbar className={classes.tableHeader}>
					<Typography variant="h6" component="h3" className={classes.tableName}>
						Constructors Standings
					</Typography>
					<Typography variant="caption" className={classes.roundName}>
						{"after round\u00A0" + props.data.round}
					</Typography>
			</Toolbar>
			<Table size="small"className={classes.tableContainer}>
				<TableHead>
					<TableRow>
						<TableCell className={classes.tableHeaderCell}>Pos.</TableCell>
						<TableCell className={classes.tableHeaderCell}>Constructor</TableCell>
						<TableCell className={classes.tableHeaderCell}>Points</TableCell>
						<TableCell className={classes.tableHeaderCell}>Wins</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.data.ConstructorStandings.map(row => (
						<TableRow key={row.Constructor.constructorId}>
							<TableCell>{row.position}</TableCell>
							<TableCell><TeamColorBar team={row.Constructor.name}>{row.Constructor.name}</TeamColorBar></TableCell>
							<TableCell>{row.points}</TableCell>
							<TableCell>{row.wins}</TableCell>
						</TableRow>
						)
					)}
				</TableBody>
			</Table>
		</>
	)
}

ConstructorsStandings.propTypes = {
	year: PropTypes.string,
	data: PropTypes.shape({
		ConstructorsStandings: PropTypes.array,
		round: PropTypes.string,
		season: PropTypes.string
	})
}

ConstructorsStandings.defaultProps = {
	year: "current"
}


export default ConstructorsStandings