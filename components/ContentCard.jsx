import { Typography, Paper, makeStyles, Toolbar } from "@material-ui/core";
import PropTypes from 'prop-types'

import CenteredLoader from "components/CenteredLoader";

const useStyles = makeStyles(theme => ({
  padding: {
    padding: theme.spacing(2)
  },
	fluidContainer: {
		width: "100%",
		maxWidth: `calc(100vw - ${theme.spacing(2) * 2}px)`,
		height: "100%",
		position: "relative"
	},
	tableContainer: {
		overflowX: "auto",
		width: "100%"
	}
}));

const ContentCard = ({ name, loading, children, height, padding }) => {
	const classes = useStyles();
	return (
		<Paper className={classes.fluidContainer} style={{minHeight: 200}}>
			<Toolbar className={classes.padding}>
				<Typography variant="h6" component="h3">
					{name}
				</Typography>
			</Toolbar>
			<div className={padding ? `${classes.tableContainer} ${classes.padding}` : classes.tableContainer} style={{ height }}>
				{loading ? <CenteredLoader /> : children }
			</div>
		</Paper>
	);
};

ContentCard.propTypes = {
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  height: PropTypes.number,
  padding: PropTypes.bool
}

ContentCard.defaultProps = {
  name: "NAME",
  loading: true,
  padding: false
}

export default ContentCard;
