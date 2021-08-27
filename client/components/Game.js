import React, { useState } from "react";
import PhaserGame from "./game_components/index.js";
import { CircularProgress } from "@material-ui/core";
import StandingAvatar from "./merge_components/MergeMain";
import LandingAvatar from "./merge_components/Landing";
import ForwardMovement from "./merge_components/ForwardMovement";
import DownwardMovement from "./merge_components/DownwardMovement.js";

export default function Game() {
  return (
    <div>
      //These need to move to Platform component to prevent refresh issue
            <StandingAvatar />
      <LandingAvatar />
      <ForwardMovement />
      <DownwardMovement />
    
      <PhaserGame />
    </div>
  );
}
