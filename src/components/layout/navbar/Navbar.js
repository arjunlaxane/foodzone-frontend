import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserOptions from './UserOptions';

const Navbar = () => {
  const { loading, isAuthenticated, user } = useSelector(state => state.user);

  const navigate = useNavigate();
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: 'burlywood',
      }}
      mt="auto"
      ml="auto"
      padding="1vmax"
    >
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3} md={2}>
          <Button
            onClick={() => navigate('/')}
            sx={{ color: 'white' }}
            variant="text"
          >
            Home
          </Button>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <Button
            onClick={() => navigate('/about')}
            variant="text"
            sx={{ color: 'white' }}
          >
            About
          </Button>
        </Grid>
        <Grid item xs={6} sm={3} md={2} sx={{ color: 'white' }}>
          <Button
            onClick={() => navigate('/contact')}
            variant="text"
            sx={{ color: 'white' }}
          >
            Contact
          </Button>
        </Grid>
        <Grid item xs={6} sm={3} md={2} sx={{ color: 'white' }}>
          <Button
            onClick={() => navigate('/products')}
            variant="text"
            sx={{ color: 'white' }}
          >
            Products
          </Button>
        </Grid>

        <Grid item xs={6} sm={3} md={2} sx={{ color: 'white' }}>
          {isAuthenticated ? (
            <UserOptions loading={loading} user={user} />
          ) : (
            <Button onClick={() => navigate('/login')} sx={{ color: 'white' }}>
              Login
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Navbar;
