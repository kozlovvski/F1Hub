import Head from "../components/Head";
import Layout from "../components/Layout";
import { Grid, Paper } from "@material-ui/core";
import DriversStandings from "../components/DriversStandings";
import axios from "axios";
import CollapseWithButton from "../components/ui/CollapseWithButton";
import ConstructorsStandings from "../components/ConstructorsStandings";
import cachedAxios from "../util/cachedAxios";

const Home = props => (
  <Layout name="Dashboard">
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
  </Layout>
);

Home.getInitialProps = async () => {
  // const getDriversStandings = async () => {
  //   const res = await axios(
  //     `https://ergast.com/api/f1/current/driverStandings.json`
  //   );
  //   const resData = await res.data;
  //   const driversStandings = await resData.MRData.StandingsTable
  //     .StandingsLists[0];
  //   return driversStandings;
  // };

  // const getConstructorsStandings = async () => {
  //   const res = await axios(
  //     `https://ergast.com/api/f1/current/constructorStandings.json`
  //   );
  //   const resData = await res.data;
  //   const constructorsStandings = await resData.MRData.StandingsTable
  //     .StandingsLists[0];
  //   return constructorsStandings;
  // };

  const getDriversStandings = async () => {
    const res = await cachedAxios(
      `https://ergast.com/api/f1/current/driverStandings.json`
    );
    const resData = await res.data;
    const driversStandings = await resData.MRData.StandingsTable
      .StandingsLists[0];
    return driversStandings;
  };

  const getConstructorsStandings = async () => {
    const res = await cachedAxios(
      `https://ergast.com/api/f1/current/constructorStandings.json`
    );
    const resData = await res.data;
    const constructorsStandings = await resData.MRData.StandingsTable
      .StandingsLists[0];
    return constructorsStandings;
  };

  return {
    driversStandingsData: await getDriversStandings(),
    constructorsStandingsData: await getConstructorsStandings()
  };
};

export default Home;
