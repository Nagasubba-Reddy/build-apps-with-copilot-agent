import { User, IUser } from '../models/User';

export class UserService {
  /**
   * Create a new user
   */
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<IUser | null> {
    return await User.findById(userId);
  }

  /**
   * Get user by username
   */
  async getUserByUsername(username: string): Promise<IUser | null> {
    return await User.findOne({ username });
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  /**
   * Update user points
   */
  async updateUserPoints(userId: string, points: number): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      userId,
      { $inc: { points } },
      { new: true }
    );
  }

  /**
   * Get all users
   */
  async getAllUsers(): Promise<IUser[]> {
    return await User.find().sort({ points: -1 });
  }

  /**
   * Delete user
   */
  async deleteUser(userId: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(userId);
  }
}
