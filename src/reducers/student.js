import { FETCH_COURSES, GENERATE_TICKET } from "../constants/actionTypes";

export default (state = { courses: [] }, action) => {
    switch (action.type) {
        case FETCH_COURSES:
            return { ...state, courses: action.payload.courses };
        case GENERATE_TICKET:
            return { ...state, generatedTicket: action.payload.data };
        default:
            return state;
    }

}