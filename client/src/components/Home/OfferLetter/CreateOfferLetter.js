import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOfferLetter } from './actions';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { ethers } from 'ethers';
import OfferLetterContract from './OfferLetterContract.json'; // Import the ABI

const contractAddress = '0xf31289312EF573a8a419Ae0f66fa5435Fd24a190';
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, OfferLetterContract.abi, signer);

function CreateOfferLetter() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        employer: '',
        candidate: '',
        salary: '',
        position: '',
        date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const generateOfferLetterId = () => {
        return Math.floor(Math.random() * 1000000).toString();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const offerLetterId = generateOfferLetterId();

        try {
            const tx = await contract.createOfferLetter(
                offerLetterId,
                formData.employer,
                formData.candidate,
                formData.salary,
                formData.position,
                formData.date
            );
            await tx.wait();

            const offerHash = ethers.utils.keccak256(
                ethers.utils.toUtf8Bytes(
                    formData.employer + formData.candidate + formData.salary + formData.position + formData.date
                )
            );
            const uniqueURL = `https://company.com/offer/${offerLetterId}`;

            dispatch(createOfferLetter({
                offerLetterId,
                ...formData,
                offerHash,
                uniqueURL
            }));
        } catch (error) {
            console.error('Error creating offer letter:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '10px',
                    padding: '20px',
                    textAlign: 'center',
                    marginTop: '50px'
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Create Offer Letter
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Employer"
                        name="employer"
                        value={formData.employer}
                        onChange={handleChange}
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Candidate"
                        name="candidate"
                        value={formData.candidate}
                        onChange={handleChange}
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        required
                    />
                    <Button variant="contained" color="primary" type="submit" sx={{ marginTop: '20px' }}>
                        Create Offer Letter
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default CreateOfferLetter;