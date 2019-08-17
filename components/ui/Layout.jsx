import { useState } from "react";
import { connect } from "react-redux";
import { toggleDarkTheme, toggleMobileOpen } from "../../redux";
import PropTypes from "prop-types";
import {
	CssBaseline,
	Hidden,
	Drawer,
	AppBar,
	Toolbar,
	IconButton,
	SwipeableDrawer,
	Typography,
	Link as MaterialLink,
	Tooltip,
	useScrollTrigger
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { GithubCircle, Lightbulb, LightbulbOutline } from "mdi-material-ui";
import themes from 'material-ui/themes'

import Navigation from "../Navigation";
import { ThemeProvider, getThemeProps } from "@material-ui/styles";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	layout: {
		display: "flex"
	},
	drawer: {
		[theme.breakpoints.up("md")]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	drawerPaper: {
		width: drawerWidth
	},
	appbar: {
		marginLeft: drawerWidth,
		[theme.breakpoints.up("md")]: {
			width: `calc(100% - ${drawerWidth}px)`
		}
	},
	pageTitle: {
		flexGrow: 1
	},
	page: {
		flexGrow: 1,
		display: "flex",
		flexDirection: "column",
		minHeight: "100vh"
	},
	main: {
		[theme.breakpoints.up("sm")]: {
			paddingLeft: theme.spacing(3),
			paddingRight: theme.spacing(3),
			paddingTop: 64 + theme.spacing(3),
			paddingBottom: theme.spacing(3)
		},
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingTop: 56 + theme.spacing(2),
		paddingBottom: theme.spacing(2),
		backgroundColor: theme.palette.background.default,
		flexGrow: 1
	},
	footer: {
		marginTop: "auto",
		[theme.breakpoints.up("sm")]: {
			padding: theme.spacing(3)
		},
		padding: theme.spacing(2)
	}
}));

const Layout = props => {
  const classes = useStyles();
  
  const {darkTheme, toggleDarkTheme, mobileOpen, toggleMobileOpen} = props;

	const ElevationScroll = props => {
		const trigger = useScrollTrigger({
			disableHysteresis: true,
			threshold: 0
		});

		return React.cloneElement(props.children, {
			elevation: trigger ? 4 : 0
		});
	};

	return (
    <ThemeProvider theme={darkTheme ? themes.dark : themes.light }>
		<div className={classes.layout}>
			<CssBaseline />
			<nav className={classes.drawer}>
				<Hidden mdUp implementation="css">
					<SwipeableDrawer
						variant="temporary"
						open={mobileOpen}
						onOpen={toggleMobileOpen}
						onClose={toggleMobileOpen}
						ModalProps={{ keepMounter: true }}
						classes={{ paper: classes.drawerPaper }}
					>
						<Navigation />
					</SwipeableDrawer>
				</Hidden>
				<Hidden smDown implementation="css">
					<Drawer
						variant="permanent"
						open
						classes={{ paper: classes.drawerPaper }}
					>
						<Navigation />
					</Drawer>
				</Hidden>
			</nav>
			<div className={classes.page}>
				<ElevationScroll>
					<AppBar position="fixed" color="default" className={classes.appbar}>
						<Toolbar>
							<Hidden mdUp>
								<IconButton
									color="inherit"
									aria-label="toggle drawer visibility"
									edge="start"
									onClick={toggleMobileOpen}
								>
									<MenuIcon />
								</IconButton>
							</Hidden>
							<Typography
								variant="h6"
								component="h1"
								className={classes.pageTitle}
							>
								{props.name}
							</Typography>
							<Tooltip title="Toggle light/dark theme">
								<IconButton
									aria-label="Switch application theme between light and dark"
									aria-haspopup="false"
									onClick={toggleDarkTheme}
								>
									{darkTheme ? <Lightbulb /> : <LightbulbOutline />}
								</IconButton>
							</Tooltip>
							<Tooltip title="Visit GitHub repository">
								<IconButton
									aria-label="GitHub repository link"
									aria-haspopup="false"
									href="https://github.com/kozlovvski/f1-hub"
									target="_blank"
									rel="noopener"
								>
									<GithubCircle />
								</IconButton>
							</Tooltip>
						</Toolbar>
					</AppBar>
				</ElevationScroll>
				<main className={classes.main}>{props.children}</main>
				<footer className={classes.footer}>
					<Typography variant="caption">
						Coded with ❤️ by{" "}
						<MaterialLink href="https://github.com/kozlovvski" color="primary">
							@kozlovvski
						</MaterialLink>
					</Typography>
				</footer>
			</div>
		</div>
    </ThemeProvider>
	);
};

Layout.propTypes = {
	name: PropTypes.string.isRequired
};

const mapStateToProps = state => {
	const { darkTheme, mobileOpen } = state;
	return { darkTheme, mobileOpen };
};

const mapDispatchToProps = { toggleDarkTheme, toggleMobileOpen };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Layout);
