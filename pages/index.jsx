import { Grid, Paper } from "@material-ui/core";

import Head from "components/Head";
import DriversStandings from "components/DriversStandings";
import CollapseWithButton from "components/CollapseWithButton";
import ConstructorsStandings from "components/ConstructorsStandings";
import NextRaceCard from 'components/NextRaceCard'

import getConstructorsStandings from "util/getConstructorsStandings";
import getDriversStandings from "util/getDriversStandings";
import getNextRace from 'util/getNextRace'

const Home = props => (
  <>
    <Head title="Home" />
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={12}>
            <Paper>
              <CollapseWithButton height="200px">
                <DriversStandings data={props.driversStandingsData} />
              </CollapseWithButton>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            <Paper>
              <CollapseWithButton height="200px">
                <ConstructorsStandings data={props.constructorsStandingsData} />
              </CollapseWithButton>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={7}>
        <NextRaceCard data={props.nextRaceData}/>
      </Grid>
    </Grid>
  </>
);

Home.getInitialProps = async () => {
  return {
    name: "Dashboard",
    driversStandingsData: await getDriversStandings(),
    constructorsStandingsData: await getConstructorsStandings(),
    nextRaceData: await getNextRace(),
  };
};

export default Home;
