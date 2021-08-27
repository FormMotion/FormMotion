import React, { useState } from "react";
import { Link } from 'react-router-dom'
import PhaserGame from "./game_components/index.js";
import Welcome from "../components/Welcome"

export default function Game() {

  return (
    <>
      <PhaserGame />
      <a href="/">FormMotion Home</a>
    </>

  );
}
