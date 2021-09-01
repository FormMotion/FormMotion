//CSS styles for Material UI
import { withStyles } from '@material-ui/core/styles'

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
        // card: {
        //     height: '100%',
        //     display: 'flex',
        //     width: 300,
        //     flexDirection: 'column',
        // },
        // cardMedia: {
        //     paddingTop: '56.25%', // 16:9
        // },
        // cardContent: {
        //     flexGrow: 1,
        // },
        // footer: {
        //     backgroundColor: '#8ea2de',
        //     padding: theme.spacing(2),
        // },
        // paginationGrid: {
        //     paddingBottom: theme.spacing(5),
        // },
        // root: {
        //     justifyContent: 'center'
        // },
    },
})

export default useStyles
