import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, Typography, Paper, Box, MenuItem, TextField } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useStyles from './styles';

import { getUsers, deleteUser, modifyUser, getUsersActivities } from '../../../../actions/adminActions';

import Navbar from '../../../Navbar/Navbar';

const ModifySystemUsers = () => {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const verify = () => {
        return JSON.parse(localStorage.getItem('profile'));
    }

    const users = useSelector((state) => state.admin.users);

    const [selectedUserToDelete, setSelectedUserToDelete] = useState('');

    const [selectedUserToModify, setSelectedUserToModify] = useState('');

    const [newUserName, setNewUserName] = useState('');
    const [newEmail, setNewEmail] = useState('');

    useEffect(() => {
        if (verify()?.result.role === 'admin') {
            dispatch(getUsers());
        }
    }, [dispatch]);

    const handleDeleteClick = () => {
        dispatch(deleteUser(selectedUserToDelete._id));
    }

    const handleModifyClick = () => {
        const userID = selectedUserToModify._id;
        const newUserData = { newUserName, newEmail };
        dispatch(modifyUser(userID, newUserData));
    }

    const handleGetUserActivityDataClick = async () => {
        const activities = await dispatch(getUsersActivities());
        history.push('/admin/activities', activities);
    }

    return (
        verify()?.result.role === 'admin' ?
            <div>
                <Navbar />
                <Paper className={classes.paper} elevation={6}>
                    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e) => { e.preventDefault() }}>
                        <Typography variant="h6">Видалення користувача : </Typography>
                        <Grid item xs={12} className={classes.grid}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="label">Користувач</InputLabel>
                                    <Select
                                        name="Користувач"
                                        labelId="label"
                                        id="simple-select"
                                        value={selectedUserToDelete}
                                        label="Користувач"
                                        required
                                        onChange={(e) => setSelectedUserToDelete(e.target.value)}
                                    >
                                        {users.map((user, index) => <MenuItem value={user} key={index}>{`${user.name} (${user.email})`}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="large" type="submit" fullWidth onClick={handleDeleteClick}>Видалити</Button>
                    </form>
                </Paper>
                <Paper className={classes.paper} elevation={6}>
                    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e) => { e.preventDefault() }}>
                        <Typography variant="h6">Модифікування користувача : </Typography>
                        <Grid item xs={12} className={classes.grid}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="label">Користувач</InputLabel>
                                    <Select
                                        name="Користувач"
                                        labelId="label"
                                        id="simple-select"
                                        value={selectedUserToModify}
                                        label="Користувач"
                                        required
                                        onChange={(e) => setSelectedUserToModify(e.target.value)}
                                    >
                                        {users.map((user, index) => <MenuItem value={user} key={index}>{`${user.name} (${user.email})`}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        {selectedUserToModify !== '' && (<>
                            <TextField className={classes.textField} name="userName" variant="outlined" label="Ім'я та прізвище користувача" fullWidth value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
                            <TextField className={classes.textField} name="userName" variant="outlined" label="Електронна пошта" fullWidth value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                        </>)}
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleModifyClick}>Модифікувати</Button>
                    </form>
                </Paper>
                <Paper className={classes.paper} elevation={6}>
                    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e) => { e.preventDefault() }}>
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleGetUserActivityDataClick}>Отримати  log file</Button>
                    </form>
                </Paper>
            </div>







            : <Redirect to='/' />
    );
}


export default ModifySystemUsers;