import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  rank: number;
  totalPoints: number;
  activitiesCompleted: number;
  period: 'weekly' | 'monthly' | 'all_time';
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
    rank: {
      type: Number,
      required: true,
    },
    totalPoints: {
      type: Number,
      required: true,
    },
    activitiesCompleted: {
      type: Number,
      default: 0,
    },
    period: {
      type: String,
      enum: ['weekly', 'monthly', 'all_time'],
      default: 'all_time',
    },
  },
  {
    timestamps: true,
  }
);

export const Leaderboard = mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
