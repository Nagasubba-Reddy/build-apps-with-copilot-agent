import express, { Request, Response } from 'express';
import { ActivityService } from '../services/ActivityService';

const router = express.Router();
const activityService = new ActivityService();

/**
 * POST /api/activities - Log a new activity
 */
router.post('/', async (request: Request, response: Response) => {
  try {
    const activityData = request.body;
    const activity = await activityService.logActivity(activityData);
    response.status(201).json(activity);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

/**
 * GET /api/activities/:userId - Get user's activities
 */
router.get('/user/:userId', async (request: Request, response: Response) => {
  try {
    const activities = await activityService.getUserActivities(request.params.userId);
    response.json(activities);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

/**
 * GET /api/activities/:id - Get activity by ID
 */
router.get('/:id', async (request: Request, response: Response) => {
  try {
    const activity = await activityService.getActivityById(request.params.id);
    if (!activity) {
      response.status(404).json({ error: 'Activity not found' });
      return;
    }
    response.json(activity);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

/**
 * DELETE /api/activities/:id - Delete activity
 */
router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const activity = await activityService.deleteActivity(request.params.id);
    if (!activity) {
      response.status(404).json({ error: 'Activity not found' });
      return;
    }
    response.json({ message: 'Activity deleted' });
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

export default router;
