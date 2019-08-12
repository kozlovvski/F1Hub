import Head from "../components/Head";
import Layout from "../components/Layout";
import {
  Grid,
  Paper,
  Collapse,
  Box,
  IconButton,
  ButtonBase
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DriversStandings from "../components/DriversStandings";
import { ChevronDown, ChevronUp } from "mdi-material-ui";
import axios from "axios";
import { useState } from "react";
import CollapseWithButton from "../components/ui/CollapseWithButton";
import ConstructorsStandings from "../components/ConstructorsStandings";

const useStyles = makeStyles(theme => ({}));

const Home = props => {
  const classes = useStyles();

  return (
    <Layout name="Dashboard">
      <Head title="Home" />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={12}>
              <Paper className={classes.paper}>
                <CollapseWithButton height="200px">
                  <DriversStandings
                    data={props.driversStandingsData}
                  />
                </CollapseWithButton>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} lg={12}>
              <Paper className={classes.paper}>
                <CollapseWithButton height="200px">
                  <ConstructorsStandings
                    data={props.constructorsStandingsData}
                  />
                </CollapseWithButton>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Paper className={classes.paper}>elo2</Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

Home.getInitialProps = async () => {
  const getDriversStandings = async () => {
    const res = await axios(
      `https://ergast.com/api/f1/current/driverStandings.json`
    );
    const resData = await res.data;
    const driversStandings = await resData.MRData.StandingsTable
      .StandingsLists[0];
    return driversStandings;
  };

  const getConstructorsStandings = async () => {
    const res = await axios(
      `https://ergast.com/api/f1/current/constructorStandings.json`
    );
    const resData = await res.data;
    const constructorsStandings = await resData.MRData.StandingsTable
    .StandingsLists[0];
    return constructorsStandings;
  }

  return {
    driversStandingsData: await getDriversStandings(),
    constructorsStandingsData: await getConstructorsStandings()
  };
};

export default Home;
