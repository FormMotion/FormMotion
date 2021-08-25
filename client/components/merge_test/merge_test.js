import mergeImages from 'merge-images';
import React, { Component, useState } from 'react';

export default function MergeTestFunctional() {
  //OKAY so let's figure out how to use useState to manage our state
  //I think this needs to be class component so that we can do each of the different
  //types of movement frames
  //ORRRRR there's a possibility each frame should be it's own separate component
  //so if we can get it to work here, then we will split it out
  //AND THEN WE GET IT INTO PHASER

  const head = localStorage.getItem('playerDrawnhead');
  const torso = localStorage.getItem('playerDrawntorso');
  const armRightUpper = localStorage.getItem('playerDrawnrightUpperArm');
  const armRightLower = localStorage.getItem('playerDrawnrightLowerArm');
  const armLeftUpper = localStorage.getItem('playerDrawnleftUpperArm');
  const armLeftLower = localStorage.getItem('playerDrawnleftLowerArm');
  const legRightUpper = localStorage.getItem('playerDrawnrightUpperLeg');
  const legRightLower = localStorage.getItem('playerDrawnrightLowerLeg');
  const legLeftUpper = localStorage.getItem('playerDrawnleftUpperLeg');
  const legLeftLower = localStorage.getItem('playerDrawnleftLowerLeg');

  //USE STATE STUFF GOES HERE
  const [avatar, setAvatar] = useState(null);
  const [rotatedHead, setRotatedHead] = useState(false);

  //from Zyndoras on GitHub
  const rotate = (base64info, degrees, callback) => {
    const canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let image = new Image();

    image.src = base64info;

    image.onload = function () {
      canvas.width = degrees % 180 === 0 ? image.width : image.height; //Why is this like this? But, this is taking the image dimensions and making sure the canvas is the same size
      canvas.height = degrees % 180 === 0 ? image.height : image.width; //Ditto

      ctx.translate(canvas.width / 2, canvas.height / 2); //This seems like it finds the center of the canvas (aka our image)
      ctx.rotate((degrees * Math.PI) / 180); //This is what does the actual rotation with the degrees we input as a parameter
      ctx.drawImage(image, image.width / -2, image.height / -2); //This "redraws" the rotated element onto the canvas once rotated.

      //exports base64 OR AT LEAST IT'S SUPPOSED TO
      callback(canvas.toDataURL());
      //OKAY SO THE CANVAS.TODATAURL() HAS THE INFORMATION. the callback is, based on the couple examples of this, supposed to be assigning this new data to a new Image() - which is WORKING,
      //until I can't get the .src data from the image itself. Which makes no sense!!! I can do it for different new images with base64 src why not this one?!?!?!?
    };
  };

  rotate(head, 90, function (resultBase64) {
    setRotatedHead(resultBase64);
  });

  if (rotatedHead) {
    mergeImages([
      //Image paths have to (I think) be relative to index.html
      //Seeeeeeems like the top left corner of the image is the "anchor" being placed at the provided coordinates.

      //BACKGROUND
      { src: 'merge_test_assets/visible_test_background.png', x: 0, y: 0 },
      //HEAD
      { src: rotatedHead, x: 130, y: 0 },
      //TORSO
      { src: torso, x: 120, y: 150 },
      //Left ARM (from user perspective)
      { src: armLeftUpper, x: 20, y: 150 },
      { src: armLeftLower, x: 20, y: 300 },
      //Right ARM (from user perspective)
      { src: armRightUpper, x: 400, y: 150 },
      { src: armRightLower, x: 400, y: 320 },
      //Left LEG (from user perspective)
      { src: legLeftUpper, x: 150, y: 400 },
      { src: legLeftLower, x: 150, y: 580 },
      //Right LEG (from user perspective)
      { src: legRightUpper, x: 250, y: 400 },
      { src: legRightLower, x: 250, y: 580 },
    ]).then((res) => setAvatar(res));
  }

  return <div></div>;
}

