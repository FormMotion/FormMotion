/* eslint-disable no-unused-vars */
import mergeImages from 'merge-images';
import React, { Component, useState } from 'react';


//POSES NEEDED: 
//Standing Avatar (Default, no pose, merges as drawn, for when avatar is jumping in place on the platform)
//DONE - Landing (landing on platform)
//Jumping (with X movement, so it's not the static standing avatar while moving through the game)
//DONE - ForwardMovement (moving along X-axis, negative Y-axis movement - moving upwards)
//DownwardMovement (moving along X-axis, positive Y-axis movement - moving downwards)

export default function StandingAvatar() {


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


  const [avatar, setAvatar] = useState(null);

    mergeImages([

      //BACKGROUND
      { src: 'assets/transparent_background_600_x_800.png', x: 0, y: 0 },
      //HEAD
      { src: head, x: 130, y: 0 },
      //TORSO
      { src: torso, x: 120, y: 150 },
      //Left LEG (from user perspective)
      { src: legLeftUpper, x: 150, y: 400 },
      { src: legLeftLower, x: 150, y: 580 },
      //Right LEG (from user perspective)
      { src: legRightUpper, x: 250, y: 400 },
      { src: legRightLower, x: 250, y: 580 },
      //Left ARM (from user perspective)
      { src: armLeftUpper, x: 20, y: 150 },
      { src: armLeftLower, x: 20, y: 300 },
      //Right ARM (from user perspective)
      { src: armRightUpper, x: 400, y: 170 },
      { src: armRightLower, x: 400, y: 350 },
    ]).then((res) => setAvatar(res));


    if (avatar){
      localStorage.setItem('standingAvatar', avatar)
    }

  return <div></div>;
}




////////Template for other poses if needed
////////Commented out intentionally and preserved for future use 

// export function TEMPLATE_FOR_OTHER_POSES() {

//   const head = localStorage.getItem('playerDrawnhead');
//   const torso = localStorage.getItem('playerDrawntorso');
//   const armRightUpper = localStorage.getItem('playerDrawnrightUpperArm');
//   const armRightLower = localStorage.getItem('playerDrawnrightLowerArm');
//   const armLeftUpper = localStorage.getItem('playerDrawnleftUpperArm');
//   const armLeftLower = localStorage.getItem('playerDrawnleftLowerArm');
//   const legRightUpper = localStorage.getItem('playerDrawnrightUpperLeg');
//   const legRightLower = localStorage.getItem('playerDrawnrightLowerLeg');
//   const legLeftUpper = localStorage.getItem('playerDrawnleftUpperLeg');
//   const legLeftLower = localStorage.getItem('playerDrawnleftLowerLeg');

//   //avatar is final merged image 
//   const [avatar, setAvatar] = useState(null);

//   //delete line if not using
//   const [rotatedHead, setRotatedHead] = useState(false);
//   const [rotatedTorso, setRotatedTorso] = useState(false);
//   const [rotatedArmRightUpper, setRotatedArmRightUpper] = useState(false);
//   const [rotatedArmRightLower, setRotatedArmRightLower] = useState(false);
//   const [rotatedArmLeftUpper, setRotatedArmLeftUpper] = useState(false);
//   const [rotatedArmLeftLower, setRotatedHeadArmLeftLower] = useState(false);
//   const [rotatedLegRightUpper, setRotatedLegRightUpper] = useState(false);
//   const [rotatedLegRightLower, setRotatedLegRightLower] = useState(false);
//   const [rotatedLegLeftUpper, setRotatedLegLeftUpper] = useState(false);
//   const [rotatedLegLeftLower, setRotatedLeftLower] = useState(false);


//   const rotate = (base64info, degrees, callback) => {
//     const canvas = document.createElement('canvas');
//     let ctx = canvas.getContext('2d');
//     let image = new Image();

//     image.src = base64info;

//     image.onload = function () {
//       canvas.width = degrees % 180 === 0 ? image.width + 50 : image.height + 50; 
//       canvas.height = degrees % 180 === 0 ? image.height + 50 : image.width + 50; 

//       ctx.translate(canvas.width / 2, canvas.height / 2); 
//       ctx.rotate((degrees * Math.PI) / 180); 
//       ctx.drawImage(image, image.width / -2, image.height / -2); 

//       //exports base64 
//       callback(canvas.toDataURL());
//     };
//   };

//   rotate(BODY_PART_TO_ROTATE, 90, function (resultBase64) {
//     setRotatedBODY_PART_TO_MERGE_ROTATED(resultBase64);
//   });

//   if (BODY_PART_TO_MERGE_ROTATED) {
//     mergeImages([

//       //BACKGROUND
//       { src: 'assets/transparent_background_800_x_800.png', x: 0, y: 0 },
//       //HEAD
//       { src: head, x: 130, y: 0 },
//       //TORSO
//       { src: torso, x: 120, y: 150 },
//       //Left LEG (from user perspective)
//       { src: legLeftUpper, x: 150, y: 400 },
//       { src: legLeftLower, x: 150, y: 580 },
//       //Right LEG (from user perspective)
//       { src: legRightUpper, x: 250, y: 400 },
//       { src: legRightLower, x: 250, y: 580 },
//       //Left ARM (from user perspective)
//       { src: armLeftUpper, x: 20, y: 150 },
//       { src: armLeftLower, x: 20, y: 300 },
//       //Right ARM (from user perspective)
//       { src: armRightUpper, x: 400, y: 150 },
//       { src: armRightLower, x: 400, y: 320 },
//     ]).then((res) => setAvatar(res));
//   }

//   return <div></div>;
// }