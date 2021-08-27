import mergeImages from 'merge-images';
import React, { Component, useState } from 'react';


//Landing (landing on platform)
export default function Landing() {

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
    const [rotatedLegLeftLower, setRotatedLegLeftLower] = useState(false);
  
  
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
  
    rotate(armRightLower, 25, function (resultBase64) {
      setRotatedArmRightLower(resultBase64);
    });
  
    rotate(armLeftLower, 335, function (resultBase64) {
      setRotatedArmLeftLower(resultBase64);
    });
  
    rotate(legRightUpper, 335, function (resultBase64) {
      setRotatedLegRightUpper(resultBase64);
    });
  
    rotate(legRightLower, 35, function (resultBase64) {
      setRotatedLegRightLower(resultBase64);
    });
  
    rotate(legLeftUpper, 35, function (resultBase64) {
      setRotatedLegLeftUpper(resultBase64);
    });
  
    rotate(legLeftLower, 335, function (resultBase64) {
      setRotatedLegLeftLower(resultBase64);
    });
  
    if (rotatedArmRightLower && rotatedArmLeftLower && rotatedLegLeftLower && rotatedLegLeftUpper && rotatedLegRightLower && rotatedLegRightUpper) {
      mergeImages([
  
        //BACKGROUND
        { src: 'assets/transparent_background_600_x_800.png', x: 0, y: 0 },
        //HEAD
        { src: head, x: 130, y: 0 },
        //TORSO
        { src: torso, x: 120, y: 150 },
        //Left LEG (from user perspective)
        { src: rotatedLegLeftUpper, x: 20, y: 380 },
        { src: rotatedLegLeftLower, x: 20, y: 510 },
        //Right LEG (from user perspective)
        { src: rotatedLegRightUpper, x: 270, y: 380 },
        { src: rotatedLegRightLower, x: 270, y: 520 },
        //Left ARM (from user perspective)
        { src: armLeftUpper, x: 20, y: 150 },
        { src: rotatedArmLeftLower, x: 0, y: 310 },
        //Right ARM (from user perspective)
        { src: armRightUpper, x: 380, y: 170 },
        { src: rotatedArmRightLower, x: 280, y: 340 },
      ]).then((res) => setAvatar(res));
    }
  
    if (avatar){
        localStorage.setItem('landingAvatar', avatar)
    }
  
    return <div></div>;
}