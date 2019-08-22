import Link from "next/link";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  makeStyles,
  Typography
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
import { Wrench } from "mdi-material-ui";

const useStyles = makeStyles(theme => ({
  branding: {
    [theme.breakpoints.up("sm")]: {
      minHeight: 64
    },
    minHeight: 48,
    display: "flex",
    paddingLeft: theme.spacing(2),
    alignItems: "center"
  }
}));

const navLinks = [
  {
    name: "Dashboard",
    icon: <HomeIcon />,
    route: "/"
  },
  {
    name: "Drivers",
    icon: <GroupIcon />,
    route: "/drivers"
  },
  {
    name: "Constructors",
    icon: <Wrench />,
    route: "/constructors"
  }
];

const Navigation = props => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.branding}>
        <Typography variant="h6" component="h2">
          F1Hub
        </Typography>
      </div>
      <Divider />
      <List>
        {navLinks.map(data => (
          <Link href={data.route} key={data.name}>
            <ListItem button>
              <ListItemIcon>{data.icon}</ListItemIcon>
              <ListItemText>{data.name}</ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </>
  );
};

export default Navigation;
