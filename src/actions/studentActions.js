import * as api from '../api/index.js';
import { FETCH_COURSES, GENERATE_TICKET } from '../constants/actionTypes.js';

export const getCourses = () => async (dispatch) => {
    try {
        const { data } = await api.getCourses();
        dispatch({ type: FETCH_COURSES, payload: { courses: data } });
    }
    catch (error) {
        console.log(error.message);
    }
}

export const generateTicket = (course_id) => async (dispatch) => {
    try {

        const { data } = await api.generateTicket(course_id);

        console.log(data);

        dispatch({ type: GENERATE_TICKET, payload: data });

    } catch (error) {
        console.log(error.message);
    }
}