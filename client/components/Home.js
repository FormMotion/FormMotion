import React from 'react'
import TestPhaser from './game_components/index.js'

import useStyles from '../../public/useStyles'
import { Link } from 'react-router-dom'

//Imported UI elements:
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const Home = () => {
    return (
        <div>
            <TestPhaser />
            {/* <h1>hello</h1> */}
        </div>
    )
}

export default withStyles(useStyles)(Home)