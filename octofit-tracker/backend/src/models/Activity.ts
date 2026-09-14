import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'running' | 'walking' | 'strength_training';
  duration: number; // in minutes
  distance?: number; // in miles
  calories: number;
  intensity: 'low' | 'medium' | 'high';
  date: Date;
  notes?: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['running', 'walking', 'strength_training'],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    distance: Number,
    calories: {
      type: Number,
      required: true,
    },
    intensity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    notes: String,
    points: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
