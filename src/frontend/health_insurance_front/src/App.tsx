import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ClientList from "./components/clients/ClientList";
import ProviderList from "./components/providers/ProviderList";
import HospList from "./components/hospitals/HospList";
import ClaimsList from "./components/claims/ClaimsList";
import Login from "./components/Login";
import registerClient from "./components/clients/RegisterClient";
import Grid from "@mui/material/Grid";
import DashboardIcon from "@mui/icons-material/Dashboard";
import React, {useState} from "react";
import VisitList from "./components/visits/VisitList";

const queryClient = new QueryClient();


function App() {

    const [isAuthenticated, setAuth] = useState(false);

    const handleLogout = () => {
        setAuth(false);
        sessionStorage.setItem("jwt", "");
    }

    return (
        <Container maxWidth="xl">
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Health Insurance Application
                    </Typography>

                    {/*<Router>*/}
                    {/*    /!*<Button  color="inherit" href="/login" >Login</Button>*!/*/}
                    {/*    <Button color="inherit" href="/client">Clients </Button>*/}
                    {/*    <Button color="inherit" href="/provider">Providers</Button>*/}
                    {/*    <Button color="inherit" href="/hospital">Hospitals</Button>*/}
                    {/*    <Button color="inherit" href="/claims">Claims</Button>*/}
                    {/*  <Button color="inherit" href="/login" onClick={handleLogout}>Log out</Button>*/}
                    {/*</Router>*/}
                </Toolbar>
            </AppBar>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <div>
                        {/*<HeaderComponent/>*/}
                        <div className="container">
                            <Routes>
                                <Route path="/"  element={<VisitList/>} />
                                <Route path="/login"  element={<Login/>} />
                                <Route path="/client"  element={<ClientList/>} />
                                <Route path="/provider" element= {<ProviderList/>} />
                                <Route path="/hospital" element= {<HospList/>} />
                                <Route path="/claims" element={<ClaimsList/>} />
                            </Routes>
                        </div>
                        {/*<FooterComponent/>*/}
                    </div>
                </Router>

            </QueryClientProvider>
        </Container>
    );
}
export default App;