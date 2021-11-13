import * as api from '../api/index.js';
import { FETCH_USERS, FETCH_COURSES, FETCH_STUDENTS, CREATE_COURSE, CONNECT_STUDENT_TO_COURSE } from '../constants/actionTypes.js';

export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getUsers();
        dispatch({ type: FETCH_USERS, payload: { users: data } });
    } catch (error) {
        console.log(error.message);
    }
}

export const getStudents = () => async (dispatch) => {
    try {
        let { data } = await api.getUsers();
        data = data.filter(user => user.role === 'student');
        dispatch({ type: FETCH_STUDENTS, payload: { students: data } });
    } catch (error) {
        console.log(error.message);
    }
}

export const getCourses = () => async (dispatch) => {
    try {
        const { data } = await api.getCourses();
        dispatch({ type: FETCH_COURSES, payload: { courses: data } });
    }
    catch (error) {
        console.log(error.message);
    }
}


export const createCourse = (course) => async (dispatch) => {
    try {

        const { data } = await api.createCourse(course);

        console.log(data);

        dispatch({ type: CREATE_COURSE, payload: data });

    } catch (error) {
        console.log(error.message);
    }
}

export const connectStudentToCourse = (student_id, course_id) => async (dispatch) => {
    try {
        const { data } = await api.connectStudentToCourse(student_id, course_id);

        console.log(data);

        dispatch({ type: CONNECT_STUDENT_TO_COURSE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}