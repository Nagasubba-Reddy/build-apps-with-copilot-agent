import express, { Request, Response } from 'express';
import { UserService } from '../services/UserService';

const router = express.Router();
const userService = new UserService();

/**
 * POST /api/users - Create a new user
 */
router.post('/', async (request: Request, response: Response) => {
  try {
    const userData = request.body;
    const user = await userService.createUser(userData);
    response.status(201).json(user);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

/**
 * GET /api/users/:id - Get user by ID
 */
router.get('/:id', async (request: Request, response: Response) => {
  try {
    const user = await userService.getUserById(request.params.id);
    if (!user) {
      response.status(404).json({ error: 'User not found' });
      return;
    }
    response.json(user);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

/**
 * GET /api/users - Get all users (sorted by points)
 */
router.get('/', async (_request: Request, response: Response) => {
  try {
    const users = await userService.getAllUsers();
    response.json(users);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

/**
 * PUT /api/users/:id - Update user
 */
router.put('/:id', async (request: Request, response: Response) => {
  try {
    const user = await userService.getUserById(request.params.id);
    if (!user) {
      response.status(404).json({ error: 'User not found' });
      return;
    }
    Object.assign(user, request.body);
    await user.save();
    response.json(user);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

/**
 * DELETE /api/users/:id - Delete user
 */
router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const user = await userService.deleteUser(request.params.id);
    if (!user) {
      response.status(404).json({ error: 'User not found' });
      return;
    }
    response.json({ message: 'User deleted' });
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

export default router;
