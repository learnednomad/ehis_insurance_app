// import Link from "@mui/joy/Link";
// import List from "@mui/joy/List";
// import ListItem from "@mui/joy/ListItem";
// import ListItemButton from "@mui/joy/ListItemButton";
// import Sheet from "@mui/joy/Sheet";
// // import ListDivider from "@mui/joy/ListDivider";
// import {Logout} from "@mui/icons-material";
// import useAuth from "./auth/useAuth.tsx";
// import {useEffect, useState} from "react";
//
// export default function NavHeadSimple() {
//
//     const isAuthenticated = useAuth();
//
//     const handleLogout = () => {
//         sessionStorage.setItem("jwt", "");
//         localStorage.setItem("jwt", "");
//         localStorage.clear();
//         sessionStorage.clear();
//     }
//
//     // State to hold the user's role
//     const [userRole, setUserRole] = useState('');
//
//
//     useEffect(() => {
//
//         // Retrieve user role from localStorage
//         const role = localStorage.getItem('userRole');
//
//         setUserRole(role || ''); // Set the user's role in state
//     }, []);
//
//
//     return (
//
//           <Sheet sx={{ boxShadow: "lg", p: 3 }}  >
//               {( isAuthenticated) && (
//             <nav>
//                 <List
//                     orientation="horizontal"
//                     sx={{
//                         gap: 2,
//                         "& a": {
//                             borderRadius: 40,
//                             textDecorationColor: (theme) => theme.vars.palette.divider,
//                         },
//
//                         justifyContent: 'flex-end',
//                     }}>
//
//                     {userRole === 'ADMIN' && (  <ListItem >
//                         <ListItemButton component={Link} href="/dashboard">
//                             Home
//                         </ListItemButton>
//                     </ListItem> )}
//
//
//                     {userRole === 'ADMIN' && (    <ListItem>
//                         <ListItemButton component={Link} href="/visits">
//                             Visits
//                         </ListItemButton>
//                     </ListItem> )}
//
//                     {userRole === 'ADMIN' && (   <ListItem>
//                         <ListItemButton component={Link} href="/client">
//                             Clients
//                         </ListItemButton>
//                     </ListItem>)}
//
//                     {userRole === 'ADMIN' && (  <ListItem>
//                         <ListItemButton component={Link} href="/provider">
//                             Providers
//                         </ListItemButton>
//                     </ListItem> )}
//
//                     {userRole === 'ADMIN' && (   <ListItem>
//                         <ListItemButton  component={Link} href="/hospital">
//                             Hospitals
//                         </ListItemButton>
//                     </ListItem> )}
//
//                     {userRole === 'ADMIN' && (   <ListItem>
//                         <ListItemButton  role="menuitem" aria-label="Claims" component={Link} href="/claims">
//                             Claims
//                         </ListItemButton>
//                     </ListItem> )}
//
//                     {userRole === 'HOSPITAL' && (   <ListItem>
//                         <ListItemButton  component={Link} href="/hvisits">
//                             Visits
//                         </ListItemButton>
//                     </ListItem> )}
//
//                     {userRole === 'HOSPITAL' && (   <ListItem>
//                         <ListItemButton  role="menuitem" aria-label="Claims" component={Link} href="/hclaims">
//                             Claims
//                         </ListItemButton>
//                     </ListItem> )}
//
//                     {userRole === 'CLIENT' && ( <ListItem>
//                         <ListItemButton  role="menuitem" aria-label="Claims" component={Link} href="/cvisits">
//                             Client Visits
//                         </ListItemButton>
//                     </ListItem>)}
//
//                     <ListItem>
//                         <ListItemButton  onClick={handleLogout} role="menuitem" aria-label="Logout" component={Link} href="/">
//                             <Logout />
//                             Logout
//                         </ListItemButton>
//                     </ListItem>
//                 </List>
//             </nav>
//
//               ) }
//         </Sheet>
//     );
// }

import Link from "@mui/joy/Link";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Sheet from "@mui/joy/Sheet";
import { Logout } from "@mui/icons-material";
import useAuth from "./auth/useAuth.tsx";
// import {useEffect, useState} from "react";



export default function NavHeadSimple() {
    const { isAuthenticated,logout,userRole } = useAuth();


    const handleLogout = () => {
        logout()
    };

    return (
        <Sheet sx={{ boxShadow: "lg", p: 3 }} >
            {isAuthenticated && (
                <nav>
                    <List
                        orientation="horizontal"
                        sx={{
                            gap: 2,
                            "& a": {
                                borderRadius: 40,
                                textDecorationColor: (theme) => theme.vars.palette.divider,
                            },
                            justifyContent: 'flex-end',
                        }}>

                        {userRole === 'ADMIN' && (
                            <>
                                <ListItem>
                                    <ListItemButton component={Link} href="/dashboard">
                                        Home
                                    </ListItemButton>
                                </ListItem>

                                <ListItem>
                                    <ListItemButton component={Link} href="/visits">
                                        Visits
                                    </ListItemButton>
                                </ListItem>

                                <ListItem>
                                    <ListItemButton component={Link} href="/client">
                                        Clients
                                    </ListItemButton>
                                </ListItem>

                                <ListItem>
                                    <ListItemButton component={Link} href="/provider">
                                        Providers
                                    </ListItemButton>
                                </ListItem>

                                <ListItem>
                                    <ListItemButton component={Link} href="/hospital">
                                        Hospitals
                                    </ListItemButton>
                                </ListItem>

                                <ListItem>
                                    <ListItemButton role="menuitem" aria-label="Claims" component={Link} href="/claims">
                                        Claims
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}

                        {userRole === 'HOSPITAL' && (
                            <>
                                <ListItem>
                                    <ListItemButton component={Link} href="/hvisits">
                                        Visits
                                    </ListItemButton>
                                </ListItem>

                                <ListItem>
                                    <ListItemButton role="menuitem" aria-label="Claims" component={Link} href="/hclaims">
                                        Claims
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}

                        {userRole === 'CLIENT' && (
                            <ListItem>
                                <ListItemButton role="menuitem" aria-label="Claims" component={Link} href="/cvisits">
                                    Client Visits
                                </ListItemButton>
                            </ListItem>
                        )}

                        <ListItem>
                            <ListItemButton onClick={handleLogout} role="menuitem" aria-label="Logout" component={Link} >
                                <Logout />
                                Logout
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            )}
        </Sheet>
    );
}
