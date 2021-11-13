import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Button, Typography, Paper, TextField, Box, MenuItem } from '@material-ui/core';
import useStyles from './styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import { getCourses, generateTicket } from '../../../actions/studentActions';

const StudentForm = () => {


    const classes = useStyles();
    const dispatch = useDispatch();

    const [selectedCourse, setSelectedCourse] = useState('');

    const verify = () => {
        return JSON.parse(localStorage.getItem('profile'));
    }

    const { courses } = useSelector((state) => state.student);

    useEffect(() => {
        dispatch(getCourses());
    }, [dispatch]);

    const handleClick = () => {
        dispatch(generateTicket(selectedCourse));
    }

    return (
        verify()?.result.role === 'student' ?
            <div>
                <Paper className={classes.paper} elevation={6}>
                    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e) => { e.preventDefault() }}>
                        <Typography variant="h6">Get a generated test ticket : </Typography>
                        <Grid item xs={12} className={classes.grid}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="label">Course</InputLabel>
                                    <Select
                                        name="course"
                                        labelId="label"
                                        id="simple-select"
                                        value={selectedCourse}
                                        label="Course"
                                        required
                                        onChange={(e) => setSelectedCourse(e.target.value)}
                                    >
                                        {courses.map((course, index) => <MenuItem value={course._id} key={index}>{`${course.name} (${course.description})`}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleClick}>Generate ticket</Button>
                    </form>
                </Paper>
            </div> :
            <Redirect to='/' />
    )
}

export default StudentForm;
