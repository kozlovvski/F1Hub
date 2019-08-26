import Head from "components/Head";

import { Typography, Grid, List, ListItem } from "@material-ui/core";
import { useState, useEffect } from "react";

import getWikiDefaultImage from "util/getWikiDefaultImage";
import getWikiIntro from "util/getWikiIntro";
import getConstructorInfo from "util/getConstructorInfo";
import getSeasonsForConstructor from "util/getSeasonsForConstructor";
import getRacesResultsForConstructor from "util/getRacesResultsForConstructor";
import getQualifyingResultsForConstructor from "util/getQualifyingResultsForConstructor";
import getCurrentDriversForConstructor from "util/getCurrentDriversForConstructor";

import BioCard from "components/BioCard";
import TeamColorBar from "components/TeamColorBar";
import SeasonsSelect from "components/SeasonsSelect";
import SeasonsDisplay from "components/SeasonsDisplay";
import RaceResultsTable from "components/RaceResultsTable";
import QualifyingResultsTable from "components/QualifyingResultsTable";
import ContentCard from "components/ContentCard";

const ConstructorPage = ({
	constructorInfo,
	currentDrivers,
	wikiImage,
	wikiIntro,
	seasonsList,
}) => {
	const [selectedSeason, setSelectedSeason] = useState(seasonsList[0].season);
	const [racesResults, setRacesResults] = useState([]);
	const [qualifyingResults, setQualifyingResults] = useState([]);

	const [loading, setLoading] = useState(true);

	const changeSeason = async e => {
		// if user didn't click season that is selected
		if (selectedSeason != e.target.value) {
			setLoading(true);
			setSelectedSeason(e.target.value);
		}
	};

	useEffect(() => {
		async function fetchData() {
			setRacesResults(
				await getRacesResultsForConstructor(
					constructorInfo.constructorId,
					selectedSeason
				)
			);
			setQualifyingResults(
				await getQualifyingResultsForConstructor(
					constructorInfo.constructorId,
					selectedSeason
				)
			);
			setLoading(false);
		}
		fetchData();
	}, [selectedSeason]);

	const ConstructorBio = () => (
		<BioCard
			name="Constructor Info"
			image={wikiImage}
			alt={constructorInfo.name}
			url={constructorInfo.url}>
			{wikiIntro}
		</BioCard>
	);

	const CurrentDrivers = () => (
		<ContentCard loading={loading} name="Current drivers" padding>
			<List disablePadding>
				{currentDrivers.length ? (
					currentDrivers.map(row => (
						<ListItem disableGutters key={row.driverId}>
							<TeamColorBar team={constructorInfo.name}>
								<Typography variant="body1">{`${row.givenName} ${row.familyName}`}</Typography>
							</TeamColorBar>
						</ListItem>
					))
				) : (
					<Typography variant="caption">
						This constructor doesn't compete in current season.
					</Typography>
				)}
			</List>
		</ContentCard>
	);

	const ConstructorSeasonsList = () => (
		<ContentCard loading={loading} name="Seasons" padding>
			<SeasonsDisplay data={seasonsList} />
		</ContentCard>
	);

	const RacesResults = () => (
		<ContentCard loading={loading} name="Race results">
			<RaceResultsTable isConstructor data={racesResults} />
		</ContentCard>
	);

	const QualifyingResults = () => (
		<ContentCard loading={loading} name="Qualifying results">
			<QualifyingResultsTable
				isConstructor
				data={qualifyingResults}
				racesData={racesResults}
			/>
		</ContentCard>
	);

	return (
		<>
			<Head title={constructorInfo.name} />
			<TeamColorBar team={constructorInfo.name}>
				<Typography variant="h2" component="h1" gutterBottom>
					{constructorInfo.name}
				</Typography>
			</TeamColorBar>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<ConstructorBio />
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<CurrentDrivers />
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<ConstructorSeasonsList />
				</Grid>
				<Grid item xs={12}>
					<SeasonsSelect
						seasonsList={seasonsList}
						value={selectedSeason}
						onChange={changeSeason}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<RacesResults />
				</Grid>
				<Grid item xs={12} md={6}>
					<QualifyingResults />
				</Grid>
			</Grid>
		</>
	);
};

ConstructorPage.getInitialProps = async ({ query }) => {
	const { pid } = query;
	const constructorInfo = await getConstructorInfo(pid);
	return {
		name: "Constructor overview",
		constructorInfo,
		seasonsList: await getSeasonsForConstructor(constructorInfo.constructorId),
		currentDrivers: await getCurrentDriversForConstructor(
			constructorInfo.constructorId
		),
		wikiImage: await getWikiDefaultImage(constructorInfo.url),
		wikiIntro: await getWikiIntro(constructorInfo.url),
	};
};

export default ConstructorPage;
