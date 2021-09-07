import React, { Fragment, useEffect, useState, useRef } from "react";
import { Route, Switch, withRouter, useLocation } from "react-router-dom";

import About from "./components/About";
import Welcome from "./components/Welcome";
import singleCharacterDrawing from "./components/drawing_components/singleCharacterDrawing.js";
import Game from "./components/Game";
import DrawPlatform from "./components/drawing_components/DrawPlatform.js";
import Merge from "./components/merge_components/ForwardMovement";
import DrawCharacter from "./components/drawing_components/DrawCharacter";

const Routes = props => {
  const [pageStack, setPageStack] = useState([]);
  const isMounted = useRef(null);
  let location = useLocation();

  const reload = () => {
    window.location.reload();
    setPageStack([]);
  };

  useEffect(() => {
    setPageStack([...pageStack, location.pathname]);
    if (pageStack.includes("/game") && location.pathname !== "/game") {
      if (document.readyState === "complete") {
        reload();
      } else {
        window.addEventListener("load", reload);
        return () => document.removeEventListener("load", reload);
      }
    }
  }, [location]);

  return (
    <div>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/about" component={About} />
        <Route path="/play" component={DrawCharacter} />
        <Route path="/game" exact component={Game} />
        <Route path="/platform" component={DrawPlatform} />
        <Route path="/oneDrawing" component={singleCharacterDrawing} />
        <Route path="/merge" component={Merge} />
      </Switch>
    </div>
  );
};

export default withRouter(Routes);
