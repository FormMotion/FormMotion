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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>How to Win</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Why FormMotion?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>

        </Container>
      </div>
    </>
  );
};

export default withStyles(useStyles)(About);
