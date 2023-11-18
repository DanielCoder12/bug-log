import { Schema } from "mongoose";

export const NotesSchema = new Schema({
    body: { type: String, required: true },
    bugId: { type: Schema.Types.ObjectId, required: true, ref: 'Bugs' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
},
    {
        timestamps: true, toJSON: { virtuals: true }
    }
)


NotesSchema.virtual('creator',
    {
        localField: 'creatorId',
        foreignField: '_id',
        justOne: true,
        ref: 'Account'
    })