import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import {
  setAccount,
  setFormData,
  setOfferLetter,
  setVerificationResult,
  generateUniqueLink,
} from "../store/offerLetterSlice";
import { ethers } from "ethers";
import OfferLetterContractABI from "../contracts/OfferLetterContract.json";

// Ensure this environment variable is set in your .env file
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const OfferLetter = () => {
  const [contract, setContract] = useState(null);

  const dispatch = useDispatch();
  const offerLetterState = useSelector((state) => state.offerLetter);

  const account = offerLetterState?.account || null;
  const isformData = offerLetterState?.formData || null;
  const offerLetter = offerLetterState?.offerLetter || null;
  const verificationResult = offerLetterState?.verificationResult || null;

  const [formData, setFormData] = useState({
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
  
  });

  useEffect(() => {
    const initializeEthers = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const offerLetterContract = new ethers.Contract(contractAddress, OfferLetterContractABI.abi, signer);
          setContract(offerLetterContract);
          dispatch(setAccount(await signer.getAddress()));
        } catch (error) {
          console.error("Failed to connect to Ethereum wallet:", error);
        }
      } else {
        console.log("Ethereum wallet is not connected");
      }
    };

    initializeEthers();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const createOfferLetter = async () => {
    if (!contract) return;

    try {
      const tx = await contract.createOfferLetter(
        formData.companyName,
        formData.companyAddress,
        formData.candidateName,
        formData.candidateAddress,
        formData.position,
        formData.startDate,
        formData.salary,
        formData.supervisorName,
        formData.responsibilities,
        formData.compensationAndBenefits,
        formData.termsOfEmployment,
        formData.acceptanceDeadline,
        formData.contactName,
        formData.contactEmail,
        formData.contactPhone,
        formData.uniqueLink
      );
      await tx.wait();
      console.log("Offer letter created successfully");
    } catch (error) {
      console.error("Error creating offer letter:", error);
    }
  };

  const getOfferLetter = async () => {
    if (!contract || !account) return;

    try {
      const offer = await contract.getOfferLetter(account);
      dispatch(setOfferLetter(offer));
    } catch (error) {
      console.error("Error fetching offer letter:", error);
    }
  };

  const verifyOfferLetter = async (uniqueLink) => {
    if (!contract) return;

    try {
      const isValid = await contract.verifyOfferLetter(uniqueLink);
      dispatch(setVerificationResult(isValid ? "Offer letter is valid." : "Offer letter is invalid."));
    } catch (error) {
      console.error("Error verifying offer letter:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Offer Letter
      </Typography>
      <Paper style={{ padding: 16 }}>
        <Grid container spacing={3}>
          {Object.keys(formData).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                value={formData[key] || ''}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => dispatch(generateUniqueLink())}
            >
              Generate Unique Link
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={createOfferLetter}
            >
              Create Offer Letter
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Button
        variant="contained"
        color="secondary"
        onClick={getOfferLetter}
        style={{ marginTop: 16 }}
      >
        Get Offer Letter
      </Button>

      {offerLetter && (
        <Paper style={{ padding: 16, marginTop: 16 }}>
          <Typography variant="h6">Offer Letter Details</Typography>
          {Object.entries(offerLetter).map(([key, value]) => (
            <Typography key={key}>
              {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
            </Typography>
          ))}
        </Paper>
      )}

      <Typography variant="h4" gutterBottom style={{ marginTop: 32 }}>
        Verify Offer Letter
      </Typography>
      <TextField
        label="Enter Unique Link"
        fullWidth
        onChange={(e) => verifyOfferLetter(e.target.value)}
      />
      {verificationResult && <Typography>{verificationResult}</Typography>}
    </Container>
  );
};

export default OfferLetter;
