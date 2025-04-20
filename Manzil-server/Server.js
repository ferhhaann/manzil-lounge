const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/send-enquiry', async (req, res) => {
  const { name, email, phone, roomType, dateRange } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'manzilounge@gmail.com',         // your hotel's email
      pass: 'thbobjjgoqczyqtj',           // app password from Gmail
    },
  });

  const mailOptions = {
    from: email,
    to: 'loungeasmanzil@gmail.com',            // where the booking goes
    subject: `New Booking Enquiry from ${name}`,
    text: `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Room Type: ${roomType}
    Check-in: ${dateRange.from}
    Check-out: ${dateRange.to}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Mail Error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
