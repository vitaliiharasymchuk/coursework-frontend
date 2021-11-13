import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {

        },
    },
    paper: {
        padding: theme.spacing(2),
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    grid: {
        paddingTop: '20px',
        paddingBottom: '20px'
    },
    grid1: {
        paddingBottom: '20px'
    },
    buttonSubmit: {
        marginBottom: '10px',
    },
    textField: {
        marginBottom: '20px'
    }
}));