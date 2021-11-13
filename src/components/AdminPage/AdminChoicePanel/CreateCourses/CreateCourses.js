import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from '../../../Navbar/Navbar';
import Form from './Form/Form';
import CoursesList from '../CoursesList/CoursesList';
import { getCourses } from '../../../../actions/adminActions';


const CreateCourses = () => {

    const dispatch = useDispatch();

    const verify = () => {
        return JSON.parse(localStorage.getItem('profile'));
    }

    useEffect(() => {
        dispatch(getCourses());
    }, [dispatch]);

    return (
        verify()?.result.role === 'admin' ?
            <div>
                <Navbar />
                <Form />
                <CoursesList />
            </div>

            : <Redirect to='/' />
    )
}

export default CreateCourses
