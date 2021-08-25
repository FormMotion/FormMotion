import React from 'react';
import useStyles from '../../public/useStyles';
import { Link } from 'react-router-dom';

//Imported UI elements:
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const Welcome = (props) => {
  const { classes } = props;

  return (
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
          Welcome!
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          FormMotion allows you to draw and design your own characters and props
          in a customizable world!
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Find all the worlds in which you can play...
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Link to="/play">
                <Button variant="contained" color="primary">
                  Play!
                </Button>
              </Link>
              <Link to="/oneDrawing">
                <Button variant="contained" color="primary">
                  Play with one drawing!
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link to={`/about`}>
                <Button variant="contained" color="primary">
                  Learn more
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default withStyles(useStyles)(Welcome);
