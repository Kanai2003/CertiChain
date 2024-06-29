import React from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Typography
} from "@mui/material";

const CreateOfferLetterModal = ({ open, handleClose, formData, handleChange, createOfferLetter }) => {
  return (
    <Dialog open={open} onClose={() => handleClose(false)} fullWidth >
      <DialogTitle textAlign={'center'} variant="h5">Create Offer Letter</DialogTitle>
      <DialogContent sx={{
        paddingX: '1.5rem',
        marginY: '1rem'
      }}>
        
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Employer"
                name="employer"
                value={formData.employer || ''}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Candidate"
                name="candidate"
                value={formData.candidate || ''}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Salary"
                name="salary"
                value={formData.salary || ''}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Position"
                name="position"
                value={formData.position || ''}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date"
                name="date"
                value={formData.date || ''}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
      </DialogContent>
      <DialogActions sx={{paddingX: '1.5rem'}}>
        <Button onClick={() => handleClose(false)} color="secondary" variant="outlined" fullWidth>
          Cancel
        </Button>
        <Button onClick={createOfferLetter} color="primary" variant="contained" fullWidth>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateOfferLetterModal;
