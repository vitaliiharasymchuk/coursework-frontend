import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import useStyles from './styles';

import { getCourses } from '../../../../actions/adminActions';

const CoursesList = () => {

    const dispatch = useDispatch();
    const classes = useStyles();

    const { courses } = useSelector((state) => state.admin);

    console.log(courses);



    return (
        <Grid item xs={12} md={6} className={classes.grid}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Existing courses :
            </Typography>
            <List dense={false}>
                {courses.map((course, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={`Name : ${course.name} (students : ${course.students.length}, questions : ${course.questions.length})`}
                            secondary={`Description : ${course.description}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Grid >
    )
}

export default CoursesList
