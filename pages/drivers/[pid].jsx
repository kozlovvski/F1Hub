import Head from "components/Head";

import getDriverInfo from "util/getDriverInfo";
import {
	Typography,
	Grid,
	Paper,
	Card,
	CardMedia,
	CardContent,
	Link,
	makeStyles,
	Toolbar,
	Table,
	TableHead,
	TableCell,
	TableBody,
	TableRow,
	List,
	ListItem
} from "@material-ui/core";
import { useState, useEffect } from "react";

import getWikiDefaultImage from "util/getWikiDefaultImage";
import getWikiIntro from "util/getWikiIntro";
import getConstructorsForDriver from "util/getConstructorsForDriver";
import getSeasonsForDriver from "util/getSeasonsForDriver";
import getRacesResultsForDriver from "util/getRacesResultsForDriver";
import getQualifyingResultsForDriver from "util/getQualifyingResultsForDriver";

import CenteredLoader from "components/ui/CenteredLoader";
import TeamColorBar from "components/ui/TeamColorBar";
import SeasonsSelect from "components/SeasonsSelect";
import RaceResultsTable from "components/RaceResultsTable";
import QualifyingResultsTable from "components/QualifyingResultsTable";

const useStyles = makeStyles(theme => ({
	padding: {
		padding: theme.spacing(2)
	},
	paddingY: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2)
	},
	cardName: {
		padding: theme.spacing(2)
	},
	fluidContainer: {
		width: "100%",
		height: "100%",
		position: "relative"
	},
	overflow: {
		overflow: "auto"
	}
}));

const DriverPage = props => {
	const { driverInfo, wikiImage, wikiIntro, constructorsForDriver } = props;
	const seasonsForDriver = props.seasonsForDriver.slice().reverse();
	const classes = useStyles();

	const [season, setSeason] = useState(seasonsForDriver[0].season);
  const [racesResultsForDriver, setRacesResultsForDriver] = useState([]);
  const [qualifyingResultsForDriver, setQualifyingResultsForDriver] = useState([])

	const [loading, setLoading] = useState(true);

	const changeSeason = async e => {
		if (season != e.target.value) {
			setLoading(true);
			setSeason(e.target.value);
		}
	};

	useEffect(() => {
		async function fetchData() {
			setRacesResultsForDriver(
				await getRacesResultsForDriver(driverInfo.driverId, season)
      );
      setQualifyingResultsForDriver(
        await getQualifyingResultsForDriver(driverInfo.driverId, season))
			setLoading(false);
		}
		fetchData();
	}, [season]);

	const DriverBio = () => (
		<Card style={{ display: "flex" }} className={classes.fluidContainer}>
			<CardMedia
				style={{
					width: "30%",
					backgroundPositionY: "25%",
					backgroundSize: "cover",
					flexShrink: 0
				}}
				image={wikiImage ? wikiImage : "/static/images/no_photo.png"}
				title={`${driverInfo.givenName} ${driverInfo.familyName}`}
			/>
			<CardContent className={`${classes.padding} ${classes.fluidContainer}`}>
				<Typography variant="h6" component="h3" gutterBottom>
					Driver bio:
				</Typography>
				<Typography variant="body1">
					{wikiIntro}
					<Link href={driverInfo.url}>read more on Wikipedia</Link>
				</Typography>
			</CardContent>
		</Card>
	);

	const DriverConstructorsList = () => (
		<Paper className={classes.fluidContainer}>
			<Toolbar className={classes.cardName}>
				<Typography variant="h6" component="h3" className={classes.tableName}>
					Constructors:
				</Typography>
			</Toolbar>
			<List className={classes.cardContent}>
				{constructorsForDriver.map(row => (
					<ListItem key={row.constructorId}>
						<Typography variant="body1">
							<TeamColorBar team={row.name}>{row.name}</TeamColorBar>
						</Typography>
					</ListItem>
				))}
			</List>
		</Paper>
	);

	const DriverSeasonsList = () => (
		<Paper className={classes.fluidContainer}>
			<Toolbar className={classes.cardName}>
				<Typography variant="h6" component="h3" className={classes.tableName}>
					Seasons:
				</Typography>
			</Toolbar>
			<List
				className={classes.cardContent}
				style={{ display: "flex", flexWrap: "wrap" }}
			>
				{seasonsForDriver.map(row => (
					<ListItem key={row.season} style={{ maxWidth: "25%" }}>
						<Typography variant="body1">{row.season}</Typography>
					</ListItem>
				))}
			</List>
		</Paper>
	);

	const RacesResults = () => (
		<Paper className={classes.fluidContainer}>
			<Toolbar className={classes.cardName}>
				<Typography variant="h6" component="h3" className={classes.tableName}>
					Race results:
				</Typography>
			</Toolbar>
			{loading ? (
				<CenteredLoader />
			) : (
				<RaceResultsTable data={racesResultsForDriver} />
			)}
		</Paper>
  );
  
  const QualifyingResults = () => (
		<Paper className={classes.fluidContainer}>
			<Toolbar className={classes.cardName}>
				<Typography variant="h6" component="h3" className={classes.tableName}>
					Qualifying results:
				</Typography>
			</Toolbar>
			{loading ? (
				<CenteredLoader />
			) : (
				<QualifyingResultsTable data={qualifyingResultsForDriver} />
			)}
		</Paper>
	);

	return (
		<>
			<Head title={`${driverInfo.givenName} ${driverInfo.familyName}`} />
			<Typography variant="h2" gutterBottom>{`${driverInfo.givenName} ${
				driverInfo.familyName
			}`}</Typography>
			<Grid container spacing={3} style={{ minHeight: 200 }}>
				<Grid item md={6}>
					<DriverBio />
				</Grid>
				<Grid item md={3}>
					<DriverConstructorsList />
				</Grid>
				<Grid item md={3}>
					<DriverSeasonsList />
				</Grid>
			</Grid>
			<div className={classes.paddingY}>
				<SeasonsSelect
					seasonsList={seasonsForDriver}
					value={season}
					onChange={changeSeason}
				/>
				{/* add constructor here */}
			</div>
			<Grid container spacing={3} style={{ minHeight: 200 }}>
				<Grid item md={6}>
					<RacesResults />
				</Grid>
				<Grid item md={6}>
          <QualifyingResults />
        </Grid>
			</Grid>
		</>
	);
};

DriverPage.getInitialProps = async ({ query }) => {
	const { pid } = query;
	const driverInfo = await getDriverInfo(pid);
	return {
		name: "Driver overview",
		driverInfo,
		seasonsForDriver: await getSeasonsForDriver(driverInfo.driverId),
		constructorsForDriver: await getConstructorsForDriver(driverInfo.driverId),
		wikiImage: await getWikiDefaultImage(driverInfo.url),
		wikiIntro: await getWikiIntro(driverInfo.url)
	};
};

export default DriverPage;
