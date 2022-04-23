import { FETCH_COURSES, } from "../constants/actionTypes";

const teacherReducer = (state = { courses: [] }, action) => {
    switch (action.type) {
        case FETCH_COURSES:
            return { ...state, courses: action.payload.courses };
        default:
            return state;
    }
}

export default teacherReducer;