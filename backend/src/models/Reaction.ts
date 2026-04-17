import mongoose, { Schema, Document } from 'mongoose';

export interface IReaction extends Document {
  projectId: mongoose.Types.ObjectId;
  emoji: string;
  visitorId: string;
  createdAt: Date;
}

const ReactionSchema: Schema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
  emoji: { type: String, required: true },
  visitorId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IReaction>('Reaction', ReactionSchema);
