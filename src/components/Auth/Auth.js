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
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half error='' />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half error='' />
                                <Grid item xs={12} >
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                            <Select
                                                name="role"
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={formData.role}
                                                label="Role"
                                                required
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="student">Student</MenuItem>
                                                <MenuItem value="teacher">Teacher</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" error={error === "User doesn't exist." ? error : ''} />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} error={error === "Invalid credentials." ? error : ''} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" error={error === "Passwords don't match." ? error : ''} />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;