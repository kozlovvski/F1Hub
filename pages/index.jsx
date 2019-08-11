import Head from '../components/Head'
import Layout from '../components/Layout';
import { Grid, Paper, Collapse, Box, IconButton, ButtonBase } from '@material-ui/core';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DriversChampionshipTable from '../components/DriversChampionshipTable';
import {ChevronDown, ChevronUp} from "mdi-material-ui";
import axios from 'axios';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  buttonBase: {
    display: "flex",
    width: "100%"
  }
}))

const Home = props => {
  const classes = useStyles();
  const theme = useTheme();

  const [DCTopen, DCTtoggle] = useState(false);

  const handleCollapse = name => {
    DCTtoggle(!DCTopen)
  }

  return (
    <Layout name="Dashboard">
      <Head title="Home" />
      <Grid container spacing={3}>
        <Grid item md={6} lg={4}>
          <Paper className={classes.paper}>
            <Collapse collapsedHeight="200px" in={DCTopen}>
              <DriversChampionshipTable data={props.driversChampionhipData} />
            </Collapse>
            <ButtonBase size="small" onClick={handleCollapse} className={classes.buttonBase}>
                {DCTopen ? <ChevronUp /> : <ChevronDown />}
            </ButtonBase>           
          </Paper>
        </Grid>
        <Grid item md={12} lg={8}>
          <Paper className={classes.paper}>elo2</Paper>
        </Grid>
      </Grid>
    </Layout>
  )
}

Home.getInitialProps = async () => {
  const getDriverChampionshipData = async () => {
    const res = await axios(
      `https://ergast.com/api/f1/current/driverStandings.json`
    )
    const resData = await res.data;
    const driversStanding = await resData.MRData.StandingsTable.StandingsLists[0];
    return driversStanding;
  }

  return {
    driversChampionhipData: await getDriverChampionshipData()
  }
}

export default Home
