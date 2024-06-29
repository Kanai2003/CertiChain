import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const VerifyOfferLetterModal = ({
  open,
  handleClose,
  formData,
  handleChange,
  verifyOfferLetter,
  verificationResult
}) => {
  return (
    <Dialog open={open} onClose={() => handleClose(false)} fullWidth>
      <DialogTitle textAlign={'center'} variant="h5">Verify Offer Letter</DialogTitle>
      <DialogContent sx={{
        paddingX: '1.5rem',
        marginY: '1rem'
      }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Offer Letter ID"
              name="offerLetterIdToVerify"
              value={formData.offerLetterIdToVerify || ''}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Offer Hash"
              name="offerHash"
              value={formData.offerHash || ''}
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
        <Button
          onClick={() => verifyOfferLetter(formData.offerLetterIdToVerify, formData.offerHash)}
          color="primary"
          variant="contained"
          fullWidth
        >
          Verify Offer Letter
        </Button>
      </DialogActions>
      {verificationResult && (
        <Typography variant="h6">{verificationResult}</Typography>
      )}
    </Dialog>
  );
};

export default VerifyOfferLetterModal;
