import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Paper, TextField, Box, MenuItem } from '@material-ui/core';
//import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
//import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCourses, addQuestion } from '../../../actions/teacherActions';

import useStyles from './styles';

const TeacherForm = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [selectedCourse, setSelectedCourse] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [answers, setAnswers] = useState({ A: '', B: '', C: '', D: '' });
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('');

    const verify = () => {
        return JSON.parse(localStorage.getItem('profile'));
    }

    const { courses } = useSelector((state) => state.teacher);

    useEffect(() => {
        dispatch(getCourses());
    }, [dispatch]);

    const handleClick = () => {
        //console.log({ selectedCourse, questionText, answers, correctAnswer, difficultyLevel });
        dispatch(addQuestion(selectedCourse, { questionText, answers, correctAnswer, difficultyLevel }));
        setSelectedCourse('');
        setQuestionText('');
        setAnswers({ A: '', B: '', C: '', D: '' });
        setCorrectAnswer('');
        setDifficultyLevel('');
    }


    return (
        verify()?.result.role === 'teacher' ?
            <div>
                <Paper className={classes.paper} elevation={6}>
                    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e) => { e.preventDefault() }}>
                        <Typography variant="h6">Creating question : </Typography>
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
                        <TextField className={classes.textField} name="question" variant="outlined" label="Question" fullWidth value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
                        <TextField className={classes.textField} name="a-answer" variant="outlined" label="A-answer" fullWidth value={answers.A} onChange={(e) => setAnswers({ ...answers, A: e.target.value })} />
                        <TextField className={classes.textField} name="b-answer" variant="outlined" label="B-answer" fullWidth value={answers.B} onChange={(e) => setAnswers({ ...answers, B: e.target.value })} />
                        <TextField className={classes.textField} name="c-answer" variant="outlined" label="C-answer" fullWidth value={answers.C} onChange={(e) => setAnswers({ ...answers, C: e.target.value })} />
                        <TextField className={classes.textField} name="d-answer" variant="outlined" label="D-answer" fullWidth value={answers.D} onChange={(e) => setAnswers({ ...answers, D: e.target.value })} />
                        <Grid item xs={12} className={classes.grid1}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="label">Correct answer</InputLabel>
                                    <Select
                                        name="correctAnswer"
                                        labelId="label"
                                        id="simple-select"
                                        value={correctAnswer}
                                        label="Correct answer"
                                        required
                                        onChange={(e) => setCorrectAnswer(e.target.value)}
                                    >
                                        {Object.entries(answers).map((entry, index) => <MenuItem value={entry[0]} key={index}>{`${entry[0]} (${entry[1]})`}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} className={classes.grid1}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="label">Level of difficulty</InputLabel>
                                    <Select
                                        name="difficultyLevel"
                                        labelId="label"
                                        id="simple-select"
                                        value={difficultyLevel}
                                        label="Level of difficulty"
                                        required
                                        onChange={(e) => setDifficultyLevel(e.target.value)}
                                    >
                                        {[1, 2, 3, 4].map((level, index) => <MenuItem value={level} key={index}>{`${level}`}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleClick}>Add question</Button>
                    </form>
                </Paper>
            </div > :
            <Redirect to='/' />
    )
}

export default TeacherForm
