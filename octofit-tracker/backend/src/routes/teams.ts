import express, { Request, Response } from 'express';
import { TeamService } from '../services/TeamService';

const router = express.Router();
const teamService = new TeamService();

/**
 * POST /api/teams - Create a new team
 */
router.post('/', async (request: Request, response: Response) => {
  try {
    const teamData = request.body;
    const team = await teamService.createTeam(teamData);
    response.status(201).json(team);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

/**
 * GET /api/teams/:id - Get team by ID
 */
router.get('/:id', async (request: Request, response: Response) => {
  try {
    const team = await teamService.getTeamById(request.params.id);
    if (!team) {
      response.status(404).json({ error: 'Team not found' });
      return;
    }
    response.json(team);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

/**
 * GET /api/teams - Get all teams
 */
router.get('/', async (_request: Request, response: Response) => {
  try {
    const teams = await teamService.getAllTeams();
    response.json(teams);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

/**
 * POST /api/teams/:teamId/members/:userId - Add member to team
 */
router.post('/:teamId/members/:userId', async (request: Request, response: Response) => {
  try {
    const team = await teamService.addMemberToTeam(
      request.params.teamId,
      request.params.userId
    );
    response.json(team);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

/**
 * DELETE /api/teams/:teamId/members/:userId - Remove member from team
 */
router.delete('/:teamId/members/:userId', async (request: Request, response: Response) => {
  try {
    const team = await teamService.removeMemberFromTeam(
      request.params.teamId,
      request.params.userId
    );
    response.json(team);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

/**
 * DELETE /api/teams/:id - Delete team
 */
router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const team = await teamService.deleteTeam(request.params.id);
    if (!team) {
      response.status(404).json({ error: 'Team not found' });
      return;
    }
    response.json({ message: 'Team deleted' });
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

export default router;
