import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './Header.css';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img 
            className='header-img'
            src="https://cdn-icons-png.flaticon.com/512/4021/4021533.png" 
            alt='contact book' 
            width='30'
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Contacts Book
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
};

export default Header;