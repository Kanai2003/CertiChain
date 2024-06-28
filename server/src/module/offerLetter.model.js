import mongoose from 'mongoose';


const OfferLetterSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  offerDetails: {
    type: String,
    required: true,
  },
  uniqueLink: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
},
{
    timestamps: true,
});

export const OfferLetter = mongoose.model('OfferLetter', OfferLetterSchema);
