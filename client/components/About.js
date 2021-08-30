import React from "react";
import useStyles from "../../public/useStyles";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

//Imported UI elements:
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const About = props => {
  const { classes } = props;

  return (
    <>
      <NavBar />
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            className={classes.specialTypography}
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            FAQ
          </Typography>
          <Typography className={classes.regularTypography}>
            How to play?
          </Typography>
          <Typography className={classes.regularTypography}>
            How to win?
          </Typography>
          <Typography className={classes.regularTypography}>
            Why does this game exist?
          </Typography>
          <Typography className={classes.regularTypography}>
            Who made this game?
          </Typography>
        </Container>
      </div>
    </>
  );
};

export default withStyles(useStyles)(About);
