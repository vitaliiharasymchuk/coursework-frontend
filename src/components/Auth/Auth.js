import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, Select, MenuItem, InputLabel, Box, FormControl } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { signin, signup } from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', role: '', confirmPassword: '' };

const Auth = () => {

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const [error, setError] = useState('');

    const handleShowPassword = () => {
        setShowPassword((prevShowPassport) => !prevShowPassport);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignup) {
            setError(await dispatch(signup(formData, history)));
            console.log(error);
        } else {
            setError(await dispatch(signin(formData, history)));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    };




    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Зареєструватись' : 'Увійти'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="Прізвище" handleChange={handleChange} autoFocus half error='' />
                                <Input name="lastName" label="Ім'я" handleChange={handleChange} half error='' />
                                <Grid item xs={12} >
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Роль</InputLabel>
                                            <Select
                                                name="role"
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={formData.role}
                                                label="Role"
                                                required
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="student">Студент</MenuItem>
                                                <MenuItem value="teacher">Викладач</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                            </>
                        )}
                        <Input name="email" label="Електронна пошта" handleChange={handleChange} type="email" error={error === "User doesn't exist." ? error : ''} />
                        <Input name="password" label="Пароль" handleChange={handleChange} type={showPassword ? "text" : "password"} error={error === "Invalid credentials." ? error : ''} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Повторіть пароль" handleChange={handleChange} type="password" error={error === "Passwords don't match." ? error : ''} />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Зареєструватись' : 'Увійти'}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "У вас вже є акаунт? Увійти" : "Ще не маєте акаунта? Зареєструватись"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;