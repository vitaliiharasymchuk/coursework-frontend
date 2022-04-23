import { FETCH_COURSES, GENERATE_TICKET } from "../constants/actionTypes";

const studentReducer = (state = { courses: [], generatedTicket: {} }, action) => {
    switch (action.type) {
        case FETCH_COURSES:
            return { ...state, courses: action.payload.courses };
        case GENERATE_TICKET:
            return { ...state, generatedTicket: action.payload };
        default:
            return state;
    }
}

export default studentReducer;