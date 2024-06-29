import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: null,
  formData: {},
  offerLetter: null,
  verificationResult: null,
  offerLetterId: null,  // Add this line
};

const offerLetterSlice = createSlice({
  name: "offerLetter",
  initialState,
  reducers: {
    setAccount(state, action) {
      state.account = action.payload;
    },
    setFormData(state, action) {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    setOfferLetter(state, action) {
      state.offerLetter = action.payload;
    },
    setVerificationResult(state, action) {
      state.verificationResult = action.payload;
    },
    setOfferLetterId(state, action) {  // Add this reducer
      state.offerLetterId = action.payload;
    },
  },
});

export const {
  setAccount,
  setFormData,
  setOfferLetter,
  setVerificationResult,
  setOfferLetterId,  // Export this action
} = offerLetterSlice.actions;

export default offerLetterSlice.reducer;