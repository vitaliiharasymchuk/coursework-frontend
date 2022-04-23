import { FETCH_USERS, DELETE_USER, FETCH_STUDENTS, FETCH_COURSES, CREATE_COURSE } from "../constants/actionTypes";

const adminReducer = (state = { users: [], students: [], courses: [] }, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return { ...state, users: action.payload.users };
        case DELETE_USER:
            return { ...state, users: state.users.filter((user) => user._id !== action.payload) };
        case FETCH_STUDENTS:
            return { ...state, students: action.payload.students };
        case FETCH_COURSES:
            return { ...state, courses: action.payload.courses };
        case CREATE_COURSE:
            return { ...state, courses: [...state.courses, action.payload] };
        default:
            return state;
    }
}

export default adminReducer;