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
import { Accordion } from "@material-ui/core";
import { AccordionDetails } from "@material-ui/core";
import { AccordionSummary } from "@material-ui/core";

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

          <Accordion>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>How to Play</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul>
                  <h3>Create your character!</h3>
                  <li>Using the drawing tools, draw each body part in the appropriate canvas. Be as creative as you want!</li>
                  <li>Connect the drawings at the grey circles, representing your character's joints. This will ensure you can move through the game world.</li>
                  <li>Make sure your character's feet (or paws, or tentacles) touch the bottom of their canvases.</li>
                  <li>You can also choose from our default options. Select the whole character, or under Advanced Options, mix-and-match!</li>
                  <li>Draw some parts, and choose defaults for others. The choice is yours!</li>
                </ul> 
                <ul>
                  <h3>Draw your platform and prize!</h3>
                  <li>Using the drawing tools, create the game platform. Make sure the top of the platform lines up with the top of the canvas.</li>
                  <li>Next, draw your prize - this is what you'll be collecting to earn points!</li>
                  <li>Draw your own, or choose a default under Advanced Options.</li>
                </ul>
                <ul>
                  <h3>Play Your Game!</h3>
                  <li>Press start or the space bar to start the game!</li>
                  <li>Collect your prizes to win points, and avoid the slime.</li>
                  <li>Get the highest score you can!</li>
                  <h5>If using your keyboard: </h5>
                    <li>Use the left arrow to move left</li>
                    <li>Use the right arrow to move right</li>
                    <li>Use the up arrow to jump</li>
                    <li>Use the down arrow to move down quickly</li>
                    <li>Use space to pause/restart game, or click the pause button in the upper left corner</li>
                  
                  <h5>If using a touchscreen:</h5>
                    <li>Touch to the left of the character to move left</li>
                    <li>Touch to the right of the character to move right</li>
                    <li>While moving left or right, use a second touch on the screen to jump</li>
                    <li>Click the pause button in the upper left corner to pause</li>

                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>About Us / Contact</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <h3>About Us</h3>
                  <p>Built as a Capstone Project for the Grace Hopper program, cohort 2016, Team 4.</p>
                <h3>Links</h3>
                <ul>
                  <li><a href="https://github.com/FormMotion/FormMotion">GitHub Repo</a></li>
                </ul>
                  <h5>Developer LinkedIn Profiles</h5>
                <ul>
                  <li><a href="https://www.linkedin.com/in/kathleen-connaghan/">Kathleen Connaghan</a></li>
                  <li><a href="https://www.linkedin.com/in/juliacro/">Julia Crooijmans</a></li>
                  <li><a href="https://www.linkedin.com/in/nate-metrick/">Nate Metrick</a></li>
                  <li><a href="https://www.linkedin.com/in/caitlinrich/">Caitlin Rich</a></li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>

        </Container>
      </div>
    </>
  );
};

export default withStyles(useStyles)(About);
