import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';

const Navbar = () => {

    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const handleClick = () => {
        history.push('/' + user.result.role);
    }

    // const logout = () => {
    //     dispatch({ type: 'LOGOUT' });
    //     history.push('/');
    //     setUser(null);
    // }

    const memoizedLogout = useCallback(
        () => {
            dispatch({ type: 'LOGOUT' });
            history.push('/');
            setUser(null);
        }, [dispatch, history],
    );

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                memoizedLogout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location, memoizedLogout, user])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Button onClick={handleClick}><Typography className={classes.userRoleTitle} variant="h6">{(user.result.role === 'admin' ? 'Сторінка адміністратора' : user.result.role === 'student' ? 'Сторінка студента' : user.result.role === 'teacher' ? 'Сторінка викладача' : '').toUpperCase()}</Typography></Button>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={memoizedLogout}>Вийти</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                )}
            </Toolbar>
        </AppBar >
    );
}

export default Navbar;
