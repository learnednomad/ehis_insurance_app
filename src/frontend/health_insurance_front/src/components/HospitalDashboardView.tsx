import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import { useNavigate } from 'react-router-dom';
import useAuth from "./auth/useAuth.tsx";


 function HospitalDashboardView() {

    const {isAuthenticated,authenticateUser, userRole} = useAuth();
    const navigate = useNavigate();

    return (
        <Sheet   >
            <Box sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))",
                    gap: 4,
                    p: 25
                }}   >


                <Card sx={{ width: 200}} onClick={() => navigate('/hvisits')}>
                    <div>
                        <Typography level="title-lg" alignItems="center"> Visits </Typography>
                        <IconButton
                            variant="plain"
                            color="neutral"
                            size="sm"
                            sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}>
                        </IconButton>
                    </div>
                    <AspectRatio minHeight="100px" maxHeight="100px">
                        <img
                            src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                            srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                            loading="lazy"
                            alt=""
                        />
                    </AspectRatio>
                    <CardContent orientation="horizontal">
                        <Button
                            variant="solid"
                            size="md"
                            color="primary"
                            aria-label="Clients"
                            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}>
                            Visits
                        </Button>
                    </CardContent>
                </Card>
                <Card sx={{ width: 200}}  onClick={() => navigate('/hclaims')}>
                    <div>
                        <Typography level="title-lg" alignItems="center"> Claims </Typography>
                        <IconButton
                            variant="plain"
                            color="neutral"
                            size="sm"
                            sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}>
                        </IconButton>
                    </div>
                    <AspectRatio minHeight="100px" maxHeight="100px">
                        <img
                            src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                            srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                            loading="lazy"
                            alt=""
                        />
                    </AspectRatio>
                    <CardContent orientation="horizontal">
                        <Button
                            variant="solid"
                            size="md"
                            color="primary"
                            aria-label="Clients"
                            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}>
                            Claims
                        </Button>
                    </CardContent>
                </Card>
            </Box>

        </Sheet>

    );
}

export default  HospitalDashboardView;