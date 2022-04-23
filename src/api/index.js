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
export const getUsersActivities = () => API.get('/admin/activities');
export const getCourses = () => API.get('/courses');
export const createCourse = (newCourse) => API.post('/courses', newCourse);
export const connectStudentToCourse = (student_id, course_id) => API.patch(`/courses/${course_id}/connectStudent`, { student_id });
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);
export const modifyUser = (id, newData) => API.patch(`/admin/users/${id}/modifyUser`, newData);
export const getStudentsFromCourse = () => API.get('/courses/getCoursesWithStudents');
export const getStudent = (id) => API.get(`/admin/users/${id}`);

//TEACHER API
export const addQuestion = (course_id, questionObj) => API.patch(`/courses/${course_id}/addQuestion`, questionObj);
export const deleteQuestion = (course_id, question_text) => API.patch(`/courses/${course_id}/deleteQuestion`, { question_text });

//STUDENT API
export const generateTicket = (course_id, user_id) => API.get(`/courses/${course_id}/generateTicket`, { user_id });