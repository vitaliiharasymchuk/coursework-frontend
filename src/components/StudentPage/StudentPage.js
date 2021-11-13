import React from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import StudentsForm from './StudentForm/StudentForm';

const StudentPage = () => {

    const verify = () => {
        return JSON.parse(localStorage.getItem('profile'));
    }

    return (
        verify()?.result.role === 'student' ?
            <div>
                <Navbar />
                <StudentsForm />
            </div>














            : <Redirect to='/' />
    );
}

export default StudentPage;
