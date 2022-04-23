import * as api from '../api/index.js';
import { FETCH_USERS, DELETE_USER, FETCH_COURSES, FETCH_STUDENTS, CREATE_COURSE, CONNECT_STUDENT_TO_COURSE } from '../constants/actionTypes.js';

export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getUsers();
        dispatch({ type: FETCH_USERS, payload: { users: data } });
    } catch (error) {
        console.log(error.message);
    }
}

export const getUsersActivities = () => async (dispatch) => {
    try {
        const { data } = await api.getUsersActivities();
        //dispatch({ type: FETCH_USERS, payload: { users: data } });
        return data;
    } catch (error) {
        console.log(error.message);
    }
}


export const deleteUser = (id) => async (dispatch) => {
    try {
        await api.deleteUser(id);

        dispatch({ type: DELETE_USER, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}

export const modifyUser = (id, newData) => async (dispatch) => {
    try {
        await api.modifyUser(id, newData);
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

export const getStudent = (student_id, course_id) => async (dispatch) => {
    try {
        let { data } = await api.getStudent(student_id);
        return data;
        //dispatch({ type: CHANGE_COURSES_DATA, payload: { course_id, student_id, data } });
    } catch (error) {
        console.log(error.message);
    }
}

export const getStudentsFromCourse = (course_id) => async (dispatch) => {
    try {
        await api.getStudentsFromCourse(course_id);
        
        //let { data } = await api.getStudentsFromCourse(course_id);
        //data = data.filter(user => user.role === 'student');
        //dispatch({ type: FETCH_STUDENTS, payload: { students: data } });
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
        dispatch({ type: CREATE_COURSE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const connectStudentToCourse = (student_id, course_id) => async (dispatch) => {
    try {
        const { data } = await api.connectStudentToCourse(student_id, course_id);
        dispatch({ type: CONNECT_STUDENT_TO_COURSE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}