import "../../styles/LoginSignup.css";
import { Avatar, Box, Button, Container, Grid2, Link, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink } from "react-router-dom";

const LoginSignup = () => {
    const handleSubmit = () => console.log("login");
    
    return (
        <div className="login-signup">
            <Container maxWidth="xs">
                <Paper elevation={10} sx={{marginTop: 8, padding: 2}}>
                    <Avatar sx={{
                        mx: "auto",
                        bgcolor: "secondary.main",
                        textAlign: "center",
                        mb: 1
                    }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{textAlign: "center"}}>
                        Log In
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            placeholder="Enter username"
                            fullWidth
                            required
                            autoFocus
                            sx={{mb: 2}}
                        />
                        <TextField
                            placeholder="Enter password"
                            fullWidth
                            required
                            type="password"
                        />
                        <Button type="submit" variant="contained" fullWidth sx={{mt: 1}}>
                            Log In
                        </Button>
                    </Box>
                    <Grid2 container  justifyContent="space-between" sx={{mt: 1}}>
                        <Link component={RouterLink} to="/play">
                            Continue as Guest
                        </Link>
                        <Link component={RouterLink} to="/">
                            Sign Up
                        </Link>
                    </Grid2>
                </Paper>
            </Container>
        </div>
    );
}
 
export default LoginSignup;