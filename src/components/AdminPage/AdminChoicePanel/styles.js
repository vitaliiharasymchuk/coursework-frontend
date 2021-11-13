import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100%',
        marginTop: '300px'
    },
    smMargin: {
        margin: theme.spacing(1),
    },
    actionDiv: {
        textAlign: 'center',
    },
}));
