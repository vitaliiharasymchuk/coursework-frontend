import React from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import TeacherForm from './TeacherForm/TeacherForm';

const TeacherPage = () => {

    const verify = () => {
        return JSON.parse(localStorage.getItem('profile'));
    }

    

    return (
        verify()?.result.role === 'teacher' ?
            <div>
                <Navbar />
                <TeacherForm />
            </div>








            : <Redirect to='/' />
    );
}

export default TeacherPage;
