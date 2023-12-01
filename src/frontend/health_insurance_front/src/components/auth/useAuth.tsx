import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [jwtToken, setJwtToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        const role = localStorage.getItem('userRole');

        if (token && role) {
            setJwtToken( token);
            setUserRole(role);
            setAuthenticated(true);
        } else {
            setJwtToken('');
            setUserRole('');
            setAuthenticated(false);
        }
    }, []);

    const authenticateUser = (token, role) => {
        localStorage.setItem('jwt', token);
        localStorage.setItem('userRole', role);
        setJwtToken(token);
        setUserRole(role);
        setAuthenticated(true);
    };

    const logout = () => {
        sessionStorage.clear()
        localStorage.clear();
        setJwtToken('');
        setUserRole('');
        setAuthenticated(false);
        window.location.replace('/')
    };

    return { isAuthenticated, userRole, jwtToken, authenticateUser, logout };
};

export default useAuth;






