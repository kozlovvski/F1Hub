import {
	List,
	ListItem
} from "@material-ui/core";
import { useState, useEffect } from "react";

import CenteredLoader from "components/CenteredLoader";

import getSeasonsList from "util/getSeasonsList";

const SeasonsDisplay = props => {
	const {data} = props;
	const [seasons, setSeasons] = useState([])
	const [loading, setLoading] = useState(true)

  useEffect(() => {
		setLoading(true)
    async function fetchData() {
			setSeasons(
				await getSeasonsList()
			)
		}
		fetchData();
		setLoading(false)
	}, [])
	
	return loading ? <CenteredLoader /> :(
		<List
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, 25px)",
				gridGap: 10,
				justifyContent: "space-between",
				padding: 0
			}}
		>
			{seasons.map(row => (
				<ListItem
					key={row.season}
					style={{ width: "auto", padding: 0, fontSize: 10, opacity: data.some(e => e.season == row.season) ? 1 : 0.4}}
				>
					{row.season}
				</ListItem>
			))}
		</List>
	);
};

export default SeasonsDisplay;
