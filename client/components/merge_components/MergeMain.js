/* eslint-disable no-unused-vars */
import mergeImages from 'merge-images';
import React, { Component, useState } from 'react';

export default function StandingAvatar() {


  const head = localStorage.getItem('playerDrawnHead');
  const torso = localStorage.getItem('playerDrawnTorso');
  const armRightUpper = localStorage.getItem('playerDrawnRightUpperArm');
  const armRightLower = localStorage.getItem('playerDrawnRightLowerArm');
  const armLeftUpper = localStorage.getItem('playerDrawnLeftUpperArm');
  const armLeftLower = localStorage.getItem('playerDrawnLeftLowerArm');
  const legRightUpper = localStorage.getItem('playerDrawnRightUpperLeg');
  const legRightLower = localStorage.getItem('playerDrawnRightLowerLeg');
  const legLeftUpper = localStorage.getItem('playerDrawnLeftUpperLeg');
  const legLeftLower = localStorage.getItem('playerDrawnLeftLowerLeg');


  const [avatar, setAvatar] = useState(null);

    mergeImages([

      //BACKGROUND
      { src: 'assets/transparent_background_600_x_800.png', x: 0, y: 0 },
      //HEAD
      { src: head, x: 140, y: 60 },
      //TORSO
      { src: torso, x: 140, y: 220 },
      //Left LEG (from user perspective)
      { src: legLeftUpper, x: 150, y: 420 },
      { src: legLeftLower, x: 150, y: 580 },
      //Right LEG (from user perspective)
      { src: legRightUpper, x: 270, y: 420 },
      { src: legRightLower, x: 270, y: 580 },
      //Left ARM (from user perspective)
      { src: armLeftUpper, x: 20, y: 225 },
      { src: armLeftLower, x: 25, y: 385 },
      //Right ARM (from user perspective)
      { src: armRightUpper, x: 380, y: 220 },
      { src: armRightLower, x: 380, y: 380 },
    ]).then((res) => setAvatar(res));


    if (avatar){
      localStorage.setItem('standingAvatar', avatar)
    }


  return <div></div>;
}




////////Template for other poses if needed
////////Commented out intentionally and preserved for future use

// export function TEMPLATE_FOR_OTHER_POSES() {

// const head = localStorage.getItem('playerDrawnHead');
// const torso = localStorage.getItem('playerDrawnTorso');
// const armRightUpper = localStorage.getItem('playerDrawnRightUpperArm');
// const armRightLower = localStorage.getItem('playerDrawnRightLowerArm');
// const armLeftUpper = localStorage.getItem('playerDrawnLeftUpperArm');
// const armLeftLower = localStorage.getItem('playerDrawnLeftLowerArm');
// const legRightUpper = localStorage.getItem('playerDrawnRightUpperLeg');
// const legRightLower = localStorage.getItem('playerDrawnRightLowerLeg');
// const legLeftUpper = localStorage.getItem('playerDrawnLeftUpperLeg');
// const legLeftLower = localStorage.getItem('playerDrawnLeftLowerLeg');

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
//   const [rotatedLegLeftLower, setRotatedLegLeftLower] = useState(false);


//   const rotate = (base64info, degrees, callback) => {
     const canvas = document.createElement('canvas');
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

