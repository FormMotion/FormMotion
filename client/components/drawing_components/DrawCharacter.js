import React, { useState, useEffect } from "react";
const Atrament = require("atrament");
import DrawingTools from "./DrawingTools";
import NavBar from "../NavBar";
import DefaultOptions from "./DefaultOptions";

// material-ui
import Grid from "@material-ui/core/Grid";

let head = null;
let torso = null;
let rightUpperArm = null;
let leftUpperArm = null;
let rightLowerArm = null;
let leftLowerArm = null;
let rightUpperLeg = null;
let leftUpperLeg = null;
let rightLowerLeg = null;
let leftLowerLeg = null;

let canvas_image = "assets/graph-paper.png";

const canvases = {
  head,
  torso,
  rightUpperArm,
  leftUpperArm,
  rightLowerArm,
  leftLowerArm,
  rightUpperLeg,
  leftUpperLeg,
  rightLowerLeg,
  leftLowerLeg,
};

const names = {
  head: "head",
  torso: "torso",
  rightUpperArm: "right upper arm",
  leftUpperArm: "left upper arm",
  rightLowerArm: "right lower arm",
  leftLowerArm: "left lower arm",
  rightUpperLeg: "right upper leg",
  leftUpperLeg: "left upper leg",
  rightLowerLeg: "right lower leg",
  leftLowerLeg: "left lower leg",
};

const DrawCharacter = props => {
  useEffect(() => {
    Object.keys(canvases).forEach(canvas => {
      if (canvases[canvas] === null) {
        let currentCanvas = document.querySelector(`#${canvas}`);
        const parentName = `${canvas}`.toLowerCase();
        canvases[canvas] = new Atrament(currentCanvas);
        const parent = document.querySelectorAll(`.${parentName}`)[0];
        fitToContainer(canvases[canvas], parent);
      }
    });
  });

  function fitToContainer(canvas, parent) {
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  }

  return (
    <>
      <NavBar />
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        <Grid Item>
          <DefaultOptions
            canvases={canvases}
            history={props.history}
            names={names}
            type="character"
          />
        </Grid>
        <Grid Item
          margin={40}>
          <div className="container">
            <div className="head">
              <canvas
                id="head"
                width="240px"
                height="160px"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(${canvas_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
            </div>
            <div className="leftupperarm">
              <canvas
                id="leftUpperArm"
                width="120px"
                height="160px"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(${canvas_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
            </div>
            <div className="rightupperarm">
              <canvas
                id="rightUpperArm"
                width="120"
                height="160"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(${canvas_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
            </div>
            <div className="leftlowerarm">
              <canvas
                id="leftLowerArm"
                width="120"
                height="160"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(${canvas_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
            </div>
            <div className="rightlowerarm">
              <canvas
                id="rightLowerArm"
                width="120"
                height="160"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(${canvas_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
            </div>
            <div className="torso">
              <canvas
                id="torso"
                width="240px"
                height="200px"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(${canvas_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
            </div>
            <div className="leftupperleg">
              <canvas
                id="leftUpperLeg"
                width="120"
                height="160"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(${canvas_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
            </div>
            <div className="rightupperleg">
              <canvas
                id="rightUpperLeg"
                width="120"
                height="160"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(${canvas_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
            </div>
            <div className="leftlowerleg">
              <canvas
                id="leftLowerLeg"
                width="120"
                height="160"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(${canvas_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
            </div>
            <div className="rightlowerleg">
              <canvas
                id="rightLowerLeg"
                width="120"
                height="160"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(${canvas_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
            </div>
          </div>
        </Grid>
        <Grid Item>
          <DrawingTools
            canvases={canvases}
            history={props.history}
            names={names}
            type="character"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DrawCharacter;
