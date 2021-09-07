import mergeImages from "merge-images";
import React, { Component, useState } from "react";

export default function SlimeMerge() {
  const legRightUpper = localStorage.getItem("playerDrawnRightUpperLeg");
  const legRightLower = localStorage.getItem("playerDrawnRightLowerLeg");
  const legLeftUpper = localStorage.getItem("playerDrawnLeftUpperLeg");
  const legLeftLower = localStorage.getItem("playerDrawnLeftLowerLeg");

  //avatar is final merged image
  const [avatar, setAvatar] = useState(null);

  mergeImages([
    //BACKGROUND
    { src: "assets/transparent_background_800_x_800.png", x: 0, y: 0 },
    //Left LEG (from user perspective)
    { src: legLeftUpper, x: 150, y: 400 },
    { src: legLeftLower, x: 150, y: 580 },
    //Right LEG (from user perspective)
    { src: legRightUpper, x: 250, y: 400 },
    { src: legRightLower, x: 250, y: 580 },
    //Slime!
    { src: "assets/large_slime.png", x: 0, y: 25 },
  ]).then(res => setAvatar(res));

  if (avatar) {
    localStorage.setItem("slimeAvatar", avatar);
  }

  return <div></div>;
}
