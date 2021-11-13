import React from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import AdminChoicePanel from './AdminChoicePanel/AdminChoicePanel';

const AdminPage = () => {

    const verify = () => {
        return JSON.parse(localStorage.getItem('profile'));
    }

    return (
        verify()?.result.role === 'admin' ? <div>
            <Navbar />
            <AdminChoicePanel />
        </div> : <Redirect to='/' />
    );
}

export default AdminPage;
