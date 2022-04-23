import React, { useState, useEffect } from 'react';
import { Grid, Box, MenuItem, Paper, Button, Typography } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, getStudents, connectStudentToCourse } from '../../../../../actions/adminActions';

const Form = () => {

    const verify = () => {
        return JSON.parse(localStorage.getItem(''));
    }

    const classes = useStyles();
    const dispatch = useDispatch();

    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    const { students, courses } = useSelector((state) => state.admin);


    useEffect(() => {
        if (verify()?.result.role === 'admin') {
            dispatch(getStudents());
            dispatch(getCourses());
        }
    }, [dispatch]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(connectStudentToCourse(selectedStudent, selectedCourse));
    }

    const clear = () => {
        setSelectedStudent('');
        setSelectedCourse('');
    }

    return (
        <div>
            <Paper className={classes.paper} elevation={6}>
                <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6">Підключити студента до курсу : </Typography>
                    <Grid item xs={12} >
                        <Box sx={{ minWidth: 120 }} className={classes.box}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Студент</InputLabel>
                                <Select
                                    name="student"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedStudent}
                                    label="Student"
                                    required
                                    onChange={(e) => setSelectedStudent(e.target.value)}
                                >
                                    {students.map((student, index) => (
                                        <MenuItem value={student._id} key={index}>{`${student.name} (${student.email})`}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120 }} className={classes.box}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Курс</InputLabel>
                                <Select sx={{ minWidth: 120 }}
                                    name="course"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedCourse}
                                    label="Course"
                                    required
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                >
                                    {courses.map((course, index) => (
                                        <MenuItem value={course._id} key={index}>{`${course.name} (${course.description})`}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" size="large" className={classes.button}>
                        Підключити студента до курсу
                    </Button>
                    <Button variant="contained" color="secondary" size="large" onClick={clear} fullWidth className={classes.button}>Очистити поля вводу</Button>
                </form>
            </Paper>
        </div>
    )
}

export default Form
