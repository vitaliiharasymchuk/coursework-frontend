import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';

import { createCourse } from '../../../../../actions/adminActions';

const Form = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(createCourse({ name: courseName, description: courseDescription }));
    }

    const clear = () => {
        setCourseName('');
        setCourseDescription('');
    }


    return (
        <div>
            <Paper className={classes.paper} elevation={6}>
                <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6">Creating a new course</Typography>
                    <TextField className={classes.textField} name="courseName" variant="outlined" label="Course name" fullWidth value={courseName} onChange={(e) => setCourseName(e.target.value)} />
                    <TextField className={classes.textField} name="courseDescription" variant="outlined" label="Course description" fullWidth value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} />
                    <Button className={classes.button} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="large" onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        </div>
    )
}

export default Form
