import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import './ContactsBook.css';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#eee',
  '&:hover': {
    backgroundColor: '#eef',
  },
  margin: '10px 0 20px',
  width: '200px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '200px',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

interface Contact {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
  companyName: string
}

const ContactsBook = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchVal, setSearchVal] = useState<String>('');

  useEffect(() => {
    const ajax = () => {
      const http = new XMLHttpRequest();
      http.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          localStorage.setItem('contacts-book', JSON.stringify(http.responseText));
          setContacts(JSON.parse(http.responseText));
        }
      };
      http.open("GET", "https://jsonplaceholder.typicode.com/users", true);
      http.send();
    };

    ajax();
  }, []);

  return (
    <div className="container">
      <div className="search-wrapper">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={e => setSearchVal(e.target.value)}
          />
        </Search>
      </div>
      <div className="card-wrapper">
        {contacts.map(item => (
          <Card key={item.id} variant="outlined" sx={{ minWidth: 275, margin: '10px' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.username}
              </Typography>
              <Typography variant="body2">
                {item.phone}
                <br />
                {item.email}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {item.companyName}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">{item.website}</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  )
};

export default ContactsBook;