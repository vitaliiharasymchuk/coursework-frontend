import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Paper, TextField, Box, MenuItem } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCourses, addQuestion, deleteQuestion } from '../../../actions/teacherActions';

import useStyles from './styles';

const TeacherForm = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [selectedCourse, setSelectedCourse] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [answers, setAnswers] = useState({ A: '', B: '', C: '', D: '' });
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('');

    const [selectedCourseToDeleteQuestion, setSelectedCourseToDeleteQuestion] = useState({});
    const [questionToDelete, setQuestionToDelete] = useState('');


    const verify = () => {
        return JSON.parse(localStorage.getItem('profile'));
    }

    const { courses } = useSelector((state) => state.teacher);

    useEffect(() => {
        dispatch(getCourses());
    }, [dispatch]);


    const handleClick = async () => {
        setQuestionText('');
        setAnswers({ A: '', B: '', C: '', D: '' });
        setCorrectAnswer('');
        setDifficultyLevel('');
        await dispatch(addQuestion(selectedCourse, { questionText, answers, correctAnswer, difficultyLevel }));
        dispatch(getCourses());
    }

    const handleDeleteClick = async () => {
        setQuestionToDelete('');
        setSelectedCourseToDeleteQuestion('');
        await dispatch(deleteQuestion(selectedCourseToDeleteQuestion._id, questionToDelete.questionText));
        dispatch(getCourses());
    }


    return (
        verify()?.result.role === 'teacher' ?
            <div>
                <Paper className={classes.paper} elevation={6}>
                    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e) => { e.preventDefault() }}>
                        <Typography variant="h6">Створити тестове питання : </Typography>
                        <Grid item xs={12} className={classes.grid}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="label">Курс</InputLabel>
                                    <Select
                                        name="course"
                                        labelId="label"
                                        id="simple-select"
                                        value={selectedCourse}
                                        label="Cour"
                                        required
                                        onChange={(e) => setSelectedCourse(e.target.value)}
                                    >
                                        {courses.map((course, index) => <MenuItem value={course._id} key={index}>{`${course.name} (${course.description})`}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <TextField className={classes.textField} name="question" variant="outlined" label="Запитання" fullWidth value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
                        <TextField className={classes.textField} name="a-answer" variant="outlined" label="Відповідь А" fullWidth value={answers.A} onChange={(e) => setAnswers({ ...answers, A: e.target.value })} />
                        <TextField className={classes.textField} name="b-answer" variant="outlined" label="Відповідь Б" fullWidth value={answers.B} onChange={(e) => setAnswers({ ...answers, B: e.target.value })} />
                        <TextField className={classes.textField} name="c-answer" variant="outlined" label="Відповідь В" fullWidth value={answers.C} onChange={(e) => setAnswers({ ...answers, C: e.target.value })} />
                        <TextField className={classes.textField} name="d-answer" variant="outlined" label="Відповідь Г" fullWidth value={answers.D} onChange={(e) => setAnswers({ ...answers, D: e.target.value })} />
                        <Grid item xs={12} className={classes.grid1}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="label">Правильна відповідь</InputLabel>
                                    <Select
                                        name="correctAnswer"
                                        labelId="label"
                                        id="simple-select"
                                        value={correctAnswer}
                                        label="Правильна відповідь"
                                        required
                                        onChange={(e) => setCorrectAnswer(e.target.value)}
                                    >
                                        {Object.entries(answers).map((entry, index) => <MenuItem value={entry[0]} key={index}>{`${entry[1]}`}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} className={classes.grid1}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="label">Рівень складності</InputLabel>
                                    <Select
                                        name="difficultyLevel"
                                        labelId="label"
                                        id="simple-select"
                                        value={difficultyLevel}
                                        label="Рівень складності"
                                        required
                                        onChange={(e) => setDifficultyLevel(e.target.value)}
                                    >
                                        {[1, 2, 3, 4].map((level, index) => <MenuItem value={level} key={index}>{`${level}`}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleClick}>Додати тестове запитання</Button>
                    </form>
                </Paper>
                <Paper className={classes.paper} elevation={6}>
                    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e) => { e.preventDefault() }}>
                        <Typography variant="h6">Видалення запитання : </Typography>
                        <Grid item xs={12} className={classes.grid}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="label">Курс</InputLabel>
                                    <Select
                                        name="course"
                                        labelId="label"
                                        id="simple-select"
                                        value={selectedCourseToDeleteQuestion.name}
                                        label="Cour"
                                        required
                                        onChange={(e) => setSelectedCourseToDeleteQuestion(e.target.value)}
                                    >
                                        {courses.map((course, index) => <MenuItem value={course} key={index}>{`${course.name} (${course.description})`}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        {selectedCourseToDeleteQuestion.questions && (<Grid item xs={12} className={classes.grid1}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="label">Запитання</InputLabel>
                                    <Select
                                        name="Question"
                                        labelId="label"
                                        id="simple-select"
                                        value={questionToDelete}
                                        label="Запитання"
                                        required
                                        onChange={(e) => setQuestionToDelete(e.target.value)}
                                    >
                                        {selectedCourseToDeleteQuestion?.questions?.map((el) => <MenuItem value={el}>{el.questionText}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>)}
                        <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="large" type="submit" fullWidth onClick={handleDeleteClick}>Видалити запитання</Button>
                    </form>
                </Paper>
            </div > :
            <Redirect to='/' />
    )
}

export default TeacherForm
