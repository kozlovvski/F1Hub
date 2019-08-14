import Head from "components/Head";
import cachedFetch from "util/cachedFetch";
import DriversStandings from "components/DriversStandings";
import {
  Paper,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";
import TeamColorBar from "../../components/ui/TeamColorBar";

const DriverCard = props => {
  const { data } = props;
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          style={{ height: 140 }}
          image="https://via.placeholder.com/350x150"
          title="TEST"
        />
        <CardContent>
          {/* {data.Driver.permanentNumber && (
            <Typography variant="h2" component="p" gutterBottom>
              {data.Driver.permanentNumber}
            </Typography>
          )} */}
          <TeamColorBar team={data.Constructors[0].name}>
            <Typography variant="h5" component="h3">
              {`${data.Driver.givenName} ${data.Driver.familyName}`}
            </Typography>
            <Typography variant="overline" component="p">
              {data.Constructors[0].name}
            </Typography>
          </TeamColorBar>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const Drivers = props => {
  return (
    <>
      <Head title="Drivers" />
      <Grid>
        <Grid container spacing={3}>
          <Grid item xs={6} container spacing={3}>
            {props.driversStandingsData.DriverStandings.map(row => (
              <Grid item xs={6} key={row.Driver.driverId}>
                <DriverCard data={row} />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <DriversStandings data={props.driversStandingsData} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

Drivers.getInitialProps = async () => {
  const getDriversStandings = async () => {
    ;
    const res = await cachedFetch(`https://ergast.com/api/f1/current/driverStandings.json`);
    const driversStandings = await res.MRData.StandingsTable.StandingsLists[0];
    return driversStandings;
  };

  return {
    name: "Drivers",
    driversStandingsData: await getDriversStandings()
  };
};

export default Drivers;
