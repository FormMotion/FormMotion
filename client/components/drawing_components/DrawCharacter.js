import React, { useState, useEffect } from "react";
const Atrament = require("atrament");
import DrawingTools from "./DrawingTools";
import NavBar from "../NavBar";

// material-ui
import Grid from "@material-ui/core/Grid";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

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
  const [allDefault, setAllDefault] = useState("0");

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
  }, []);

  function fitToContainer(canvas, parent) {
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  }

  // for mouse over popovers
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openedPopoverId, setOpenedPopoverId] = React.useState(null);

  const handlePopoverOpen = (event, popoverId) => {
    setAnchorEl(event.currentTarget);
    setOpenedPopoverId(popoverId);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpenedPopoverId(null);
  };

  const open = Boolean(anchorEl);

  // for toggle to disable popovers
  const [popoverChecked, setPopoverChecked] = React.useState(true);

  const popoverToggleChecked = () => {
    setPopoverChecked(prev => !prev);
  };

  return (
    <div>
      <NavBar />
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
      >
        <Grid Item>
          <div className="container">
            <Box
              className="head"
              key="head"
              aria-owns={open ? "head-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={e => handlePopoverOpen(e, "head")}
              onClick={handlePopoverClose}
              onMouseLeave={handlePopoverClose}
            >
              <canvas
                id="head"
                width="240px"
                height="160px"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(images/head_template.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
              {popoverChecked && (
                <Popover
                  id="head-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={openedPopoverId === "head"}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography>Draw a head here!</Typography>
                </Popover>
              )}
            </Box>
            <Box
              className="leftupperarm"
              key="leftupperarm"
              aria-owns={open ? "left-upper-arm-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={e => handlePopoverOpen(e, "leftupperarm")}
              onClick={handlePopoverClose}
              onMouseLeave={handlePopoverClose}
            >
              <canvas
                id="leftUpperArm"
                width="120px"
                height="160px"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(images/left_upper_arm_template.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
              {popoverChecked && (
                <Popover
                  id="left-upper-arm-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={openedPopoverId === "leftupperarm"}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography>Draw a left upper arm here!</Typography>
                </Popover>
              )}
            </Box>
            <Box
              className="rightupperarm"
              key="rightupperarm"
              aria-owns={open ? "right-upper-arm-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={e => handlePopoverOpen(e, "rightupperarm")}
              onClick={handlePopoverClose}
              onMouseLeave={handlePopoverClose}
            >
              <canvas
                id="rightUpperArm"
                width="120"
                height="160"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(images/right_upper_arm_template.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
              {popoverChecked && (
                <Popover
                  id="right-upper-arm-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={openedPopoverId === "rightupperarm"}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography>Draw a right upper arm here!</Typography>
                </Popover>
              )}
            </Box>
            <Box
              className="leftlowerarm"
              key="leftlowerarm"
              aria-owns={open ? "left-lower-arm" : undefined}
              aria-haspopup="true"
              onMouseEnter={e => handlePopoverOpen(e, "leftlowerarm")}
              onClick={handlePopoverClose}
              onMouseLeave={handlePopoverClose}
            >
              <canvas
                id="leftLowerArm"
                width="120"
                height="160"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(images/left_lower_arm_template.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
              {popoverChecked && (
                <Popover
                  id="left-lower-arm-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={openedPopoverId === "leftlowerarm"}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography>Draw a left lower arm here!</Typography>
                </Popover>
              )}
            </Box>
            <Box
              className="rightlowerarm"
              key="rightlowerarm"
              aria-owns={open ? "right-lower-arm-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={e => handlePopoverOpen(e, "rightlowerarm")}
              onClick={handlePopoverClose}
              onMouseLeave={handlePopoverClose}
            >
              <canvas
                id="rightLowerArm"
                width="120"
                height="160"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(images/right_lower_arm_template.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
              {popoverChecked && (
                <Popover
                  id="right-lower-arm-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={openedPopoverId === "rightlowerarm"}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography>Draw a right lower arm here!</Typography>
                </Popover>
              )}
            </Box>
            <Box
              className="torso"
              key="torso"
              aria-owns={open ? "torso-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={e => handlePopoverOpen(e, "torso")}
              onClick={handlePopoverClose}
              onMouseLeave={handlePopoverClose}
            >
              <canvas
                id="torso"
                width="240px"
                height="200px"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(images/torso_template.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
              {popoverChecked && (
                <Popover
                  id="torso-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={openedPopoverId === "torso"}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography>Draw a torso here!</Typography>
                </Popover>
              )}
            </Box>
            <Box
              className="leftupperleg"
              key="leftupperleg"
              aria-owns={open ? "left-upper-leg-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={e => handlePopoverOpen(e, "leftupperleg")}
              onClick={handlePopoverClose}
              onMouseLeave={handlePopoverClose}
            >
              <canvas
                id="leftUpperLeg"
                width="120"
                height="160"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(images/left_upper_leg_template.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
              {popoverChecked && (
                <Popover
                  id="left-upper-leg-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={openedPopoverId === "leftupperleg"}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography>Draw a left upper leg here!</Typography>
                </Popover>
              )}
            </Box>
            <Box
              className="rightupperleg"
              key="rightupperleg"
              aria-owns={open ? "right-upper-leg-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={e => handlePopoverOpen(e, "rightupperleg")}
              onClick={handlePopoverClose}
              onMouseLeave={handlePopoverClose}
            >
              <canvas
                id="rightUpperLeg"
                width="120"
                height="160"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(images/left_upper_leg_template.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
              {popoverChecked && (
                <Popover
                  id="right-upper-leg-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={openedPopoverId === "rightupperleg"}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography>Draw a right upper leg here!</Typography>
                </Popover>
              )}
            </Box>
            <Box
              className="leftlowerleg"
              key="leftlowerleg"
              aria-owns={open ? "left-lower-leg-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={e => handlePopoverOpen(e, "leftlowerleg")}
              onClick={handlePopoverClose}
              onMouseLeave={handlePopoverClose}
            >
              <canvas
                id="leftLowerLeg"
                width="120"
                height="160"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(images/left_lower_leg_template.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
              {popoverChecked && (
                <Popover
                  id="left-lower-leg-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={openedPopoverId === "leftlowerleg"}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography>Draw a left lower leg here!</Typography>
                </Popover>
              )}
            </Box>
            <Box
              className="rightlowerleg"
              key="rightlowerleg"
              aria-owns={open ? "right-lower-leg-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={e => handlePopoverOpen(e, "rightlowerleg")}
              onClick={handlePopoverClose}
              onMouseLeave={handlePopoverClose}
            >
              <canvas
                id="rightLowerLeg"
                width="120"
                height="160"
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundImage: `url(images/right_lower_leg_template.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></canvas>
              {popoverChecked && (
                <Popover
                  id="right-lower-leg-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={openedPopoverId === "rightlowerleg"}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography>Draw a right lower leg here!</Typography>
                </Popover>
              )}
            </Box>
          </div>
        </Grid>
        <Grid Item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid Item>
              <DrawingTools
                canvases={canvases}
                history={props.history}
                names={names}
                type="character"
              />
            </Grid>
            <Grid Item>
              <Box
                p={1}
                m={1}
                borderRadius={16}
                style={{ backgroundColor: "#f5f5f5" }}
              >
                {(allDefault === "0" || allDefault === 0) && (
                  <div>
                    <FormControlLabel
                      control={
                        <Switch
                          onChange={popoverToggleChecked}
                          color="primary"
                        />
                      }
                      label="Disable popups"
                    />
                  </div>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default DrawCharacter;
