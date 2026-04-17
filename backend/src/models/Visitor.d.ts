import mongoose, { Document } from 'mongoose';
export interface IVisitor extends Document {
    socketId: string;
    firstSeen: Date;
    lastSeen: Date;
    pageViews: number;
}
declare const _default: mongoose.Model<IVisitor, {}, {}, {}, mongoose.Document<unknown, {}, IVisitor, {}, mongoose.DefaultSchemaOptions> & IVisitor & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IVisitor>;
export default _default;
//# sourceMappingURL=Visitor.d.ts.map