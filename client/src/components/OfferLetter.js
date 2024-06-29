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
  setOfferLetterId,
} from "../store/offerLetterSlice";
import { ethers, utils } from "ethers";
import OfferLetterContractABI from "../contracts/OfferLetterContract.json";

// Ensure this environment variable is set in your .env file
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const OfferLetter = () => {
  const [contract, setContract] = useState(null);

  const dispatch = useDispatch();
  const offerLetterState = useSelector((state) => state.offerLetter);

  const account = offerLetterState?.account || null;
  const formData = offerLetterState?.formData || {};
  const offerLetter = offerLetterState?.offerLetter || null;
  const verificationResult = offerLetterState?.verificationResult || null;
  const generatedOfferLetterId = offerLetterState?.offerLetterId || null;

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
      const offerLetterId = generateRandomOfferLetterId();
      const tx = await contract.createOfferLetter(
        offerLetterId,
        formData.employer,
        formData.candidate,
        formData.salary,
        formData.position,
        formData.date
      );
      await tx.wait();
      console.log("Offer letter created successfully");
      dispatch(setOfferLetterId(offerLetterId));  // Store the generated offerLetterId
    } catch (error) {
      console.error("Error creating offer letter:", error);
    }
  };

  const getOfferLetter = async () => {
    if (!contract || !formData.offerLetterId) return;

    try {
      const offer = await contract.queryOfferLetter(formData.offerLetterId);
      dispatch(setOfferLetter({
        employer: offer[0],
        candidate: offer[1],
        salary: offer[2],
        position: offer[3],
        date: offer[4],
        offerHash: offer[5],
        uniqueURL: offer[6],
      }));
    } catch (error) {
      console.error("Error fetching offer letter:", error);
    }
  };

  const verifyOfferLetter = async (offerLetterId, offerHash) => {
    if (!contract) return;

    try {
      const isValid = await contract.verifyOfferHash(offerLetterId, offerHash);
      dispatch(setVerificationResult(isValid ? "Offer letter is valid." : "Offer letter is invalid."));
    } catch (error) {
      console.error("Error verifying offer letter:", error);
    }
  };

  const generateRandomOfferLetterId = () => {
    return `offer_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Offer Letter
      </Typography>
      <Paper style={{ padding: 16 }}>
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

      {generatedOfferLetterId && (
        <Typography variant="h6" style={{ marginTop: 16 }}>
          Generated Offer Letter ID: {generatedOfferLetterId}
        </Typography>
      )}

      <Typography variant="h4" gutterBottom style={{ marginTop: 32 }}>
        Get Offer Letter
      </Typography>
      <Paper style={{ padding: 16 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Offer Letter ID"
              name="offerLetterId"
              value={formData.offerLetterId || ''}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              onClick={getOfferLetter}
            >
              Get Offer Letter
            </Button>
          </Grid>
        </Grid>
      </Paper>

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
      <Paper style={{ padding: 16 }}>
        <Grid container spacing={3}>
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
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => verifyOfferLetter(formData.offerLetterIdToVerify, formData.offerHash)}
            >
              Verify Offer Letter
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {verificationResult && <Typography>{verificationResult}</Typography>}
    </Container>
  );
};

export default OfferLetter;