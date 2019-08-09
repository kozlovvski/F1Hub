import { useState } from "react";
import PropTypes from 'prop-types';

import {
	CssBaseline,
	Hidden,
	Drawer,
	AppBar,
	Toolbar,
	IconButton,
	SwipeableDrawer,
	Typography
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { spacing } from "@material-ui/system";
import MenuIcon from "@material-ui/icons/Menu";

import Navigation from "./Navigation";
import primaryTheme from "../material-ui/themes";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	layout: {
		display: "flex"
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	drawerPaper: {
    width: drawerWidth,
  },
	page: {
		flexGrow: 1,
	},
	main: {
		[theme.breakpoints.up("sm")]: {
			paddingLeft: theme.spacing(3),
			paddingRight: theme.spacing(3)
		},
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	}
}));

const Layout = props => {
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleToggleDrawer = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<ThemeProvider theme={primaryTheme}>
		<div className={classes.layout}>
			<CssBaseline />
			<nav className={classes.drawer}>
				<Hidden smUp implementation="css">
					<SwipeableDrawer 
						variant="temporary"
						open={mobileOpen}
						onOpen={handleToggleDrawer}
						onClose={handleToggleDrawer}
						ModalProps={{ keepMounter: true }}
						classes={{paper: classes.drawerPaper}}
					>
						<Navigation />
					</SwipeableDrawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer variant="permanent" open classes={{paper: classes.drawerPaper}}>
						<Navigation />
					</Drawer>
				</Hidden>
			</nav>
			<div className={classes.page}>
				<AppBar position="sticky" color="default">
					<Toolbar>
						<Hidden smUp>
							<IconButton
								color="inherit"
								aria-label="toggle drawer visibility"
								edge="start"
								onClick={handleToggleDrawer}
							>
								<MenuIcon />
							</IconButton>
						</Hidden>
					<Typography variant="h6" component="h1">
						{props.name}
					</Typography>
					</Toolbar>
				</AppBar>
			<main className={classes.main}>
				{props.children}
			</main>
			</div>
		</div>
		</ThemeProvider>
	);
};

Layout.propTypes = {
	name: PropTypes.string.isRequired
}

export default Layout;