//SAVING JUST IN CASE I DO NEED TO GO BACK TO CLASS COMPONENT
// export default class MergeTest extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             standingAvatar: null,
//             rotatedHead: false
//         }
//     }

//     componentDidMount() {
//         const head = localStorage.getItem('playerDrawnhead')
//         const torso = localStorage.getItem('playerDrawntorso')
//         const armRightUpper = localStorage.getItem('playerDrawnrightUpperArm')
//         const armRightLower = localStorage.getItem('playerDrawnrightLowerArm')
//         const armLeftUpper = localStorage.getItem('playerDrawnleftUpperArm')
//         const armLeftLower = localStorage.getItem('playerDrawnleftLowerArm')
//         const legRightUpper = localStorage.getItem('playerDrawnrightUpperLeg')
//         const legRightLower = localStorage.getItem('playerDrawnrightLowerLeg')
//         const legLeftUpper = localStorage.getItem('playerDrawnleftUpperLeg')
//         const legLeftLower = localStorage.getItem('playerDrawnleftLowerLeg')

//         //from Zyndoras on GitHub - https://gist.github.com/Zyndoras/6897abdf53adbedf02564808aaab94db
// const rotate = (base64info, degrees, callback) => {
//     const canvas = document.createElement('canvas')
//     let ctx = canvas.getContext("2d")
//     let image = new Image();

//     image.src = base64info

//     image.onload = function() {
//         canvas.width = degrees % 180 === 0 ? image.width : image.height; //Why is this like this? But, this is taking the image dimensions and making sure the canvas is the same size
//         canvas.height = degrees % 180 === 0 ? image.height : image.width; //Ditto

//         ctx.translate(canvas.width / 2, canvas.height / 2); //This seems like it finds the center of the canvas (aka our image)
//         ctx.rotate(degrees * Math.PI / 180); //This is what does the actual rotation with the degrees we input as a parameter
//         ctx.drawImage(image, image.width / -2, image.height / -2); //This "redraws" the rotated element onto the canvas once rotated.

//         //exports base64 OR AT LEAST IT'S SUPPOSED TO
//         callback(canvas.toDataURL());
//         //OKAY SO THE CANVAS.TODATAURL() HAS THE INFORMATION. the callback is, based on the couple examples of this, supposed to be assigning this new data to a new Image() - which is WORKING,
//         //until I can't get the .src data from the image itself. Which makes no sense!!! I can do it for different new images with base64 src why not this one?!?!?!?
//     }
// }

// let rotatedHead;

// rotate(head, 90, function(resultBase64) {
//     localStorage.setItem('rotatedHead', resultBase64);
// })

//         mergeImages([
//             //Image paths have to (I think) be relative to index.html
//             //Seeeeeeems like the top left corner of the image is the "anchor" being placed at the provided coordinates.

//             //BACKGROUND
//             {src: 'merge_test_assets/visible_test_background.png', x: 0, y: 0},
//             //HEAD
//             {src: this.state.rotatedHead, x: 130, y: 0},
//             //TORSO
//             {src: torso, x: 120, y: 150},
//             //Left ARM (from user perspective)
//             {src: armLeftUpper, x: 20, y: 150},
//             {src: armLeftLower, x: 20, y: 300},
//             //Right ARM (from user perspective)
//             {src: armRightUpper, x: 400, y: 150},
//             {src: armRightLower, x: 400, y: 320},
//             //Left LEG (from user perspective)
//             {src: legLeftUpper, x: 150, y: 400},
//             {src: legLeftLower, x: 150, y: 580},
//             //Right LEG (from user perspective)
//             {src: legRightUpper, x: 250, y: 400},
//             {src: legRightLower, x: 250, y: 580},

//         ])
//         .then(res => this.setState({standingAvatar: res}))
//     }

//     render() {
//       //console.log('Standing Avatar', this.state.standingAvatar)
//         return (
//             <>
//                 <h1>It's the merged images testing component!</h1>
//             </>
//         )
//     }
// }
