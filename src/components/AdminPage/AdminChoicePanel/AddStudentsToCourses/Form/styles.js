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
        justifyContent: 'center',
    },
    box: {
        marginBottom: '20px'
    },
    button: {
        marginBottom: '10px',
    },
}));