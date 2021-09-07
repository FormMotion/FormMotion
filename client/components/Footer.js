import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../public/useStyles";
import { withStyles } from "@material-ui/core/styles";

const Footer = props => {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Insert slogan
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © FormMotion"}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </footer>
  );
};

export default withStyles(useStyles)(Footer);
