import React from 'react'
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(7),
  },
  title: {
    flexGrow: 1,
    fontFamily: ['Hanalei Fill', 'cursive'].join(','),
  },
  rightNav: {
    display: 'flex',
  },
  link: {
    color: '#373736',
  },
  logo: {
    width: 150,
  },
}))

const Navbar = () => {
  const classes = useStyles()

  return (
    <div>
      <nav>
        <AppBar
          position='static'
          style={{ background: 'transparent', boxShadow: 'none' }}
        >
          <Toolbar>
            <Link to='/'>
              <img
                src='TransparentLogo.png'
                alt='logo'
                className={classes.logo}
              />
            </Link>
            <Typography className={classes.title} variant='h6' noWrap>
            </Typography>
          </Toolbar>
        </AppBar>
      </nav>
      <hr />
    </div>
  )
}

export default Navbar
