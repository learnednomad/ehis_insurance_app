import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';


type User = {
    username: string;
    password: string;
};

function Login() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    });


    const { isAuthenticated, authenticateUser, userRole } = useAuth(); // Get the authenticateUser function from useAuth

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };


    const handleLogin = () => {
        axios.post(import.meta.env.VITE_API_URL + 'auth/login', user, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                const jwtToken = 'Bearer ' + res.data.access_token;
                const c_id = res.data.id;
                const rt = res.data.role;
                if (jwtToken) {
                    sessionStorage.setItem('jwt', jwtToken);
                    localStorage.setItem('jwt', jwtToken);
                    localStorage.setItem('user_id', c_id.toString());
                    localStorage.setItem('userRole', rt);
                    sessionStorage.setItem('userRole', rt);
                    sessionStorage.setItem('render', 'rt');

                    authenticateUser(jwtToken, rt); // Call the authenticateUser function

                    if (rt === 'ADMIN') {
                        window.location.replace(
                            "/dashboard",
                        );
                        // setTimeout(() => navigate('/dashboard'), 100); // Wrap navigate inside a setTimeout
                    } else if (rt === 'CLIENT') {

                        // Navigate to the Location.reload article by replacing this page
                        window.location.replace(
                            "/cvisits",
                        );

                        // setTimeout(() => navigate('/cvisits'), 100); // Wrap navigate inside a setTimeout
                    } else {
                        window.location.replace(
                            "/hdash",
                        );
                        // setTimeout(() => navigate('/hdash'), 100); // Wrap navigate inside a setTimeout
                    }
                }
            })
            .catch(() => setOpen(true));
    };



        return (
            <Stack spacing={2} alignItems="center" mt={2} my={4}>
                <TextField
                    name="username"
                    label="Username"
                    onChange={handleChange}
                />
                <TextField
                    type="password"
                    name="password"
                    label="Password"
                    onChange={handleChange}
                />
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleLogin}
                >
                    Login
                </Button>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message="Login failed: Check your username and password"
                />
            </Stack>
        );


}

export default Login;
