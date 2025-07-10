const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5000;

// Security and performance middleware
app.use(helmet());
app.use(compression());

// CORS with better configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://manzillounge.com', 'https://www.manzillounge.com']
    : ['http://localhost:8080', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Rate limiting for API endpoints
const rateLimit = {};
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!rateLimit[ip]) {
    rateLimit[ip] = { count: 1, resetTime: now + RATE_LIMIT_WINDOW };
  } else if (now > rateLimit[ip].resetTime) {
    rateLimit[ip] = { count: 1, resetTime: now + RATE_LIMIT_WINDOW };
  } else if (rateLimit[ip].count >= MAX_REQUESTS) {
    return res.status(429).json({ 
      success: false, 
      error: 'Too many requests. Please try again later.' 
    });
  } else {
    rateLimit[ip].count++;
  }
  
  next();
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/api/send-enquiry', rateLimiter, async (req, res) => {
  const { name, email, phone, roomType, dateRange } = req.body;

  // Enhanced validation
  if (!name || !email || !phone || !roomType || !dateRange) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required fields' 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid email format' 
    });
  }

  // Format dates as dd-mm-yyyy
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formattedCheckIn = formatDate(dateRange.from);
  const formattedCheckOut = formatDate(dateRange.to);

  // Configure transporter with better security
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'loungeasmanzil@gmail.com',
      pass: process.env.EMAIL_PASS || 'dmvsxrsnlskweupt',
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER || 'loungeasmanzil@gmail.com',
    subject: `New Booking Enquiry from ${name}`,
    html: `
      <h2>New Booking Enquiry</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Room Type:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${roomType}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Check-in:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formattedCheckIn}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Check-out:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formattedCheckOut}</td></tr>
      </table>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent for booking from ${name} (${email})`);
    res.status(200).json({ success: true, message: 'Enquiry sent successfully' });
  } catch (error) {
    console.error('❌ Mail Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email. Please try again later.' 
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Endpoint not found' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Mail service configured for ${process.env.EMAIL_USER || 'loungeasmanzil@gmail.com'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received. Shutting down gracefully...');
  process.exit(0);
});
