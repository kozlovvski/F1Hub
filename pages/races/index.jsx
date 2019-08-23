import {
	Paper,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Typography,
	makeStyles,
	Hidden,
	Toolbar
} from "@material-ui/core";

import Head from "components/Head";
import CollapseWithButton from "components/ui/CollapseWithButton";
import RaceScheduleTable from "components/RaceScheduleTable";
import TeamColorBar from "components/ui/TeamColorBar";
import SeasonsSelect from "components/SeasonsSelect";
import CenteredLoader from "components/ui/CenteredLoader";

import { useState, useEffect } from "react";
import Link from "next/link";

import getRaceSchedule from "util/getRaceSchedule";
import getWikiDefaultImage from "util/getWikiDefaultImage";
import getSeasonsList from "util/getSeasonsList";

const useStyles = makeStyles(theme => ({
	container: {
		[theme.breakpoints.up("xs")]: {
			gridTemplateColumns: "1fr"
		},
		[theme.breakpoints.up("sm")]: {
			gridTemplateColumns: "repeat(2, 1fr)",
			paddingTop: theme.spacing(3)
		},
		[theme.breakpoints.up("lg")]: {
			gridTemplateColumns: "repeat(4, 1fr)"
		},
		display: "grid",
		gridGap: theme.spacing(3),
		paddingTop: theme.spacing(2)
	},
	featuredBox: {
		[theme.breakpoints.up("xs")]: {
			gridRow: "3 / 4"
		},
		[theme.breakpoints.up("sm")]: {
			gridColumn: "1 / 3",
			gridRow: "2 / 3"
		},
		[theme.breakpoints.up("md")]: {
			gridColumn: "2 / 3",
			gridRow: "1 / 3"
		},
		[theme.breakpoints.up("lg")]: {
			gridColumn: "3 / 5",
			gridRow: "1 / 3"
		},
		maxHeight: 250 * 2 + theme.spacing(3),
		overflow: "auto"
	},
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
	}
}));

const Circuit = ({data}) => (
		<Card>
			<Link href={`/circuits/${data.Circuit.circuitId}`}>
				<CardActionArea>
					<CardMedia
						style={{ height: 150, backgroundPositionY: "25%", backgroundImage: `url(static/images/circuits/${data.Circuit.circuitId}.jpg), url(/static/images/no_photo.png)` }}
						// this is to hide material-ui error that image must be specified
						image={"/static/images/no_photo.png"}
						title={data.Circuit.circuitName}
					/>
					<CardContent>
							<Typography variant="h5" component="h3">
								{data.raceName}
							</Typography>
							<Typography variant="caption" component="p">
								{data.Circuit.circuitName}
							</Typography>
							<Typography variant="caption" component="p">
								{new Date(data.date).toLocaleDateString("en-GB", {day: "numeric", month: "long"})}
							</Typography>
					</CardContent>
				</CardActionArea>
			</Link>
		</Card>
	)

const Races = props => {
	const classes = useStyles();
	const seasons = props.seasons.slice().reverse();

	const [data, setData] = useState(props.raceScheduleData);
	const [season, setSeason] = useState(seasons[0].season);
	const [loading, setLoading] = useState(false);

	const changeSeason = async e => {
		setLoading(true);

		setSeason(e.target.value);
		setData(await getRaceSchedule(e.target.value));

		setLoading(false);
	};

	const RaceSchedule = () => (
		<Paper className={`${classes.featuredBox} ${classes.fluidContainer}`}>
			<Hidden mdUp>
				<CollapseWithButton height="200px">
					<Toolbar className={classes.cardName}>
						<Typography
							variant="h6"
							component="h3"
							className={classes.tableName}
						>
							Race schedule:
						</Typography>
					</Toolbar>
					<div className={classes.tableContainer}>
						<RaceScheduleTable data={data} />
					</div>
				</CollapseWithButton>
			</Hidden>
			<Hidden smDown>
				<Toolbar className={classes.cardName}>
					<Typography variant="h6" component="h3" className={classes.tableName}>
						Race schedule:
					</Typography>
				</Toolbar>
				<div className={classes.tableContainer}>
					<RaceScheduleTable data={data} />
				</div>
			</Hidden>
		</Paper>
	);

	return (
		<>
			<Head title="Races" />
			{loading ? (
				<CenteredLoader />
			) : (
				<>
					<SeasonsSelect
						name="season"
						id="select-season"
						value={season}
						onChange={changeSeason}
						seasonsList={seasons}
					/>
					<div className={classes.container}>
						<RaceSchedule />
						{data.map(row => (
							<Circuit data={row} key={row.raceName} />
						))}
					</div>
				</>
			)}
		</>
	);
};

Races.getInitialProps = async () => {
	return {
		name: "Races",
		raceScheduleData: await getRaceSchedule(),
		seasons: await getSeasonsList()
	};
};

export default Races;
