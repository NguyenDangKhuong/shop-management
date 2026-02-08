import mongoose, { Document, Schema } from 'mongoose'

export interface IWorkflow extends Document {
    accountId: string
    promptId: string
    status: 'active' | 'inactive' | 'running' | 'completed' | 'failed'
    createdAt?: Date
    updatedAt?: Date
}

export type Workflow = IWorkflow

const WorkflowSchema = new Schema({
    accountId: { type: String, required: true },
    promptId: { type: String, required: true },
    status: {
        type: String,
        enum: ['active', 'inactive', 'running', 'completed', 'failed'],
        default: 'inactive'
    }
}, {
    timestamps: true,
    collection: 'workflows'
})

const WorkflowModel = mongoose.models.Workflow ||
    mongoose.model<IWorkflow>('Workflow', WorkflowSchema)

export default WorkflowModel
export { WorkflowSchema }
