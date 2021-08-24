import mergeImages from 'merge-images'
import React, { Component } from 'react'







export default class merge_test extends Component {
    constructor(props){
        super(props)
        this.state = {
            mergedImage: null
        }
    }
    //Note: not sure if we will actually need to use state for this - this is just the easiest way I know to handle Promises

    componentDidMount() {

        mergeImages([
            //Image paths have to, apparently, be relative to index.html
            //Seeeeeeems like the top left corner of the image is the "anchor" being placed at the provided coordinates. 
            //X and Y coordinates here are PRETTY CLOSE to good with the test images - will perfect them with the permanent canvas dimensions. 

            //BACKGROUND
            {src: 'merge_test_assets/visible_test_background.png', x: 0, y: 0},
            //HEAD
            {src: 'merge_test_assets/test_head.png', x: 150, y: 0},
            //TORSO
            {src: 'merge_test_assets/test_torso.png', x: 120, y: 131},
            //RIGHT ARM (from character perspective)
            {src: 'merge_test_assets/test_upper_right_arm.png', x: 50, y: 151},
            {src: 'merge_test_assets/test_lower_right_arm.png', x: 30, y: 282},
            //LEFT ARM (from character perspective)
            {src: 'merge_test_assets/test_upper_left_arm.png', x: 310, y: 131},
            {src: 'merge_test_assets/test_lower_left_arm.png', x: 310, y: 262},
            //RIGHT LEG (from character perspective)
            {src: 'merge_test_assets/test_upper_right_leg.png', x: 100, y: 400},
            {src: 'merge_test_assets/test_lower_right_leg.png', x: 50, y: 550},
            //LEFT LEG (from character perspective)
            {src: 'merge_test_assets/test_upper_left_leg.png', x: 200, y: 400},
            {src: 'merge_test_assets/test_lower_left_leg.png', x: 250, y: 550},
            
        ])
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

