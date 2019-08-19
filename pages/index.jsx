import { Grid, Paper } from "@material-ui/core";

import Head from "components/Head";
import DriversStandings from "components/DriversStandings";
import CollapseWithButton from "components/ui/CollapseWithButton";
import ConstructorsStandings from "components/ConstructorsStandings";
import NextRaceCard from 'components/NextRaceCard'

import getConstructorsStandings from "util/getConstructorsStandings";
import getDriversStandings from "util/getDriversStandings";
import getNextRace from 'util/getNextRace'

const Home = props => (
  <>
    <Head title="Home" />
    <Grid container spacing={3}>
      <Grid item xs={12} lg={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={12}>
            <Paper>
              <CollapseWithButton height="200px">
                <DriversStandings data={props.driversStandingsData} />
              </CollapseWithButton>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={12}>
            <Paper>
              <CollapseWithButton height="200px">
                <ConstructorsStandings data={props.constructorsStandingsData} />
              </CollapseWithButton>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={8}>
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
