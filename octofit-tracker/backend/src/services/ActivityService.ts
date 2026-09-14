import { Activity, IActivity } from '../models/Activity';
import { UserService } from './UserService';

const POINTS_MULTIPLIER = {
  running: 1.5,
  walking: 1.0,
  strength_training: 1.3,
};

const INTENSITY_MULTIPLIER = {
  low: 1.0,
  medium: 1.5,
  high: 2.0,
};

export class ActivityService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Calculate points based on activity type, duration, and intensity
   */
  private calculatePoints(type: string, duration: number, intensity: string): number {
    const basePoints = duration * 10;
    const typeMultiplier = POINTS_MULTIPLIER[type as keyof typeof POINTS_MULTIPLIER] || 1.0;
    const intensityMultiplier = INTENSITY_MULTIPLIER[intensity as keyof typeof INTENSITY_MULTIPLIER] || 1.0;
    return Math.round(basePoints * typeMultiplier * intensityMultiplier);
  }

  /**
   * Log a new activity
   */
  async logActivity(activityData: Partial<IActivity>): Promise<IActivity> {
    // Calculate points if not provided
    if (!activityData.points && activityData.type && activityData.duration && activityData.intensity) {
      activityData.points = this.calculatePoints(
        activityData.type,
        activityData.duration,
        activityData.intensity
      );
    }

    const activity = new Activity(activityData);
    const savedActivity = await activity.save();

    // Update user points
    if (activityData.userId && savedActivity.points) {
      await this.userService.updateUserPoints(
        activityData.userId.toString(),
        savedActivity.points
      );
    }

    return savedActivity;
  }

  /**
   * Get activities for a user
   */
  async getUserActivities(userId: string): Promise<IActivity[]> {
    return await Activity.find({ userId }).sort({ date: -1 });
  }

  /**
   * Get activity by ID
   */
  async getActivityById(activityId: string): Promise<IActivity | null> {
    return await Activity.findById(activityId);
  }

  /**
   * Get activities for a date range
   */
  async getActivitiesByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<IActivity[]> {
    return await Activity.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: -1 });
  }

  /**
   * Delete activity
   */
  async deleteActivity(activityId: string): Promise<IActivity | null> {
    const activity = await Activity.findByIdAndDelete(activityId);
    if (activity && activity.userId && activity.points) {
      // Deduct points from user
      await this.userService.updateUserPoints(
        activity.userId.toString(),
        -activity.points
      );
    }
    return activity;
  }
}
