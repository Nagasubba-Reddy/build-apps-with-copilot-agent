import { Leaderboard, ILeaderboardEntry } from '../models/Leaderboard';
import { Activity } from '../models/Activity';
import { User } from '../models/User';

export class LeaderboardService {
  /**
   * Get leaderboard for a specific period
   */
  async getLeaderboard(period: 'weekly' | 'monthly' | 'all_time' = 'all_time'): Promise<ILeaderboardEntry[]> {
    const startDate = this.getStartDateForPeriod(period);

    const pipeline = [
      {
        $match: {
          date: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: '$userId',
          totalPoints: { $sum: '$points' },
          activitiesCompleted: { $sum: 1 },
        },
      },
      {
        $sort: { totalPoints: -1 },
      },
      {
        $addFields: {
          rank: { $add: [{ $indexOfArray: [['$_id'] as any, '$_id'] }, 1] },
        },
      },
    ];

    const results = await Activity.aggregate(pipeline);

    return results.map((result, index) => ({
      userId: result._id,
      rank: index + 1,
      totalPoints: result.totalPoints,
      activitiesCompleted: result.activitiesCompleted,
      period,
    } as any));
  }

  /**
   * Get user's rank on leaderboard
   */
  async getUserRank(userId: string, period: 'weekly' | 'monthly' | 'all_time' = 'all_time'): Promise<number | null> {
    const leaderboard = await this.getLeaderboard(period);
    const entry = leaderboard.find((entry) => entry.userId.toString() === userId);
    return entry?.rank || null;
  }

  /**
   * Get personalized workout suggestions based on activity history
   */
  async getWorkoutSuggestions(userId: string): Promise<string[]> {
    const activities = await Activity.find({ userId }).sort({ date: -1 }).limit(10);

    const activityCounts = {
      running: 0,
      walking: 0,
      strength_training: 0,
    };

    activities.forEach((activity) => {
      activityCounts[activity.type]++;
    });

    const suggestions: string[] = [];

    // Logic to suggest activities based on history
    if (activityCounts.running === 0) {
      suggestions.push('Try a running session to build cardiovascular endurance!');
    }
    if (activityCounts.strength_training < 2) {
      suggestions.push('Add some strength training to your routine for muscle building.');
    }
    if (activityCounts.walking < 3) {
      suggestions.push('Take a relaxing walk to improve your daily activity level.');
    }

    return suggestions;
  }

  /**
   * Get start date based on period
   */
  private getStartDateForPeriod(period: 'weekly' | 'monthly' | 'all_time'): Date {
    const now = new Date();
    switch (period) {
      case 'weekly':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case 'monthly':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      case 'all_time':
        return new Date(0);
      default:
        return new Date(0);
    }
  }
}
