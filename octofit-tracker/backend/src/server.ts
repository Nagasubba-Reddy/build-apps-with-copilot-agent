import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

const app: Express = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// Enable CORS for Codespaces and localhost
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// API Base URL configuration with Codespaces support
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Octofit Tracker API Server',
    status: 'running',
    apiBaseUrl,
    timestamp: new Date().toISOString(),
  });
});

// API Routes - Users
app.get('/api/users/', (req: Request, res: Response) => {
  res.json({
    message: 'Users endpoint',
    data: [],
    endpoint: `${apiBaseUrl}/api/users/`,
  });
});

app.post('/api/users/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'Create user',
    data: req.body,
  });
});

// API Routes - Teams
app.get('/api/teams/', (req: Request, res: Response) => {
  res.json({
    message: 'Teams endpoint',
    data: [],
    endpoint: `${apiBaseUrl}/api/teams/`,
  });
});

app.post('/api/teams/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'Create team',
    data: req.body,
  });
});

// API Routes - Activities
app.get('/api/activities/', (req: Request, res: Response) => {
  res.json({
    message: 'Activities endpoint',
    data: [],
    endpoint: `${apiBaseUrl}/api/activities/`,
  });
});

app.post('/api/activities/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'Create activity',
    data: req.body,
  });
});

// API Routes - Leaderboard
app.get('/api/leaderboard/', (req: Request, res: Response) => {
  res.json({
    message: 'Leaderboard endpoint',
    data: [],
    endpoint: `${apiBaseUrl}/api/leaderboard/`,
  });
});

// API Routes - Workouts
app.get('/api/workouts/', (req: Request, res: Response) => {
  res.json({
    message: 'Workouts endpoint',
    data: [],
    endpoint: `${apiBaseUrl}/api/workouts/`,
  });
});

app.post('/api/workouts/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'Create workout',
    data: req.body,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Octofit Tracker API Server running on port ${PORT}`);
  console.log(`📍 Environment: ${codespaceName ? `Codespaces (${codespaceName})` : 'Local'}`);
  console.log(`🌐 API Base URL: ${apiBaseUrl}`);
  console.log(`✅ Ready to handle requests`);
});

export default app;
