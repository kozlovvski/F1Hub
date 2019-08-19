import {
  Paper, makeStyles, Typography, Toolbar
} from "@material-ui/core";

import Link from "next/link";
import DateCountdown from 'components/ui/DateCountdown';

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: 500,
    backgroundSize: "cover",
    color: "#fff"
  },
	cardHeader: {
    padding: theme.spacing(2),
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: theme.shape.borderRadius,
    marginBottom: "auto"
  },
  cardName: {
		flexGrow: 1,
		flexShrink: 0,
		marginRight: theme.spacing(2)
  },
  cardContent: {
    padding: theme.spacing(2),
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: theme.shape.borderRadius,
  },
	roundName: {
		textAlign: "right"
	}
}));

const NextRaceCard = props => {
  const { data } = props;
  const classes = useStyles();
  const localRaceDate = new Date(data.date + "T" + data.time)

  return (
    <Paper className={classes.container} style={{backgroundImage: `url(/static/images/circuits/${data.Circuit.circuitId}.jpg)`}}>
      <Toolbar className={classes.cardHeader}>
					<Typography variant="h6" component="h3" className={classes.cardName}>
						Next race:
					</Typography>
					<Typography variant="caption" className={classes.roundName}>
						<DateCountdown dateTo={localRaceDate} />
					</Typography>
			</Toolbar>
      <div className={classes.cardContent}>
        
        <Typography variant="h4" component="h3">
          {data.raceName}
        </Typography>
        <Typography variant="caption" component="p">
          {data.Circuit.circuitName}
        </Typography>
        <Typography variant="caption">
          {localRaceDate.toLocaleString('en-GB')}
        </Typography>
      </div>
    </Paper>
  );
};

export default NextRaceCard