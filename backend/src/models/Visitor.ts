import mongoose, { Schema, Document } from 'mongoose';

export interface IVisitor extends Document {
  socketId: string;
  firstSeen: Date;
  lastSeen: Date;
  pageViews: number;
}

const VisitorSchema: Schema = new Schema({
  socketId: { type: String, required: true, index: true },
  firstSeen: { type: Date, default: Date.now },
  lastSeen: { type: Date, default: Date.now },
  pageViews: { type: Number, default: 1 }
});

export default mongoose.model<IVisitor>('Visitor', VisitorSchema);
