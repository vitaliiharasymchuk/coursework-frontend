import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from '../../../Navbar/Navbar';
import { getCourses, getStudents } from '../../../../actions/adminActions';
import Form from './Form/Form';

const AddStudentsToCourses = () => {

    const dispatch = useDispatch();

    const verify = () => {
        return JSON.parse(localStorage.getItem('profile'));
    }

    useEffect(() => {
        dispatch(getCourses());
        dispatch(getStudents());
    }, [dispatch]);

    return (
        verify()?.result.role === 'admin' ?
            <div>
                <Navbar />
                <Form />
            </div>

            : <Redirect to='/' />
    )
}

export default AddStudentsToCourses;
