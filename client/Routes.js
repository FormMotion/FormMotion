import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'

import About from './components/About'
import Home from './components/Home'
import Welcome from './components/Welcome'

class Routes extends Component {
    constructor() {
        super()
        this.saveCartToLocalStorage = this.saveCartToLocalStorage.bind(this)
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path='/' exact component={Welcome} />
                    {/* <Route path='/home' exact component={Home} /> */}
                    <Route path='/about' component={About} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))
