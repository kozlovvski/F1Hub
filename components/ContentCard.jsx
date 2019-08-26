import { Typography, Paper, makeStyles, Toolbar } from "@material-ui/core";
import PropTypes from 'prop-types'

import CenteredLoader from "components/CenteredLoader";

const useStyles = makeStyles(theme => ({
  padding: {
    padding: theme.spacing(2)
  },
	fluidContainer: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		maxWidth: `calc(100vw - ${theme.spacing(2) * 2}px)`,
		height: "100%",
		position: "relative"
	},
	tableContainer: {
		flexGrow: 1,
		overflowX: "auto",
		width: "100%"
	},
	cardHeader: {
		padding: theme.spacing(2),
		display: "flex"
	},
	cardName: {
		flexGrow: 1,
		flexShrink: 0,
		marginRight: theme.spacing(2)
	},
	cardCaption :{
		textAlign: "right"
	}
}));

const ContentCard = ({ name, caption, loading, children, height, padding, className }) => {
	const classes = useStyles();
	return (
		<Paper className={className ? `${classes.fluidContainer} ${className}` : classes.fluidContainer} style={{minHeight: 200}}>
			<Toolbar className={classes.cardHeader}>
				<Typography variant="h6" component="h3" className={classes.cardName}>
					{name}
				</Typography>
				<Typography variant="caption" className={classes.cardCaption}>
						{caption}
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
  loading: PropTypes.bool,
  height: PropTypes.number,
  padding: PropTypes.bool
}

ContentCard.defaultProps = {
  name: "NAME",
  loading: false,
  padding: false
}

export default ContentCard;
