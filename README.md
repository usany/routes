# Express.js MapServer

A basic Express.js web application with middleware and API routes.

## Installation

```bash
npm install
```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint

## Features

- Express.js framework
- CORS enabled
- Security headers with Helmet
- HTTP request logging with Morgan
- JSON body parsing
- Error handling middleware
- 404 handler

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)
