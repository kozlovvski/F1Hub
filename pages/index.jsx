import Head from "components/Head";
import { Grid, Paper } from "@material-ui/core";
import DriversStandings from "components/DriversStandings";
import CollapseWithButton from "components/ui/CollapseWithButton";
import ConstructorsStandings from "components/ConstructorsStandings";
import cachedFetch from "util/cachedFetch";

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
        <Paper>elo2</Paper>
      </Grid>
    </Grid>
  </>
);

Home.getInitialProps = async () => {
  const getDriversStandings = async () => {
    const data = await cachedFetch(
      `https://ergast.com/api/f1/current/driverStandings.json`
    ).then(res => res.MRData.StandingsTable.StandingsLists[0]);
    return data;
  };

  const getConstructorsStandings = async () => {
    const data = await cachedFetch(
      `https://ergast.com/api/f1/current/constructorStandings.json`
    ).then(res => res.MRData.StandingsTable.StandingsLists[0]);
    return data;
  };

  return {
    name: "Dashboard",
    driversStandingsData: await getDriversStandings(),
    constructorsStandingsData: await getConstructorsStandings()
  };
};

export default Home;
