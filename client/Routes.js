import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'

import About from './components/About'
import Home from './components/Home'
import Welcome from './components/Welcome'

class Routes extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path='/' exact component={Welcome} />
                    <Route path='/play' exact component={Home} />
                    <Route path='/about' component={About} />
                </Switch>
            </div>
        )
    }
}

const mapState = () => ({})
const mapDispatch = () => ({})
export default withRouter(connect(mapState, mapDispatch)(Routes))
