import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    grid: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column'
    },
    paper: {
        padding: theme.spacing(2),
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '40px'
    },
    list: {
        minWidth: "100%"
    },
}));
