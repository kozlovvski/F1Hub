import Head from '../components/Head'
import Layout from '../components/Layout';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DriversChampionshipTable from '../components/DriversChampionshipTable';

const useStyles = makeStyles(theme => ({
  paper: {
    // padding: theme.spacing(2)
  }
}))

const Home = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Layout name="Dashboard">
      <Head title="Home" />
      <Grid container spacing={3}>
        <Grid item md={6} lg={4}>
          <Paper className={classes.paper}>
            <DriversChampionshipTable />
          </Paper>
        </Grid>
        <Grid item md={12} lg={8}>
          <Paper className={classes.paper}>elo2</Paper>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Home
