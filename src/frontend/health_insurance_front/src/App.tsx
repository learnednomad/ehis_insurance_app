import CssBaseline from '@mui/joy/CssBaseline';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useAuth from './components/auth/useAuth';
import VisitList from "./components/visit/VisitList.tsx";
import ClientList from "./components/client/ClientList.tsx";
import ProviderList from "./components/provider/ProviderList.tsx";
import Login from "./components/auth/Login.tsx";
import HospitalList from "./components/hospital/HospitalList.tsx";
import ClaimsList from "./components/claims/ClaimsList.tsx";
import ClientVisits from "./components/client/ClientVisits.tsx";
import HospitalVisitList from "./components/hospitalVisit/HospitalVisitList.tsx";
import HospitalDashboardView from "./components/HospitalDashboardView.tsx";
import LandingMainEvervault from "./components/LandingPage.tsx";
import BasicCard from "./components/DashboardView.tsx";
import NavHeadSimple from "./components/Header.tsx";


const queryClient = new QueryClient();

function App() {

    const { isAuthenticated, userRole} = useAuth();



    return (
        <Container maxWidth="xl">
            <CssBaseline />

             <AppBar position="sticky"   >
                    {/* Pass userRole to the Header component */}
                 {(isAuthenticated)&&      <NavHeadSimple />}

             </AppBar>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <div>
                        <div className="container" >
                            <Routes  >
                                {/* Your routes */}
                                <Route path="/login" element={<Login />} />
                                {userRole === 'ADMIN' && (
                                    <>
                                        <Route path="/visits" element={<VisitList />} />
                                        <Route path="/client" element={<ClientList />} />
                                        <Route path="/provider" element={<ProviderList />} />
                                        <Route path="/hospital" element={<HospitalList />} />
                                        <Route path="/dashboard" element={<BasicCard />} />
                                        <Route path="/claims" element={<ClaimsList />} />
                                    </>
                                )}
                                {userRole === 'CLIENT' && (
                                    <>
                                        <Route path="/cvisits" element={<ClientVisits />} />
                                        {/* Add more CLIENT routes if needed */}
                                    </>
                                )}
                                {userRole === 'HOSPITAL' && (
                                    <>
                                        <Route path="/hvisits" element={<HospitalVisitList />} />
                                        <Route path="/hdash" element={<HospitalDashboardView />} />
                                        {/* Add more HOSPITAL routes if needed */}
                                    </>
                                )}
                                {/* Other routes */}
                                <Route path="/" element={<LandingMainEvervault />} />
                                {/* Handle unauthorized access */}
                                {/*{!isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />}*/}
                            </Routes>
                        </div>
                    </div>
                </Router>
            </QueryClientProvider>
        </Container>
    );
}
export default App;
