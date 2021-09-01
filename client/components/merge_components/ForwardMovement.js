import mergeImages from "merge-images";
import React, { Component, useState } from "react";

//Jumping Forward and Up (positive x movement, negative y movement)
export default function ForwardMovement() {
  const head = localStorage.getItem("playerDrawnHead");
  const torso = localStorage.getItem("playerDrawnTorso");
  const armRightUpper = localStorage.getItem("playerDrawnRightUpperArm");
  const armRightLower = localStorage.getItem("playerDrawnRightLowerArm");
  const armLeftUpper = localStorage.getItem("playerDrawnLeftUpperArm");
  const armLeftLower = localStorage.getItem("playerDrawnLeftLowerArm");
  const legRightUpper = localStorage.getItem("playerDrawnRightUpperLeg");
  const legRightLower = localStorage.getItem("playerDrawnRightLowerLeg");
  const legLeftUpper = localStorage.getItem("playerDrawnLeftUpperLeg");
  const legLeftLower = localStorage.getItem("playerDrawnLeftLowerLeg");

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
    const canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let image = new Image();

    image.src = base64info;

    image.onload = function () {
      canvas.width = degrees % 180 === 0 ? image.width + 50 : image.height + 50;
      canvas.height =
        degrees % 180 === 0 ? image.height + 50 : image.width + 50;

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

  rotate(armRightUpper, 315, function (resultBase64) {
    setRotatedArmRightUpper(resultBase64);
  });

  rotate(armRightLower, 180, function (resultBase64) {
    setRotatedArmRightLower(resultBase64);
  });

  if (rotatedLegRightUpper && rotatedArmRightUpper && rotatedArmRightLower) {
    mergeImages([
      //BACKGROUND
      { src: "assets/transparent_background_600_x_800.png", x: 0, y: 0 },
      //HEAD
      { src: head, x: 140, y: 50 },
      //TORSO
      { src: torso, x: 140, y: 220 },
      //Left LEG (from user perspective)
      { src: legLeftUpper, x: 150, y: 400 },
      { src: legLeftLower, x: 150, y: 545 },
      //Right LEG (from user perspective)
      { src: rotatedLegRightUpper, x: 290, y: 345 },
      { src: legRightLower, x: 430, y: 420 },
      //Left ARM (from user perspective)
      { src: armLeftUpper, x: 30, y: 225 },
      { src: armLeftLower, x: 30, y: 375 },
      //Right ARM (from user perspective)
      { src: rotatedArmRightUpper, x: 320, y: 180 },
      { src: rotatedArmRightLower, x: 440, y: 115 },
    ]).then(res => setAvatar(res));
  }

  if (avatar) {
    localStorage.setItem("forwardMovementAvatar", avatar);
  }

  return <div></div>;
}
