import Head from "components/Head";
import cachedFetch from "util/cachedFetch";
import CollapseWithButton from "components/ui/CollapseWithButton";
import DriversStandings from "components/DriversStandings";
import {
  Paper,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
  Hidden
} from "@material-ui/core";
import TeamColorBar from "../../components/ui/TeamColorBar";
import { useState, useEffect } from "react";
import getWikiDefaultImage from "util/getWikiDefaultImage";

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.up("xs")]: {
      gridTemplateColumns: "1fr"
    },
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)"
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(4, 1fr)"
    },
    display: "grid",
    gridGap: theme.spacing(3)
  },
  driversStandings: {
    [theme.breakpoints.up("xs")]: {
      gridRow: "3 / 4"
    },
    [theme.breakpoints.up("sm")]: {
      gridColumn: "1 / 3",
      gridRow: "2 / 3"
    },
    [theme.breakpoints.up("md")]: {
      gridColumn: "2 / 3",
      gridRow: "1 / 3"
    },
    [theme.breakpoints.up("lg")]: {
      gridColumn: "3 / 5",
      gridRow: "1 / 3"
    },
    maxHeight: 394 * 2 + theme.spacing(3),
    overflow: "auto"
  }
}));

const DriverCard = props => {
  const { data } = props;
  const [imageUrl, setImageUrl] = useState(
    "https://via.placeholder.com/350x150"
  );

  useEffect(() => {
    async function fetchData() {
      const wikiImage = await getWikiDefaultImage(data.Driver.url);
      setImageUrl(wikiImage);
    }
    fetchData();
  }, []);

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          style={{ height: 300, backgroundPositionY: "25%" }}
          image={imageUrl}
          title="TEST"
        />
        <CardContent>
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
  const classes = useStyles();

  return (
    <>
      <Head title="Drivers" />
      <div className={classes.container}>
        <Paper className={classes.driversStandings}>
          <Hidden mdUp>
            <CollapseWithButton height="200px">
              <DriversStandings data={props.driversStandingsData} />
            </CollapseWithButton>
          </Hidden>
          <Hidden smDown>
            <DriversStandings data={props.driversStandingsData} />
          </Hidden>
        </Paper>
        {props.driversStandingsData.DriverStandings.map(row => (
          <DriverCard data={row} key={row.Driver.driverId} />
        ))}
      </div>
    </>
  );
};

Drivers.getInitialProps = async () => {
  const getDriversStandings = async () => {
    const data = await cachedFetch(
      `https://ergast.com/api/f1/current/driverStandings.json`
    ).then(res => res.MRData.StandingsTable.StandingsLists[0]);
    return data;
  };

  return {
    name: "Drivers",
    driversStandingsData: await getDriversStandings()
  };
};

export default Drivers;
