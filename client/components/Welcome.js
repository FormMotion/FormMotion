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

const Welcome = props => {
  const { classes } = props;

  return (
    <>
      <div
        className={classes.heroContent}
        maxWidth="100%"
        justifyContent="center"
        alignItems="center"
      >

        <Container maxWidth="sm" justifyContent="center" alignItems="center">
          <img
            src="TransparentLogo.png"
            alt="logo"
            className={classes.logo}
            width="90%"
          />

          <Typography className={classes.regularTypography}>
            FormMotion is an infinite jumping game that allows you to draw your
            own avatar, platform, and prize in a customizable world!
          </Typography>
          <br></br>

          <Typography className={classes.regularTypography}>
            Draw your avatar and play in your virtual world! Draw the head,
            body, arms, and legs (or use our provided defaults) then draw your
            prize and platform. Soon, you'll be running along a world of your
            own creation, collecting prizes and scoring points! Draw a character
            who matches all over, or mix and match to create something new and
            unique. Dream big!
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Link to="/play" style={{ textDecoration: "none" }}>
                  <Button
                    style={{ backgroundColor: "#86995a" }}
                    variant="contained"
                  >
                    Play!
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/oneDrawing" style={{ textDecoration: "none" }}>
                  <Button
                    style={{ backgroundColor: "#86995a" }}
                    variant="contained"
                  >
                    Play with one drawing!
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to={`/about`} style={{ textDecoration: "none" }}>
                  <Button
                    style={{ backgroundColor: "#86995a" }}
                    variant="contained"
                  >
                    Learn more
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};

export default withStyles(useStyles)(Welcome);
