import { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

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
  useScrollTrigger,
  Paper
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { spacing } from "@material-ui/system";
import MenuIcon from "@material-ui/icons/Menu";
import { GithubCircle, Lightbulb, LightbulbOutline } from "mdi-material-ui";

import Navigation from "./Navigation";
import themes from "../material-ui/themes";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  layout: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flesmhrink: 0
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
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

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
    <div className={classes.layout}>
      <CssBaseline />
      <nav className={classes.drawer}>
        <Hidden mdUp implementation="css">
          <SwipeableDrawer
            variant="temporary"
            open={mobileOpen}
            onOpen={handleToggleDrawer}
            onClose={handleToggleDrawer}
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
                  onClick={handleToggleDrawer}
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
                  onClick={props.handleThemeChange}
                >
                  {props.darkTheme ? <Lightbulb /> : <LightbulbOutline />}
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
  );
};

Layout.propTypes = {
  name: PropTypes.string.isRequired
};

const LayoutWrapper = props => {
	const [darkTheme, setDarkTheme] = useState(false)

	const handleThemeChange = () => {
		setDarkTheme(!darkTheme)
	}
  return (
    <ThemeProvider theme={darkTheme ? themes.darkTheme : themes.lightTheme}>
      <Layout name={props.name} darkTheme={darkTheme} handleThemeChange={handleThemeChange}>{props.children}</Layout>
    </ThemeProvider>
  );
};

export default LayoutWrapper;
