import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IProject, {}, {}, {}, mongoose.Document<unknown, {}, IProject, {}, mongoose.DefaultSchemaOptions> & IProject & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IProject>;
export default _default;
//# sourceMappingURL=Project.d.ts.map