import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import useStyles from './styles';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';

const CoursesList = () => {

    const classes = useStyles();

    const { courses } = useSelector((state) => state.admin);

    const { users } = useSelector((state) => state.admin);


    return (
        <Paper className={classes.paper} elevation={6}>
            <Grid item xs={12} md={8} className={classes.grid}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" >
                    Існуючі курси :
                </Typography>
                {courses.map((course, index) => {
                    let studentsForThisCourse = [];
                    course.students.forEach((student) => {

                        const isUserInCourse = users.find(x => x._id === student);
                        if (isUserInCourse) {
                            studentsForThisCourse.push(isUserInCourse);
                        }

                    }
                    );

                    return (<Grid container spacing={2} key={index}>
                        <Grid item xs={12} md={12}>
                            <List >
                                <div>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <MenuBookIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={`${course.name} (кількість підключених студентів : ${course.students.length}, кількість тестових запитань : ${course.questions.length} )`}
                                            secondary={`${course.description}`}
                                        />
                                    </ListItem>
                                </div>
                                <div>
                                    <List >
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <PeopleIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Підключені студенти : "
                                                secondary={`${studentsForThisCourse.length !== 0 ? studentsForThisCourse.map(student => " " + student.name) : "Для даного курсу не підключено жодного студента"}`}
                                            />

                                        </ListItem>
                                    </List >
                                </div>
                            </List>
                        </Grid>
                    </Grid>)
                }
                )}
            </Grid >
        </Paper >
    )
}

export default CoursesList
