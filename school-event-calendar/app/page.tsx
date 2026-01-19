import Calendar from './components/Calendar';
import { Container, Box, Typography } from '@mui/material';

export default function Home() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                    School Event Calendar
                </Typography>
                <Calendar />
            </Box>
        </Container>
    );
}
