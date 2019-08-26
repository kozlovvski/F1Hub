import {
	Paper,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Typography,
	makeStyles,
	Hidden,
} from "@material-ui/core";

import Head from "components/Head";
import CollapseWithButton from "components/CollapseWithButton";
import ConstructorsStandingsTable from "components/ConstructorsStandingsTable";
import TeamColorBar from "components/TeamColorBar";
import SeasonsSelect from "components/SeasonsSelect";
import CenteredLoader from "components/CenteredLoader";
import ContentCard from "components/ContentCard";

import { useState, useEffect } from "react";
import Link from "next/link";

import getConstructorsStandings from "util/getConstructorsStandings";
import getWikiDefaultImage from "util/getWikiDefaultImage";
import getSeasonsList from "util/getSeasonsList";

const useStyles = makeStyles(theme => ({
	container: {
		[theme.breakpoints.up("xs")]: {
			gridTemplateColumns: "1fr",
		},
		[theme.breakpoints.up("sm")]: {
			gridTemplateColumns: "repeat(2, 1fr)",
			paddingTop: theme.spacing(3),
		},
		[theme.breakpoints.up("lg")]: {
			gridTemplateColumns: "repeat(4, 1fr)",
		},
		display: "grid",
		gridGap: theme.spacing(3),
		paddingTop: theme.spacing(2),
	},
	standings: {
		[theme.breakpoints.up("xs")]: {
			gridRow: "3 / 4",
		},
		[theme.breakpoints.up("sm")]: {
			gridColumn: "1 / 3",
			gridRow: "2 / 3",
		},
		[theme.breakpoints.up("md")]: {
			gridColumn: "2 / 3",
			gridRow: "1 / 3",
			maxHeight: 263 * 2 + theme.spacing(3)
		},
		[theme.breakpoints.up("lg")]: {
			gridColumn: "3 / 5",
			gridRow: "1 / 3",
		},
		overflow: "auto",
	},
}));

const ConstructorCard = props => {
	const { data } = props;
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		async function fetchData() {
			// TODO: find a better source for constructor images e.g. use bing search API
			const wikiImage = await getWikiDefaultImage(data.Constructor.url);
			if (wikiImage) setImageUrl(wikiImage);
		}
		fetchData();
	}, []);

	return (
		<Card>
			<Link href={`/constructors/${data.Constructor.constructorId}`}>
				<CardActionArea>
					<CardMedia
						style={{ height: 200, backgroundPositionY: "25%" }}
						image={imageUrl ? imageUrl : "/static/images/no_photo.png"}
						title={data.Constructor.name}
					/>
					<CardContent>
						<TeamColorBar team={data.Constructor.name}>
							<Typography variant="h5" component="h3">
								{data.Constructor.name}
							</Typography>
						</TeamColorBar>
					</CardContent>
				</CardActionArea>
			</Link>
		</Card>
	);
};

const Constructors = props => {
	const classes = useStyles();
	const seasons = props.seasons;

	const [data, setData] = useState(props.constructorsStandingsData);
	const [season, setSeason] = useState(seasons[0].season);
	const [loading, setLoading] = useState(false);

	const ConstructorStandings = () => (
		<ContentCard
			className={classes.standings}
			loading={loading}
			name="Standings"
			caption={`after round\u00A0${data.round}`}>

			<Hidden mdUp>
				<CollapseWithButton height="200px">
					<ConstructorsStandingsTable data={data} />
				</CollapseWithButton>
			</Hidden>
			<Hidden smDown>
				<ConstructorsStandingsTable data={data} />
			</Hidden>
		</ContentCard>
	);

	const changeSeason = async e => {
		setLoading(true);

		setSeason(e.target.value);
		setData(await getConstructorsStandings(e.target.value));

		setLoading(false);
	};

	return loading ? (
		<CenteredLoader />
	) : (
		<>
			<Head title="Constructors" />
			<SeasonsSelect
				name="season"
				id="select-season"
				value={season}
				onChange={changeSeason}
				seasonsList={seasons}
			/>
			<div className={classes.container}>
				<ConstructorStandings data={data} />
				{data.ConstructorStandings.map(row => (
					<ConstructorCard data={row} key={row.Constructor.constructorId} />
				))}
			</div>
		</>
	);
};

Constructors.getInitialProps = async () => {
	return {
		name: "Constructors",
		constructorsStandingsData: await getConstructorsStandings(),
		seasons: await getSeasonsList(),
	};
};

export default Constructors;
