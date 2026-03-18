import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
})); // Enable CORS for localhost:5173 and localhost:3000
app.use(morgan('combined')); // HTTP request logger
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Express.js API',
    version: '1.0.0',
    status: 'running'
  });
});
app.get('/bus', async (req, res) => {
  try {
    // Replace with your actual API key and parameters
    const apiKey = process.env.USER;
    const url = `http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll?serviceKey=${apiKey}&busRouteId=100100118`
    const response = await fetch(url);
    const data = await response.text(); // API returns XML, so keep as text

    // CORS is already handled by middleware
    console.log(data)
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching bus data');
  }
});
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/api/health`);
});

export default app;
