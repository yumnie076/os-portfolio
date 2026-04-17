import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  githubUrl: { type: String },
  liveUrl: { type: String },
  imageUrl: { type: String },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IProject>('Project', ProjectSchema);
