import React from "react";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { SwipeableDrawer } from "@material-ui/core";
import Creator from "./Creator";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: 60,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  list: {
    width: 250,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    // Responsible to trigger the side drawer to open or close
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const handleCreate = () => {
    // Responsible method for create challenge modal
    const prev = !openModal;
    setOpenModal(prev);
    prev ? props.history.push("/new") : props.history.push("/home");
  };

  return (
    <div className={classes.root}>
      {/* Header Component of the app */}
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {props.location.pathname !== "/" && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(!open)}
              edge="end"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <i className="medium material-icons">menu</i>
            </IconButton>
          )}
          <Typography variant="h1" style={{ flexGrow: 1, fontSize: 25 }}>
            HACK-NEWS
          </Typography>
          {props.location.pathname !== "/" && (
            <>
              <IconButton
                color="inherit"
                onClick={handleCreate}
                edge="end"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <i className="medium material-icons">add</i>
              </IconButton>
              <Creator open={openModal} toggleModal={handleCreate} />
            </>
          )}
        </Toolbar>
      </AppBar>
      {props.location.pathname !== "/" && (
        <>
          <SwipeableDrawer
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={toggleDrawer(!open)}>
                {theme.direction === "rtl" ? (
                  <i className="medium material-icons">keyboard_arrow_right</i>
                ) : (
                  <i className="medium material-icons">keyboard_arrow_left</i>
                )}
              </IconButton>
            </div>
            <Divider />
            <List className={clsx(classes.list)}>
              <ListItem
                button
                key={"Create a Challenge"}
                onClick={handleCreate}
              >
                <ListItemText primary={"Create a Challenge"} />
                <ListItemIcon>
                  <i className="medium material-icons">keyboard_arrow_right</i>
                </ListItemIcon>
              </ListItem>
              <ListItem button key={"My Challenges"}>
                <ListItemText primary={"My Challenges"} />
                <ListItemIcon>
                  <i className="medium material-icons">keyboard_arrow_right</i>
                </ListItemIcon>
              </ListItem>
              <ListItem button key={"Taken Challenges"}>
                <ListItemText primary={"Taken Challenges"} />
                <ListItemIcon>
                  <i className="medium material-icons">keyboard_arrow_right</i>
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary={"Logout"} />
              </ListItem>
            </List>
          </SwipeableDrawer>
        </>
      )}
    </div>
  );
};

export default withRouter(Header);
