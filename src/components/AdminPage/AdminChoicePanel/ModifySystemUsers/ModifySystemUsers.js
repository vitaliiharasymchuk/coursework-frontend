import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';

import { getUsers } from '../../../../actions/adminActions';

import Navbar from '../../../Navbar/Navbar';

const ModifySystemUsers = () => {

    const verify = () => {
        return JSON.parse(localStorage.getItem('profile'));
    }

    const dispatch = useDispatch();

    const users = useSelector((state) => state.admin.users);

    console.log(users);

    useEffect(() => {
        if (verify()?.result.role === 'admin') {
            dispatch(getUsers());
        }
    }, []);



    return (
        verify()?.result.role === 'admin' ?
            <div>
                <Navbar />
                {users.map(user =>
                (<Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <List >
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`User name : ${user.name}`}
                                    secondary={`Email : ${user.email} Role : ${user.role}`}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>)
                )}
            </div>







            : <Redirect to='/' />
    );
}


export default ModifySystemUsers;