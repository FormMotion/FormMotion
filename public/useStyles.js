//CSS styles for Material UI
import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({
  specialTypography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    fontWeight: 500,
  },
  regularTypography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    fontWeight: 300,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  heroButtons: {
    margin: theme.spacing(4),
  },
});

export default useStyles;
