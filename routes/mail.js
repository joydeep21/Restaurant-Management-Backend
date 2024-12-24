const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const Form = require('../model/mail'); // Adjust path if needed
const router = express.Router();

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/submit-form', upload.single('attachment'), async (req, res) => {
    console.log("knujuhdfvfvd",req.body,req.file);
    
  try {
    // Save form data to MongoDB
    const formData = new Form({
      insuredType: req.body.insuredType,
      docName: req.body.docName,
      address: req.body.address,
      street: req.body.street,
      district: req.body.district,
      state: req.body.state,
      pinCode: req.body.pinCode,
      hospitalAddress: req.body.hospitalAddress,
      roadName: req.body.roadName,
      area: req.body.area,
      states: req.body.states,
      pincode: req.body.pincode1,
      mobileNumber: req.body.mobileNumber,
      alternateMobileNumber: req.body.alternateMobileNumber,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      weddingDate: req.body.weddingDate,
      idProofType: req.body.idProofType,
      idNumber: req.body.idNumber,
      speciality: req.body.speciality,
      otherSpeciality: req.body.otherSpeciality,
      insuranceCover: req.body.insuranceCover,
      references: req.body.references,
      totalPremium: req.body.totalPremium,
      tenure: req.body.tenure,
      amountPaid: req.body.amountPaid,
      paymentMode: req.body.paymentMode,
      relationshipManagerName: req.body.relationshipManagerName,
      relationshipManagerEmail: req.body.relationshipManagerEmail,
      file: req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : null,
      imageData: req.body.imageData,
      dateTimeOfSubmission: req.body.dateTimeOfSubmission,
      placeOfSubmission: req.body.placeOfSubmission
    });

    await formData.save();

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:"joydeep.shaw.aimdigitalise@gmail.com",
        pass: "njiz copa gnco yoac"
      }
    });

    // Create email body with form data
    const emailBody = `
      <h1>Contact Form Submission</h1>
      <p><strong>Insured Type:</strong> ${req.body.insuredType}</p>
      <p><strong>Document Name:</strong> ${req.body.docName}</p>
        <p><strong>Address:</strong> ${req.body.address}</p>
      <p><strong>Street:</strong> ${req.body.street}</p>
      <p><strong>District:</strong> ${req.body.district}</p>
      <p><strong>State:</strong> ${req.body.state}</p>
      <p><strong>Pin Code:</strong> ${req.body.pinCode}</p>
      <p><strong>Hospital Address:</strong> ${req.body.hospitalAddress}</p>
      <p><strong>Road Name:</strong> ${req.body.roadName}</p>
      <p><strong>Area:</strong> ${req.body.area}</p>
      <p><strong>States:</strong> ${req.body.states}</p>
      <p><strong>Pincode:</strong> ${req.body.pincode}</p>
      <p><strong>Mobile Number:</strong> ${req.body.mobileNumber}</p>
      <p><strong>Alternate Mobile Number:</strong> ${req.body.alternateMobileNumber}</p>
      <p><strong>Email:</strong> ${req.body.email}</p>
      <p><strong>Date of Birth:</strong> ${req.body.dateOfBirth}</p>
      <p><strong>Wedding Date:</strong> ${req.body.weddingDate}</p>
      <p><strong>ID Proof Type:</strong> ${req.body.idProofType}</p>
      <p><strong>ID Number:</strong> ${req.body.idNumber}</p>
      <p><strong>Speciality:</strong> ${req.body.speciality}</p>
      <p><strong>Other Speciality:</strong> ${req.body.otherSpeciality}</p>
      <p><strong>Insurance Cover:</strong> ${req.body.insuranceCover}</p>
      <p><strong>References:</strong> ${JSON.stringify(req.body.references)}</p>
      <p><strong>Total Premium:</strong> ${req.body.totalPremium}</p>
      <p><strong>Tenure:</strong> ${req.body.tenure}</p>
      <p><strong>Amount Paid:</strong> ${req.body.amountPaid}</p>
      <p><strong>Payment Mode:</strong> ${req.body.paymentMode}</p>
      <p><strong>Relationship Manager Name:</strong> ${req.body.relationshipManagerName}</p>
      <p><strong>Relationship Manager Email:</strong> ${req.body.relationshipManagerEmail}</p>
      <p><strong>Date and Time of Submission:</strong> ${req.body.dateTimeOfSubmission}</p>
      <p><strong>Place of Submission:</strong> ${req.body.placeOfSubmission}</p>
    
    `;

    // Mail options
    const mailOptions = {
      from:'joydeep.shaw.aimdigitalise@gmail.com',
      to: 'joydeep.shaw.aimdigitalise@gmail.com',
      subject: 'New Contact Form Submission',
      html: emailBody,
      attachments: [
        req.file ? {
          filename: req.file.originalname,
          content: req.file.buffer,
          contentType: req.file.mimetype
        } : null,
        req.body.imageData ? {
          filename: 'selfie.png',
          content: req.body.imageData.split(';base64,').pop(),
          encoding: 'base64'
        } : null
      ].filter(Boolean) // Remove null entries
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).send('Form submitted and email sent successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing form submission.');
  }
});

module.exports = router;
