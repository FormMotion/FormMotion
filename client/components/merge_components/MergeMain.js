/* eslint-disable no-unused-vars */
import mergeImages from 'merge-images';
import React, { Component, useState } from 'react';

//THESE SHOULD ALL BE SEPARATED INTO UNIQUE COMPONENTS - THEY ARE CURRENTLY IN ONE FILE FOR DEV PURPOSES ONLY 

//POSES NEEDED: 
//Standing Avatar (Default, no pose, merges as drawn)
//Landing (landing on platform)
//Jumping (jumping in place, no Y-axis movement) ---> make this one last, it could theoretically just be the standing avatar!
//ForwardMovement (moving along X-axis, negative Y-axis movement - moving upwards)
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
      { src: 'assets/transparent_background_500_x_800.png', x: 0, y: 0 },
      //HEAD
      { src: head, x: 130, y: 0 },
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


  return <div></div>;
}

//Landing (landing on platform)
export function Landing() {

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

  //avatar is final merged image 
  const [avatar, setAvatar] = useState(null);

  //delete line if not using
  const [rotatedHead, setRotatedHead] = useState(false);
  const [rotatedTorso, setRotatedTorso] = useState(false);
  const [rotatedArmRightUpper, setRotatedArmRightUpper] = useState(false);
  const [rotatedArmRightLower, setRotatedArmRightLower] = useState(false);
  const [rotatedArmLeftUpper, setRotatedArmLeftUpper] = useState(false);
  const [rotatedArmLeftLower, setRotatedArmLeftLower] = useState(false);
  const [rotatedLegRightUpper, setRotatedLegRightUpper] = useState(false);
  const [rotatedLegRightLower, setRotatedLegRightLower] = useState(false);
  const [rotatedLegLeftUpper, setRotatedLegLeftUpper] = useState(false);
  const [rotatedLegLeftLower, setRotatedLeftLower] = useState(false);


  const rotate = (base64info, degrees, callback) => {
    const canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let image = new Image();

    image.src = base64info;

    image.onload = function () {
      canvas.width = degrees % 180 === 0 ? image.width : image.height; 
      canvas.height = degrees % 180 === 0 ? image.height : image.width; 

      ctx.translate(canvas.width / 2, canvas.height / 2); 
      ctx.rotate((degrees * Math.PI) / 180); 
      ctx.drawImage(image, image.width / -2, image.height / -2); 

      //exports base64 
      callback(canvas.toDataURL());
    };
  };

  rotate(armRightLower, 90, function (resultBase64) {
    setRotatedArmRightLower(resultBase64);
  });

  rotate(armLeftLower, 280, function (resultBase64) {
    setRotatedArmLeftLower(resultBase64);
  });

  if (rotatedArmRightLower && rotatedArmLeftLower) {
    mergeImages([

      //BACKGROUND
      { src: 'assets/transparent_background_500_x_800.png', x: 0, y: 0 },
      //HEAD
      { src: head, x: 130, y: 0 },
      //TORSO
      { src: torso, x: 120, y: 150 },
      //Left ARM (from user perspective)
      { src: armLeftUpper, x: 20, y: 150 },
      { src: rotatedArmLeftLower, x: 50, y: 300 },
      //Right ARM (from user perspective)
      { src: armRightUpper, x: 400, y: 150 },
      { src: rotatedArmRightLower, x: 250, y: 320 },
      //Left LEG (from user perspective)
      { src: legLeftUpper, x: 150, y: 400 },
      { src: legLeftLower, x: 150, y: 580 },
      //Right LEG (from user perspective)
      { src: legRightUpper, x: 250, y: 400 },
      { src: legRightLower, x: 250, y: 580 },
    ]).then((res) => setAvatar(res));
  }

  console.log('LANDING:', avatar)

  return <div></div>;
}

////////-----*** Template for other poses if needed ***-----////////////////
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
//       canvas.width = degrees % 180 === 0 ? image.width : image.height; 
//       canvas.height = degrees % 180 === 0 ? image.height : image.width; 

//       ctx.translate(canvas.width / 2, canvas.height / 2); 
//       ctx.rotate((degrees * Math.PI) / 180); 
//       ctx.drawImage(image, image.width / -2, image.height / -2); 

//       //exports base64 
//       callback(canvas.toDataURL());
//     };
//   };

//   rotate(BODY_PART_TO_MERGE_ROTATED, 90, function (resultBase64) {
//     setRotatedBODY_PART(resultBase64);
//   });

//   if (BODY_PART_TO_MERGE_ROTATED) {
//     mergeImages([

//       //BACKGROUND
//       { src: 'assets/transparent_background_500_x_800.png', x: 0, y: 0 },
//       //HEAD
//       { src: rotatedHead, x: 130, y: 0 },
//       //TORSO
//       { src: torso, x: 120, y: 150 },
//       //Left ARM (from user perspective)
//       { src: armLeftUpper, x: 20, y: 150 },
//       { src: armLeftLower, x: 20, y: 300 },
//       //Right ARM (from user perspective)
//       { src: armRightUpper, x: 400, y: 150 },
//       { src: armRightLower, x: 400, y: 320 },
//       //Left LEG (from user perspective)
//       { src: legLeftUpper, x: 150, y: 400 },
//       { src: legLeftLower, x: 150, y: 580 },
//       //Right LEG (from user perspective)
//       { src: legRightUpper, x: 250, y: 400 },
//       { src: legRightLower, x: 250, y: 580 },
//     ]).then((res) => setAvatar(res));
//   }

//   return <div></div>;
// }