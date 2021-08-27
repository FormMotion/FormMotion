import React, { useState } from "react";
import PhaserGame from "./game_components/index.js";
import { CircularProgress } from "@material-ui/core";
import StandingAvatar from "./merge_components/MergeMain";
import LandingAvatar from "./merge_components/Landing";
import ForwardMovement from "./merge_components/ForwardMovement";

export default function Game() {
  return (
    <div>
      <StandingAvatar />
      <LandingAvatar />
      <ForwardMovement />
      <PhaserGame />
    </div>
  );
}
