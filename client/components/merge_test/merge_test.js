import mergeImages from 'merge-images'

//Image paths have to, apparently, be relative to index.html

// mergeImages(['merge_test_assets/visible_test_background.png', 'merge_test_assets/test_body_full.png'])
// .then(res => console.log(res))




//This is returning undefined, even though I would like it to return the response from the fulfilled Promise. Per MDN, if the handler function returns a value, the promise returned by .then gets resolved with the returned value as its value. 

import React, { Component } from 'react'

export default class merge_test extends Component {
    constructor(props){
        super(props)
        this.state = {
            mergedImage: null
        }
    }

    componentDidMount() {
        mergeImages(['merge_test_assets/visible_test_background.png', 'merge_test_assets/test_body_full.png'])
        .then(res => this.setState({mergedImage: res}))
    }

    render() {
        console.log('MERGED IMAGE', this.state.mergedImage)
        return (
            <div>
                <h1>It's the merged images testing component!</h1>
            </div>
        )
    }
}

