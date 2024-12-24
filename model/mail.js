const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  insuredType: String,
  docName: String,
  address: String,
  street: String,
  district: String,
  state: String,
  pinCode: String,
  hospitalAddress: String,
  roadName: String,
  area: String,
  states: String,
  pincode: String,
  mobileNumber: String,
  alternateMobileNumber: String,
  email: String,
  dateOfBirth: Date,
  weddingDate: Date,
  idProofType: String,
  idNumber: String,
  speciality: String,
  otherSpeciality: String,
  insuranceCover: String,
  references: [{ name: String, contact: String, location: String }],
  totalPremium: String,
  tenure: String,
  amountPaid: String,
  paymentMode: String,
  relationshipManagerName: String,
  relationshipManagerEmail: String,
  file: { data: Buffer, contentType: String },
  imageData: String,
  dateTimeOfSubmission: Date,
  placeOfSubmission: String
});

module.exports = mongoose.model('Form', formSchema);
