import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { Contact } from "../../types";
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
      width: '20ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));

const ContactsBook = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchVal, setSearchVal] = useState<string>('');

  useEffect(() => {
    const localContacts = localStorage.getItem('contactsBook');
    
    // if (localContacts === null) {
      const ajax = () => {
        const http = new XMLHttpRequest();
        http.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
            localStorage.setItem('contactsBook', JSON.stringify(http.responseText));
            setContacts(JSON.parse(http.responseText));
            console.log('ajax', contacts);
          }
        };
        http.open("GET", "https://jsonplaceholder.typicode.com/users", true);
        http.send();
      };
  
      ajax();
    // } else{
    //   const needed = JSON.parse(localContacts);
    //   setContacts(needed);
    //   console.log(needed);
    // }
    // console.log(contacts);
  }, []);

  useEffect(() => {
    if (searchVal.length > 0) {
      const filteredData = contacts.filter(item => item.name.toLowerCase().includes(searchVal.toLowerCase()));
      setFilteredContacts(filteredData);
    } else {
      setFilteredContacts(contacts);
    }
    
  }, [searchVal, contacts]);


  return (
    <div className="container">
      <div className="search-wrapper">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search by name…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={e => setSearchVal((e.target.value).trim())}
          />
        </Search>
      </div>
      <div className="card-wrapper">
        {contacts[0]?.id && filteredContacts.map(item => (
          

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