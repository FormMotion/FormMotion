import React from "react";
import useStyles from "../../public/useStyles";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

//Imported UI elements:
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { palette } from '@material-ui/system';

const Welcome = props => {
  const { classes } = props;

  return (
    <>
      <div>
        className={classes.heroContent}
        maxWidth="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Container maxWidth="sm" justifyContent="center" alignItems="center">
          <Box mt={5}>
            <img
              src="TransparentLogo.png"
              alt="logo"
              className={classes.logo}
              width="90%"
            />
          </Box>
          <Box mt={7}>
            <Typography className={classes.regularTypography}>
              FormMotion is an infinite jumping game that allows you to draw your
              own avatar, platform, and prize in a customizable world!
            </Typography>
          </Box>
          <Box mt={2} mb={5}>
            <Typography className={classes.regularTypography}>
              Draw your avatar and play in your virtual world! Draw the head,
              body, arms, and legs (or use our provided defaults) then draw your
              prize and platform. Soon, you'll be running along a world of your
              own creation, collecting prizes and scoring points! Draw a character
              who matches all over, or mix and match to create something new and
              unique. Dream big!
            </Typography>
          </Box>
          <Grid className={classes.heroButtons}>
            <Grid container spacing={2} justifyContent="center">
              <Grid>
                <Link to="/play" style={{ textDecoration: "none" }}>
                  <Button
                    style={{ backgroundColor: "#D9E6A1" }}
                    variant="contained"
                  >
                    Play!
                  </Button>
                </Link>
              </Grid>

              <Grid>
                <Link to={`/about`} style={{ textDecoration: "none" }}>
                  <Button
                    style={{ backgroundColor: "#D9E6A1" }}
                    variant="contained"
                  >
                    Learn more
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default withStyles(useStyles)(Welcome);
