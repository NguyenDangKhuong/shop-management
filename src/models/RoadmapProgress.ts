import mongoose, { Document, Schema } from 'mongoose'

export interface IRoadmapProgress extends Document {
    userId: string
    learnedTopics: string[]
    updatedAt?: Date
}

const RoadmapProgressSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    learnedTopics: { type: [String], default: [] },
}, {
    timestamps: true,
    collection: 'roadmap_progress',
})

const RoadmapProgressModel = mongoose.models.RoadmapProgress
    || mongoose.model<IRoadmapProgress>('RoadmapProgress', RoadmapProgressSchema)

export default RoadmapProgressModel
