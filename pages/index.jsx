import { makeStyles, Hidden } from "@material-ui/core";

import Head from "components/Head";
import DriversStandingsTable from "components/DriversStandingsTable";
import ConstructorsStandingsTable from "components/ConstructorsStandingsTable";
import RaceScheduleTable from "components/RaceScheduleTable";
import NextRaceCard from "components/NextRaceCard";
import ContentCard from "components/ContentCard";
import CollapseWithButton from "components/CollapseWithButton";

import getConstructorsStandings from "util/getConstructorsStandings";
import getRaceSchedule from "util/getRaceSchedule";
import getDriversStandings from "util/getDriversStandings";
import getNextRace from "util/getNextRace";

const useStyles = makeStyles(theme => ({
	container: {
		display: "grid",
		gridGap: theme.spacing(3),
		[theme.breakpoints.up("md")]: {
			gridTemplateColumns: "minmax(auto, 1fr) 1fr 1fr",
			gridTemplateRows: "1fr 1fr 1fr",
			height: "calc(100vh - 190px)"
		},
	},
	nextRace: {
		[theme.breakpoints.up("md")]: {
			gridColumn: "2 / 4",
			gridRow: "1 / 3"
		},
	},
	drivers: {
		[theme.breakpoints.up("md")]: {
			gridColumn: "1 / 2",
			gridRow: "1 / 2"
		},
	},
	constructors: {
		[theme.breakpoints.up("md")]: {
			gridColumn: "1 / 2",
			gridRow: "2 / 3"
		},
	},
	standings: {
		[theme.breakpoints.up("md")]: {
			gridColumn: "1 / 2",
			gridRow: "3 / 4"
		},
	},
}));

const Home = ({
	driversStandingsData,
	constructorsStandingsData,
	raceScheduleData,
	nextRaceData,
}) => {
	const classes = useStyles();

	const DriversStandings = ({ className }) => (
		<ContentCard
			className={className}
			name="Drivers Standings"
			caption={`after round\u00A0${driversStandingsData.round}`}>
			<Hidden mdUp>
				<CollapseWithButton height="120px">
					<DriversStandingsTable data={driversStandingsData} />
				</CollapseWithButton>
			</Hidden>
			<Hidden smDown>
				<DriversStandingsTable data={driversStandingsData} />
			</Hidden>
		</ContentCard>
	);

	const ConstructorsStandings = ({ className }) => (
		<ContentCard
			className={className}
			name="Constructors Standings"
			caption={`after round\u00A0${constructorsStandingsData.round}`}>
			<Hidden mdUp>
				<CollapseWithButton height="120px">
					<ConstructorsStandingsTable data={constructorsStandingsData} />
				</CollapseWithButton>
			</Hidden>
			<Hidden smDown>
				<ConstructorsStandingsTable data={constructorsStandingsData} />
			</Hidden>
		</ContentCard>
	);

	const RaceSchedule = ({ className }) => (
		<ContentCard className={className} name="Race Schedule">
			<Hidden mdUp>
				<CollapseWithButton height="120px">
					<RaceScheduleTable data={raceScheduleData} />
				</CollapseWithButton>
			</Hidden>
			<Hidden smDown>
				<RaceScheduleTable data={raceScheduleData} />
			</Hidden>
		</ContentCard>
	);

	return (
		<>
			<Head title="Home" />
			<div className={classes.container}>
				<NextRaceCard data={nextRaceData} className={classes.nextRace} />
				<DriversStandings className={classes.drivers} />
				<ConstructorsStandings className={classes.constructors} />
				<RaceSchedule className={classes.schedule} />
			</div>
		</>
	);
};

Home.getInitialProps = async () => {
	return {
		name: "Dashboard",
		driversStandingsData: await getDriversStandings(),
		constructorsStandingsData: await getConstructorsStandings(),
		raceScheduleData: await getRaceSchedule(),
		nextRaceData: await getNextRace(),
	};
};

export default Home;
