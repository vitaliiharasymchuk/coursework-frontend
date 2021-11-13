import React from 'react';
import { Grid } from '@material-ui/core';
import Choice from './Сhoice/Сhoice';

import useStyles from './styles';

const AdminChoicePanel = () => {

    const classes = useStyles();

    return (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            <Choice type="Modify system users" />
            <Choice type="Create courses" />
            <Choice type="Add students to courses" />
        </Grid>

    )
}


export default AdminChoicePanel;