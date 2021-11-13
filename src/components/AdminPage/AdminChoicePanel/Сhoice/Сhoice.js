import React from 'react';
import { Button } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

import useStyles from './styles';

const Choice = ({ type }) => {

    const history = useHistory();

    const classes = useStyles();

    const handleClick = () => {
        switch (type) {
            case 'Modify system users':
                history.push(`admin/modify_system_users`);
                break;
            case 'Create courses':
                history.push(`admin/create_courses`);
                break;
            case 'Add students to courses':
                history.push(`admin/add_students_to_courses`);
                break;
            default:
                break;
        }
    }

    return (
        <Button className={classes.button} variant="contained" color="primary" onClick={handleClick}>
            {type}
        </Button>
    )
}


export default Choice;