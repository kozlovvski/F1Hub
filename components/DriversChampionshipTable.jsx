import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { makeStyles, useTheme, Typography, Grid, Table, TableHead, TableRow, TableCell, TableBody, Toolbar } from "@material-ui/core";
import { createDeflateRaw } from 'zlib';

const useStyles = makeStyles(theme => ({
  tableName: {
		flexGrow: 1,
		flexShrink: 0,
		marginRight: theme.spacing(2)
	},
	tableContainer: {
		maxHeight: 400,
		overflow: "auto"
	},
	tableHeader: {
		padding: theme.spacing(2)
	},
	roundName: {
		textAlign: "right"
	}
}))

const DriversChampionshipTable = props => {
	const classes = useStyles();
	const theme = useTheme();
	
	const [data, setData] = useState({DriverStandings: [], round: 0});

	useEffect(() => {
		const fetchData = async () => {
			const res = await axios(
				`https://ergast.com/api/f1/${props.year}/driverStandings.json`
			)
			const resData = await res.data;
			const driversStanding = await resData.MRData.StandingsTable.StandingsLists[0];
			console.log(driversStanding);
			setData(driversStanding);
		}

		fetchData();
	}, [])

	return (
		<>
			<Toolbar className={classes.tableHeader}>
					<Typography variant="h6" component="h3" className={classes.tableName}>
						Drivers Championship
					</Typography>
					<Typography variant="caption" className={classes.roundName}>
						{"after round\u00A0" + data.round}
					</Typography>
			</Toolbar>
			<div className={classes.tableContainer}>
			<Table size="small">
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
							<TableCell>{`${row.Driver.givenName} ${row.Driver.familyName}`}</TableCell>
							<TableCell>{row.points}</TableCell>
							<TableCell>{row.wins}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			</div>
		</>
	)
}

DriversChampionshipTable.propTypes = {
	year: PropTypes.string
}

DriversChampionshipTable.defaultProps = {
	year: "current"
}


export default DriversChampionshipTable