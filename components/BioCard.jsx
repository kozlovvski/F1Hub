import PropTypes from "prop-types";

import {
	Typography,
	Card,
	CardMedia,
	CardContent,
	Link,
	makeStyles
} from "@material-ui/core";

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
	driverBio: {
		display: "flex",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column"
		}
	},
	driverPhoto: {
		[theme.breakpoints.up("sm")]: {
			width: "30%"
		},
		[theme.breakpoints.down("xs")]: {
			height: "30vh"
		},
		backgroundPositionY: "25%",
		backgroundSize: "cover",
		flexShrink: 0
	}
}));

const BioCard = ({ name, image, alt, children, url }) => {
	const classes = useStyles();

	return (
		<Card className={`${classes.fluidContainer} ${classes.driverBio}`}>
			<CardMedia
				className={classes.driverPhoto}
				image={image || "/static/images/no_photo.png"}
				title={alt}
			/>
			<CardContent className={`${classes.padding} ${classes.fluidContainer}`}>
				<Typography variant="h6" component="h3" gutterBottom>
					{name}
				</Typography>
				<Typography variant="body1" gutterBottom>
					{children}
				</Typography>
				<Link href={url} color="textPrimary">
					<Typography variant="button">read more on Wikipedia</Typography>
				</Link>
			</CardContent>
		</Card>
	);
};

BioCard.propTypes = {
	name: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired
};

BioCard.defaultProps = {
	name: "NAME MISSING",
	alt: "ALT MISSING"
};

export default BioCard;
