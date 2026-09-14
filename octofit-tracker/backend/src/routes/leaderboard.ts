import express, { Request, Response } from 'express';
import { LeaderboardService } from '../services/LeaderboardService';

const router = express.Router();
const leaderboardService = new LeaderboardService();

/**
 * GET /api/leaderboard - Get leaderboard (with optional period)
 */
router.get('/', async (request: Request, response: Response) => {
  try {
    const period = (request.query.period as 'weekly' | 'monthly' | 'all_time') || 'all_time';
    const leaderboard = await leaderboardService.getLeaderboard(period);
    response.json(leaderboard);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

/**
 * GET /api/leaderboard/:userId - Get user's rank
 */
router.get('/rank/:userId', async (request: Request, response: Response) => {
  try {
    const period = (request.query.period as 'weekly' | 'monthly' | 'all_time') || 'all_time';
    const rank = await leaderboardService.getUserRank(request.params.userId, period);
    if (rank === null) {
      response.status(404).json({ error: 'User not found on leaderboard' });
      return;
    }
    response.json({ rank });
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

/**
 * GET /api/leaderboard/suggestions/:userId - Get personalized workout suggestions
 */
router.get('/suggestions/:userId', async (request: Request, response: Response) => {
  try {
    const suggestions = await leaderboardService.getWorkoutSuggestions(request.params.userId);
    response.json({ suggestions });
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

export default router;
