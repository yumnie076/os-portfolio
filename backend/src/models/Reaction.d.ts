import mongoose, { Document } from 'mongoose';
export interface IReaction extends Document {
    projectId: mongoose.Types.ObjectId;
    emoji: string;
    visitorId: string;
    createdAt: Date;
}
declare const _default: mongoose.Model<IReaction, {}, {}, {}, mongoose.Document<unknown, {}, IReaction, {}, mongoose.DefaultSchemaOptions> & IReaction & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IReaction>;
export default _default;
//# sourceMappingURL=Reaction.d.ts.map