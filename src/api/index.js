import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile') ?? '{}').token}`;
    }

    return req;
});

//AUTH API
export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);


//ADMIN API
export const getUsers = () => API.get('/admin/users');
export const getCourses = () => API.get('/courses');
export const createCourse = (newCourse) => API.post('/courses', newCourse);
export const connectStudentToCourse = (student_id, course_id) => API.patch(`/courses/${course_id}/connectStudent`, { student_id });


//TEACHER API
export const addQuestion = (course_id, questionObj) => API.patch(`/courses/${course_id}/addQuestion`, questionObj);

//STUDENT API
export const generateTicket = (course_id) => API.get(`/courses/${course_id}/generateTicket`);