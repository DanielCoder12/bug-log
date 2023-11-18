import { Schema } from "mongoose";



export const BugsSchema = new Schema({
    title: { type: String, required: true, maxLength: 50 },
    description: { type: String, required: true, maxLength: 500 },
    priority: { type: Number, required: true, enum: [1, 2, 3, 4, 5], default: 1 },
    closed: { type: Boolean, default: false },
    closedDate: { type: Date },
    creatorId: { type: Schema.Types.ObjectId, required: true },
},
    {
        timestamps: true, toJSON: { virtuals: true }
    })

BugsSchema.virtual('creator',
    {
        localField: 'creatorId',
        foreignField: '_id',
        justOne: true,
        ref: 'Account'
    })
