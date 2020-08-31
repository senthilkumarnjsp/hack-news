import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SortBy from "./SortBy";
import ModalUI from "./utils/ModalUI";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "5px auto",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    border: "2px solid salmon",
  },
  cardRoot: {
    minWidth: 275,
    margin: "10px auto",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  tags: {
    border: "1px solid black",
    margin: 5,
    borderRadius: 5,
    display: "inline-block",
    padding: 5,
  },
  cardActions: {
    flexGrow: 1,
    margin: "auto 10px",
  },
  likes: {
    position: "relative",
  },
}));

const Home = (props) => {
  const [challenges, setChallenges] = useState(null);
  const [liked, setLiked] = useState(false);
  let [error, setError] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/home", {
        method: "get",
        headers: {
          Authorization: `Bearer ${getWithExpiry("authToken")}`,
        },
      });
      const data = await result.json();
      setChallenges(data.challenges);
    };
    fetchData();
  }, [liked]);

  function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key);
      return null;
    }
    return item.token;
  }

  const handleVoteOrTake = async (challengeID, goto) => {
    console.log(`hi from handleVote method and received value of ${goto}`);
    const result = await fetch(`/api${goto}`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${getWithExpiry("authToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ challengeID: challengeID }),
    });
    if (result.status === 400) {
      const data = await result.json();
      setError(data.error);
    }
    setLiked(!liked);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item container sm={3}></Grid>
        <Grid item container sm={6} xs={12}>
          <Paper className={classes.paper} elevation={5}>
            <SortBy />
            {challenges &&
              challenges.map((challenge) => (
                <Grid item key={challenge.challengeID}>
                  <Card className={classes.cardRoot} raised>
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="h2"
                        style={{ textTransform: "uppercase" }}
                      >
                        {challenge.title}
                      </Typography>
                      <Typography
                        className={classes.subtitle}
                        color="textSecondary"
                      >
                        {challenge.user}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {challenge.description}
                      </Typography>
                      {challenge.tags.map((tag, index) => {
                        return (
                          <Typography
                            variant="body2"
                            key={index}
                            className={classes.tags}
                          >
                            {tag}
                          </Typography>
                        );
                      })}
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={challenge.takenBy.includes(props.employeeID)}
                        style={{ margin: "auto 10px" }}
                        onClick={() =>
                          handleVoteOrTake(
                            challenge.challengeID,
                            "/takeChallenge"
                          )
                        }
                      >
                        {challenge.takenBy.includes(props.employeeID)
                          ? "Accepted"
                          : "Accept"}
                      </Button>
                      <div className={classes.cardActions}></div>
                      <div className={classes.likes}>
                        {challenge.voteCount}
                        <IconButton
                          onClick={() =>
                            handleVoteOrTake(challenge.challengeID, "/vote")
                          }
                          color="secondary"
                          disabled={challenge.createdBy === props.employee}
                        >
                          <i className="medium material-icons">
                            {challenge.voters.includes(props.employee)
                              ? "favorite"
                              : "favorite_border"}
                          </i>
                        </IconButton>
                      </div>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Paper>
        </Grid>
        <Grid item container sm={3}></Grid>
      </Grid>
      {error && (
        <ModalUI open={error !== null} handleModal={() => setError(null)}>
          {" "}
          {error}{" "}
        </ModalUI>
      )}
    </div>
  );
};

export default withRouter(Home);
