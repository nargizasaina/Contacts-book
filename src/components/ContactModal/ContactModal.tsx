import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Contact } from '../../types';
import './ContactModal.css';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '80%', md: '60%', lg: '40%'},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
};

type ModalProps = {
  modalOpen: boolean, 
  handleClose: () => void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  item: Contact
}

const ContactModal = ({ modalOpen, handleClose, item, onChange, onSubmit}: ModalProps) => {
  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3 className='title'>Edit contact</h3>

          <Grid 
            component="form"
            container
            textAlign="center"
            onSubmit={onSubmit}
          >
            <Grid item xs={12} md={8} sx={{margin: '10px auto'}}>
              <TextField 
                label="Name" 
                variant="outlined" 
                value={item.name}
                name="name"
                onChange={onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={8} sx={{margin: '10px auto'}}>
              <TextField 
                label="Username" 
                variant="outlined" 
                value={item.username}
                name="username"
                onChange={onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={8} sx={{margin: '10px auto'}}>
              <TextField 
                label="Phone number" 
                variant="outlined" 
                value={item.phone}
                name="phone"
                onChange={onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={8} sx={{margin: '10px auto'}}>
              <TextField 
                label="Email" 
                variant="outlined" 
                value={item.email}
                name="email"
                onChange={onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={8} sx={{margin: '10px auto'}}>
              <TextField 
                label="Website" 
                variant="outlined" 
                value={item.website}
                name="website"
                onChange={onChange}
                fullWidth
              />
            </Grid>
            <Grid item sx={{width: {xs: '100%', md: '49.5%'}, marginX: 'auto'}}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleClose}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ContactModal;