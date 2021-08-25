import React from 'react'
import useStyles from '../../public/useStyles'
import { Link } from 'react-router-dom'

//Imported UI elements:
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const Welcome = (props) => {
  const { classes } = props

  return (
    <div className={classes.heroContent}>
      <Container maxWidth='sm'>
        <Typography className={classes.specialTypography}>Welcome!</Typography>
        <Typography className={classes.regularTypography}>
          FormMotion is an infinite jumping game that allows you to draw your
          own avatar, platform, and prize in a customizable world!
        </Typography>
        <br></br>
        <Typography className={classes.regularTypography}>
          Before the game begins, you have to choose how you want to draw your
          avatar.
        </Typography>
        <br></br>
        <Typography className={classes.regularTypography}>
          You can draw your avatar on either one canvas or multiple canvases. If
          you choose to draw your avatar on one canvas, your avatar will be
          static throughout the game. Meanwhile, if you choose to draw your
          avatar on multiple canvases your avatar will have dynamic limbs and
          change its body position throughout the game. Also, when drawing your
          avatar on multiple canvases, you will have the option to choose
          default or random body parts. By opting for default or random body
          parts, you can make your avatar a frankenstein of some sort.
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justifyContent='center'>
            <Grid item>
              <Link to='/play' style={{ textDecoration: 'none' }}>
                <Button
                  style={{ backgroundColor: '#86995a' }}
                  variant='contained'
                >
                  Play!
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link to='/oneDrawing' style={{ textDecoration: 'none' }}>
                <Button
                  style={{ backgroundColor: '#86995a' }}
                  variant='contained'
                >
                  Play with one drawing!
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link to={`/about`} style={{ textDecoration: 'none' }}>
                <Button
                  style={{ backgroundColor: '#86995a' }}
                  variant='contained'
                >
                  Learn more
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default withStyles(useStyles)(Welcome)
