import Head from "components/Head";

import getDriverInfo from "util/getDriverInfo";
import {
	Typography,
	Grid,
	Paper,
	Card,
	CardMedia,
	CardContent,
	Link,
	makeStyles,
	Toolbar,
	Table,
	TableHead,
	TableCell,
	TableBody,
	TableRow,
	List,
	ListItem
} from "@material-ui/core";
import { useState, useEffect } from "react";

import getWikiDefaultImage from "util/getWikiDefaultImage";
import getWikiIntro from "util/getWikiIntro";
import getConstructorsForDriver from "util/getConstructorsForDriver";
import getSeasonsForDriver from "util/getSeasonsForDriver";

import CenteredLoader from "components/ui/CenteredLoader";
import TeamColorBar from "components/ui/TeamColorBar";

const useStyles = makeStyles(theme => ({
	padding: {
		padding: theme.spacing(2)
	},
	cardName: {
		padding: theme.spacing(2)
	},
	fluidContainer: {
		width: "100%",
		height: "100%",
		position: "relative"
	},
	overflow: {
		overflow: "auto"
	}
}));

const DriverPage = props => {
	const { driverInfo } = props;
	const classes = useStyles();

	const DriverBio = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState(null);
    const [introText, setIntroText] = useState(null);

    useEffect(() => {
      async function fetchWikiImage() {
        const wikiImage = await getWikiDefaultImage(driverInfo.url);
        if (wikiImage) setImageUrl(wikiImage);
      }
      fetchWikiImage();
  
      async function fetchWikiIntro() {
        const wikiIntro = await getWikiIntro(driverInfo.url);
        if (wikiIntro) setIntroText(wikiIntro);
        setIsLoading(false);
      }
      fetchWikiIntro();
    }, []);

		return (
			<Card style={{ display: "flex" }} className={classes.fluidContainer}>
				<CardMedia
					style={{
						width: "30%",
						backgroundPositionY: "25%",
						backgroundSize: "cover",
						flexShrink: 0
					}}
					image={imageUrl ? imageUrl : "/static/images/no_photo.png"}
					title={`${driverInfo.givenName} ${driverInfo.familyName}`}
				/>
				<CardContent className={`${classes.padding} ${classes.fluidContainer}`}>
					<Typography variant="h6" component="h3" gutterBottom>
						Driver bio:
					</Typography>
					{isLoading ? (
						<CenteredLoader />
					) : (
						<Typography variant="body1">
						{introText}
						<Link href={driverInfo.url}>read more on Wikipedia</Link>
					</Typography>
					)}
					
				</CardContent>
			</Card>
		);
	};

	const ConstructorsList = () => {
		const [constructorList, setConstructorList] = useState([]);
		const [isLoading, setIsLoading] = useState(true);

		useEffect(() => {
			async function fetchData() {
				const data = await getConstructorsForDriver(driverInfo.driverId);
				if (data) {
					setConstructorList(data);
					setIsLoading(false);
				}
			}
			fetchData();
		}, []);

		return (
			<Paper className={classes.fluidContainer}>
				<Toolbar className={classes.cardName}>
					<Typography variant="h6" component="h3" className={classes.tableName}>
						Constructors:
					</Typography>
				</Toolbar>
				{isLoading ? (
					<CenteredLoader />
				) : (
					<>
						<List className={classes.cardContent}>
							{constructorList.map(row => (
								<ListItem key={row.constructorId}>
									<Typography variant="body1">
										<TeamColorBar team={row.name}>{row.name}</TeamColorBar>
									</Typography>
								</ListItem>
							))}
						</List>
					</>
				)}
			</Paper>
		);
  };
  
  const SeasonsList = () => {
		const [seasonsList, setSeasonList] = useState([]);
		const [isLoading, setIsLoading] = useState(true);

		useEffect(() => {
			async function fetchData() {
				const data = await getSeasonsForDriver(driverInfo.driverId);
				if (data) {
					setSeasonList(data);
					setIsLoading(false);
				}
			}
			fetchData();
		}, []);

		return (
			<Paper className={classes.fluidContainer}>
				<Toolbar className={classes.cardName}>
					<Typography variant="h6" component="h3" className={classes.tableName}>
						Seasons:
					</Typography>
				</Toolbar>
				{isLoading ? (
					<CenteredLoader />
				) : (
					<>
						<List className={classes.cardContent} style={{display: "flex", flexWrap: "wrap"}}>
							{seasonsList.map(row => (
								<ListItem key={row.season} style={{maxWidth: "25%"}}>
									<Typography variant="body1">
										{row.season}
									</Typography>
								</ListItem>
							))}
						</List>
					</>
				)}
			</Paper>
		);
	};

	return (
		<>
			<Head title={`${driverInfo.givenName} ${driverInfo.familyName}`} />
			<Typography variant="h2" gutterBottom>{`${driverInfo.givenName} ${
				driverInfo.familyName
			}`}</Typography>
			<Grid container spacing={3} style={{minHeight: "30%"}}>
				<Grid item md={6}>
					<DriverBio />
				</Grid>
				<Grid item md={3}>
					<ConstructorsList />
				</Grid>
        <Grid item md={3}>
					<SeasonsList />
				</Grid>
			</Grid>
		</>
	);
};

DriverPage.getInitialProps = async ({ query }) => {
	const { pid } = query;

	return {
		driverInfo: await getDriverInfo(pid)
	};
};

export default DriverPage;
