import { Grid} from "@material-ui/core";

import Head from "components/Head";
import DriversStandingsTable from "components/DriversStandingsTable";
import ConstructorsStandingsTable from "components/ConstructorsStandingsTable";
import NextRaceCard from "components/NextRaceCard";
import ContentCard from "components/ContentCard";

import getConstructorsStandings from "util/getConstructorsStandings";
import getDriversStandings from "util/getDriversStandings";
import getNextRace from "util/getNextRace";

const Home = ({
	driversStandingsData,
	constructorsStandingsData,
	nextRaceData,
}) => {
	const DriversStandings = () => (
		<ContentCard
			name="Drivers Standings"
			caption={`after round\u00A0${driversStandingsData.round}`}>
			<DriversStandingsTable data={driversStandingsData} />
		</ContentCard>
	);

	const ConstructorsStandings = () => (
		<ContentCard
			name="Drivers Standings"
			caption={`after round\u00A0${constructorsStandingsData.round}`}>
			<ConstructorsStandingsTable data={constructorsStandingsData} />
		</ContentCard>
	);

	return (
		<>
			<Head title="Home" />
			<Grid container spacing={3}>
				<Grid item xs={12} md={5}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6} md={12}>
							<DriversStandings />
						</Grid>
						<Grid item xs={12} sm={6} md={12}>
							<ConstructorsStandings />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} md={7}>
					<NextRaceCard data={nextRaceData} />
				</Grid>
			</Grid>
		</>
	);
};

Home.getInitialProps = async () => {
	return {
		name: "Dashboard",
		driversStandingsData: await getDriversStandings(),
		constructorsStandingsData: await getConstructorsStandings(),
		nextRaceData: await getNextRace(),
	};
};

export default Home;
