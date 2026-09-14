import { Team, ITeam } from '../models/Team';
import { Activity } from '../models/Activity';

export class TeamService {
  /**
   * Create a new team
   */
  async createTeam(teamData: Partial<ITeam>): Promise<ITeam> {
    const team = new Team(teamData);
    return await team.save();
  }

  /**
   * Get team by ID
   */
  async getTeamById(teamId: string): Promise<ITeam | null> {
    return await Team.findById(teamId).populate('members').populate('createdBy');
  }

  /**
   * Get all teams
   */
  async getAllTeams(): Promise<ITeam[]> {
    return await Team.find().populate('members').populate('createdBy');
  }

  /**
   * Add member to team
   */
  async addMemberToTeam(teamId: string, userId: string): Promise<ITeam | null> {
    return await Team.findByIdAndUpdate(
      teamId,
      { $addToSet: { members: userId } },
      { new: true }
    ).populate('members');
  }

  /**
   * Remove member from team
   */
  async removeMemberFromTeam(teamId: string, userId: string): Promise<ITeam | null> {
    return await Team.findByIdAndUpdate(
      teamId,
      { $pull: { members: userId } },
      { new: true }
    ).populate('members');
  }

  /**
   * Calculate team total points
   */
  async calculateTeamPoints(teamId: string): Promise<number> {
    const team = await Team.findById(teamId);
    if (!team) return 0;

    const result = await Activity.aggregate([
      { $match: { userId: { $in: team.members } } },
      { $group: { _id: null, totalPoints: { $sum: '$points' } } },
    ]);

    return result[0]?.totalPoints || 0;
  }

  /**
   * Update team total points
   */
  async updateTeamTotalPoints(teamId: string): Promise<ITeam | null> {
    const totalPoints = await this.calculateTeamPoints(teamId);
    return await Team.findByIdAndUpdate(
      teamId,
      { totalPoints },
      { new: true }
    );
  }

  /**
   * Delete team
   */
  async deleteTeam(teamId: string): Promise<ITeam | null> {
    return await Team.findByIdAndDelete(teamId);
  }
}
