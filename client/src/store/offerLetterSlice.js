import { createSlice } from "@reduxjs/toolkit";

const offerLetterSlice = createSlice({
  name: "offerLetter",
  initialState: {
    account: null,
    formData: {
      companyName: "",
      companyAddress: "",
      candidateName: "",
      candidateAddress: "",
      position: "",
      startDate: "",
      salary: "",
      supervisorName: "",
      responsibilities: "",
      compensationAndBenefits: "",
      termsOfEmployment: "",
      acceptanceDeadline: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      uniqueLink: "",
    },
    offerLetter: null,
    verificationResult: null,
  },
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setOfferLetter: (state, action) => {
      state.offerLetter = action.payload;
    },
    setVerificationResult: (state, action) => {
      state.verificationResult = action.payload;
    },
    generateUniqueLink: (state) => {
      const uniqueLink = `${state.formData.candidateName}-${Date.now()}`;
      state.formData.uniqueLink = uniqueLink;
    },
  },
});

export const {
  setAccount,
  setFormData,
  setOfferLetter,
  setVerificationResult,
  generateUniqueLink,
} = offerLetterSlice.actions;

export default offerLetterSlice.reducer;
