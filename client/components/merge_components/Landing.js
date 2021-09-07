import mergeImages from "merge-images";
import React, { Component, useState } from "react";

//Landing (landing on platform)
export default function Landing() {
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
  const [rotatedArmRightLower, setRotatedArmRightLower] = useState(false);
  const [rotatedArmLeftLower, setRotatedArmLeftLower] = useState(false);
  const [rotatedLegRightUpper, setRotatedLegRightUpper] = useState(false);
  const [rotatedLegRightLower, setRotatedLegRightLower] = useState(false);
  const [rotatedLegLeftUpper, setRotatedLegLeftUpper] = useState(false);
  const [rotatedLegLeftLower, setRotatedLegLeftLower] = useState(false);

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

  if (
    rotatedArmRightLower &&
    rotatedArmLeftLower &&
    rotatedLegLeftLower &&
    rotatedLegLeftUpper &&
    rotatedLegRightLower &&
    rotatedLegRightUpper
  ) {
    mergeImages([
      //BACKGROUND
      { src: "assets/transparent_background_600_x_800.png", x: 0, y: 0 },
      //HEAD
      { src: head, x: 140, y: 50 },
      //TORSO
      { src: torso, x: 140, y: 220 },
      //Left LEG (from user perspective)
      { src: rotatedLegLeftUpper, x: 40, y: 390 },
      { src: rotatedLegLeftLower, x: 30, y: 540 },
      //Right LEG (from user perspective)
      { src: rotatedLegRightUpper, x: 250, y: 410 },
      { src: rotatedLegRightLower, x: 235, y: 550 },
      //Left ARM (from user perspective)
      { src: armLeftUpper, x: 20, y: 225 },
      { src: rotatedArmLeftLower, x: 0, y: 365 },
      //Right ARM (from user perspective)
      { src: armRightUpper, x: 380, y: 220 },
      { src: rotatedArmRightLower, x: 310, y: 360 },
    ]).then(res => setAvatar(res));
  }

  if (avatar) {
    localStorage.setItem("landingAvatar", avatar);
  }

  return <div></div>;
}
