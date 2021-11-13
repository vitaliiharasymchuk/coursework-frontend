import React from "react";

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import StudentPage from './components/StudentPage/StudentPage';
import TeacherPage from './components/TeacherPage/TeacherPage';
import AdminPage from './components/AdminPage/AdminPage';
import ModifySystemUsers from "./components/AdminPage/AdminChoicePanel/ModifySystemUsers/ModifySystemUsers";
import CreateCourses from "./components/AdminPage/AdminChoicePanel/CreateCourses/CreateCourses";
import AddStudentsToCourses from "./components/AdminPage/AdminChoicePanel/AddStudentsToCourses/AddStudentsToCourses";


const App = () => {

    function checkUserInLocalStorage() {
        return JSON.parse(localStorage.getItem('profile'));
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={() => <Redirect to="/auth" />} />
                <Route path="/auth" exact component={() => (!checkUserInLocalStorage() ? <Auth /> : <Redirect to={`/${checkUserInLocalStorage().result.role}`} />)} />
                <Route path="/student" exact component={StudentPage} />
                <Route path="/teacher" exact component={TeacherPage} />
                <Route path="/teacher/adding_questions" exact component={TeacherPage} />
                <Route path="/admin" exact component={AdminPage} />
                <Route path="/admin/modify_system_users" exact component={ModifySystemUsers} />
                <Route path="/admin/create_courses" exact component={CreateCourses} />
                <Route path="/admin/add_students_to_courses" exact component={AddStudentsToCourses} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;