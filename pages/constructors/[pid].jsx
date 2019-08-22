import Head from "components/Head";

import getConstructorInfo from "util/getConstructorInfo";
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
	ListItem,
	Button
} from "@material-ui/core";
import { useState, useEffect } from "react";

import getWikiDefaultImage from "util/getWikiDefaultImage";
import getWikiIntro from "util/getWikiIntro";
import getSeasonsForConstructor from "util/getSeasonsForConstructor";
import getRacesResultsForConstructor from "util/getRacesResultsForConstructor";
import getQualifyingResultsForConstructor from "util/getQualifyingResultsForConstructor";

import CenteredLoader from "components/ui/CenteredLoader";
import TeamColorBar from "components/ui/TeamColorBar";
import SeasonsSelect from "components/SeasonsSelect";
import SeasonsDisplay from "components/SeasonsDisplay";
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
		maxWidth: `calc(100vw - ${theme.spacing(2) * 2}px)`,
		height: "100%",
		position: "relative"
	},
	tableContainer: {
		overflowX: "auto",
		width: "100%"
	},
	driverBio: {
		display: "flex",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column"
		}
	},
	driverPhoto: {
		[theme.breakpoints.up("sm")]: {
			width: "30%"
		},
		[theme.breakpoints.down("xs")]: {
			height: "30vh"
		},
		backgroundPositionY: "25%",
		backgroundSize: "cover",
		flexShrink: 0
	}
}));

const ConstructorPage = props => {
	const {
		constructorInfo,
		wikiImage,
		wikiIntro,
		constructorsForDriver
	} = props;
	const seasonsForConstructor = props.seasonsForConstructor.slice().reverse();
	const classes = useStyles();

	const [season, setSeason] = useState(seasonsForConstructor[0].season);
	const [racesResultsForDriver, setRacesResultsForDriver] = useState([]);
	const [qualifyingResultsForDriver, setQualifyingResultsForDriver] = useState(
		[]
	);

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
				await getRacesResultsForConstructor(
					constructorInfo.constructorId,
					season
				)
			);
			setQualifyingResultsForDriver(
				await getQualifyingResultsForConstructor(
					constructorInfo.constructorId,
					season
				)
			);
			setLoading(false);
		}
		fetchData();
	}, [season]);

	const ConstructorBio = () => (
		<Card className={`${classes.fluidContainer} ${classes.driverBio}`}>
			<CardMedia
				className={classes.driverPhoto}
				image={wikiImage ? wikiImage : "/static/images/no_photo.png"}
				title={constructorInfo.name}
			/>
			<CardContent className={`${classes.padding} ${classes.fluidContainer}`}>
				<Typography variant="h6" component="h3" gutterBottom>
					Constructor Info:
				</Typography>
				<Typography variant="body1" gutterBottom>
					{wikiIntro}
				</Typography>
				<Link href={constructorInfo.url} color="textPrimary">
					<Typography variant="button">read more on Wikipedia</Typography>
				</Link>
			</CardContent>
		</Card>
	);

	const ConstructorSeasonsList = () => (
		<Paper className={classes.fluidContainer}>
			<Toolbar className={classes.cardName}>
				<Typography variant="h6" component="h3" className={classes.tableName}>
					Seasons:
				</Typography>
			</Toolbar>
			<div className={classes.padding}>
				<SeasonsDisplay data={seasonsForConstructor} />
			</div>
		</Paper>
	);

	const RacesResults = () => (
		<Paper className={classes.fluidContainer}>
			<Toolbar className={classes.cardName}>
				<Typography variant="h6" component="h3" className={classes.tableName}>
					Race results:
				</Typography>
			</Toolbar>
			<div className={classes.tableContainer}>
				{loading ? (
					<CenteredLoader />
				) : (
					<RaceResultsTable isConstructor data={racesResultsForDriver} />
				)}
			</div>
		</Paper>
	);

	const QualifyingResults = () => (
		<Paper className={classes.fluidContainer}>
			<Toolbar className={classes.cardName}>
				<Typography variant="h6" component="h3" className={classes.tableName}>
					Qualifying results:
				</Typography>
			</Toolbar>
			<div className={classes.tableContainer}>
				{loading ? (
					<CenteredLoader />
				) : (
					<QualifyingResultsTable
						isConstructor
						data={qualifyingResultsForDriver}
					/>
				)}
			</div>
		</Paper>
	);

	return (
		<>
			<Head title={constructorInfo.name} />
			<TeamColorBar team={constructorInfo.name}>
				<Typography variant="h2" gutterBottom>
					{constructorInfo.name}
				</Typography>
			</TeamColorBar>
			<Grid container spacing={3} style={{ minHeight: 200 }}>
				<Grid item xs={12} md={6}>
					<ConstructorBio />
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					placeholder
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<ConstructorSeasonsList />
				</Grid>
			</Grid>
			<div className={classes.paddingY}>
				<SeasonsSelect
					seasonsList={seasonsForConstructor}
					value={season}
					onChange={changeSeason}
				/>
			</div>
			<Grid container spacing={3} style={{ minHeight: 200 }}>
				<Grid item xs={12} md={6}>
					<RacesResults />
				</Grid>
				<Grid item xs={12} md={6}>
					<QualifyingResults />
				</Grid>
			</Grid>
		</>
	);
};

ConstructorPage.getInitialProps = async ({ query }) => {
	const { pid } = query;
	const constructorInfo = await getConstructorInfo(pid);
	return {
		name: "Constructor overview",
		constructorInfo,
		seasonsForConstructor: await getSeasonsForConstructor(
			constructorInfo.constructorId
		),
		wikiImage: await getWikiDefaultImage(constructorInfo.url),
		wikiIntro: await getWikiIntro(constructorInfo.url)
	};
};

export default ConstructorPage;
