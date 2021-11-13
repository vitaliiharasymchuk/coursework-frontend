import * as api from '../api/index.js';
import { FETCH_COURSES, ADD_QUESTION } from '../constants/actionTypes.js';

export const getCourses = () => async (dispatch) => {
    try {
        const { data } = await api.getCourses();
        dispatch({ type: FETCH_COURSES, payload: { courses: data } });
    }
    catch (error) {
        console.log(error.message);
    }
}

export const addQuestion = (course_id, questionObj) => async (dispatch) => {
    try {
        const { data } = await api.addQuestion(course_id, questionObj);

        console.log(data);

        dispatch({ type: ADD_QUESTION, payload: data });

    } catch (error) {
        console.log(error.message);
    }
}
