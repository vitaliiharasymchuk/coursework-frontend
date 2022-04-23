import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Grid, Button, Typography, Paper, Box, MenuItem } from '@material-ui/core';
import useStyles from './styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import { getCourses, generateTicket } from '../../../actions/studentActions';

const StudentForm = () => {


    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();


    const [selectedCourse, setSelectedCourse] = useState('');
    const [error, setError] = useState('');

    const verify = () => {
        return JSON.parse(localStorage.getItem('profile'));
    }

    const { courses } = useSelector((state) => state.student);

    useEffect(() => {
        dispatch(getCourses());
    }, [dispatch]);

    const handleClick = async () => {
        if (selectedCourse === '') {
            return;
        }
        const ticket = await dispatch(generateTicket(selectedCourse, JSON.parse(localStorage.getItem('profile')).result._id));
        if (ticket === 'You are not connected to this course') {
            setError('Ви не підключені до даного курсу');
        }
        else if (Object.keys(ticket).length === 0) {
            setError('Не вдалось згенерувати тестовий білет');
        }
        else {
            history.push('/student/generatedTicket', ticket);
        }

    }

    return (
        verify()?.result.role === 'student' ?
            <div>
                <Paper className={classes.paper} elevation={6}>
                    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e) => { e.preventDefault() }}>
                        <Typography variant="h6">Отримати згенерований тестовий білет : </Typography>
                        <Grid item xs={12} className={classes.grid}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="label" error={error !== '' ? true : false} >Курс</InputLabel>
                                    <Select
                                        name="course"
                                        labelId="label"
                                        id="simple-select"
                                        value={selectedCourse}
                                        label="Cour"
                                        required
                                        onChange={(e) => {
                                            setError('');
                                            setSelectedCourse(e.target.value);
                                        }}
                                    >
                                        {courses.map((course, index) => <MenuItem value={course._id} key={index}>{`${course.name} (${course.description})`}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        {error !== '' && (
                            <Typography className={classes.typography}>{error}</Typography>
                        )}
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleClick}>Згенерувати білет</Button>
                    </form>
                </Paper>
            </div> :
            <Redirect to='/' />
    )
}

export default StudentForm;
