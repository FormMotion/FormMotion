import mergeImages from 'merge-images'
import React, { Component } from 'react'







export default class merge_test extends Component {
    constructor(props){
        super(props)
        this.state = {
            mergedImage: null
        }
    }

    


    componentDidMount() {
        const head = localStorage.getItem('playerDrawnhead')
        const torso = localStorage.getItem('playerDrawntorso')
        const armRightUpper = localStorage.getItem('playerDrawnrightUpperArm')
        const armRightLower = localStorage.getItem('playerDrawnrightLowerArm')
        const armLeftUpper = localStorage.getItem('playerDrawnleftUpperArm')
        const armLeftLower = localStorage.getItem('playerDrawnleftLowerArm')
        const legRightUpper = localStorage.getItem('playerDrawnrightUpperLeg')
        const legRightLower = localStorage.getItem('playerDrawnrightLowerLeg')
        const legLeftUpper = localStorage.getItem('playerDrawnleftUpperLeg')
        const legLeftLower = localStorage.getItem('playerDrawnleftLowerLeg')

        mergeImages([
            //Image paths have to, apparently, be relative to index.html
            //Seeeeeeems like the top left corner of the image is the "anchor" being placed at the provided coordinates. 
            //X and Y coordinates here are PRETTY CLOSE to good with the test images - will perfect them with the permanent canvas dimensions. 

            //BACKGROUND
            {src: 'merge_test_assets/visible_test_background.png', x: 0, y: 0},
            //HEAD
            {src: head, x: 130, y: 0},
            //TORSO
            {src: torso, x: 120, y: 150},
            //Left ARM (from user perspective)
            {src: armLeftUpper, x: 20, y: 150},
            {src: armLeftLower, x: 20, y: 300},
            //Right ARM (from user perspective)
            {src: armRightUpper, x: 400, y: 150},
            {src: armRightLower, x: 400, y: 320},
            //Left LEG (from user perspective)
            {src: legLeftUpper, x: 150, y: 400},
            {src: legLeftLower, x: 150, y: 580},
            //Right LEG (from user perspective)
            {src: legRightUpper, x: 250, y: 400},
            {src: legRightLower, x: 250, y: 580},
            
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

