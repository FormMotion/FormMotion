import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
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
    fontFamily: [
      'Hanalei Fill',
      'cursive',
    ].join(','),
  },
  rightNav: {
    display: 'flex',
  },
  link: {
    color: "#373736",
  },
  logo: {
    width: 150,
  }
}));

const Navbar = () => {
  const classes = useStyles()

  return (
    <div>
      <nav>
        <AppBar style={{ background: '#DBDFB1' }} position="relative">
          <Toolbar>
            <Link to="/">< img src="TransparentLogo.png" alt="logo" className={classes.logo} /> </Link>
            <Typography className={classes.title} variant="h6" noWrap>
              {/* <Link className={classes.link} to="/play" >Play! </Link> */}
            </Typography>
          </Toolbar>
        </AppBar>
      </nav>
      <hr />
    </div >
  )
}


const mapState = () => ({})
const mapDispatch = () => ({})
export default connect(mapState, mapDispatch)(Navbar)
