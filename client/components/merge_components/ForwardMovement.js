import mergeImages from 'merge-images';
import React, { Component, useState } from 'react';


//Jumping Forward and Up (positive x movement, negative y movement)
export default function ForwardMovement() {

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
    const [rotatedArmLeftLower, setRotatedHeadArmLeftLower] = useState(false);
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
        canvas.width = degrees % 180 === 0 ? image.width + 50 : image.height + 50; 
        canvas.height = degrees % 180 === 0 ? image.height + 50 : image.width + 50; 
  
        ctx.translate(canvas.width / 2, canvas.height / 2); 
        ctx.rotate((degrees * Math.PI) / 180); 
        ctx.drawImage(image, image.width / -2, image.height / -2); 
  
        //exports base64 
        callback(canvas.toDataURL());
      };
    };
  
    rotate(legRightUpper, 270, function (resultBase64) {
      setRotatedLegRightUpper(resultBase64);
    });
  
    rotate(armRightUpper, 315, function(resultBase64) {
      setRotatedArmRightUpper(resultBase64)
    })
  
    rotate(armRightLower, 180, function(resultBase64) {
      setRotatedArmRightLower(resultBase64)
    })
  
  
  
    if (rotatedLegRightUpper && rotatedArmRightUpper && rotatedArmRightLower) {
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
        { src: rotatedLegRightUpper, x: 290, y: 325 },
        { src: legRightLower, x: 430, y: 400 },
        //Left ARM (from user perspective)
        { src: armLeftUpper, x: 20, y: 150 },
        { src: armLeftLower, x: 20, y: 300 },
        //Right ARM (from user perspective)
        { src: rotatedArmRightUpper, x: 350, y: 150 },
        { src: rotatedArmRightLower, x: 460, y: 85 },
      ]).then((res) => setAvatar(res));
    }
  
    if(avatar){
        localStorage.setItem('forwardMovementAvatar', avatar)
    }
  
    return <div></div>;
  }
  