const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/send-enquiry', async (req, res) => {
  const { name, email, phone, roomType, dateRange } = req.body;

  // Format dates as dd-mm-yyyy
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formattedCheckIn = formatDate(dateRange.from);
  const formattedCheckOut = formatDate(dateRange.to);

  // Configure transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'loungeasmanzil@gmail.com', // Your Gmail
      pass: 'dmvsxrsnlskweupt',         // Your app password (from Google)
    },
  });

  const mailOptions = {
    from: email,
    to: 'loungeasmanzil@gmail.com',
    subject: `New Booking Enquiry from ${name}`,
    text: `
Booking Enquiry Received:

Name: ${name}
Email: ${email}
Phone: ${phone}
Room Type: ${roomType}
Check-in: ${formattedCheckIn}
Check-out: ${formattedCheckOut}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent');
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Mail Error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
