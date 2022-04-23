import React from 'react';
import { Grid } from '@material-ui/core';
import Choice from './Choice/Choice';

import useStyles from './styles';

const AdminChoicePanel = () => {

    const classes = useStyles();

    return (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            <Choice type="Редагувати користувачів системи" />
            <Choice type="Створити курси" />
            <Choice type="Підключити студентів до курсів" />
        </Grid>

    )
}


export default AdminChoicePanel;