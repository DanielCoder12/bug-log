import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class NotesService {
    async deleteNote(noteId, id) {
        const note = await dbContext.Notes.findById(noteId)
        if (!note) {
            throw new BadRequest(`no note with this id: ${noteId}`)
        }
        if (note.creatorId != id) {
            throw new Forbidden('not your note')
        }
        note.remove()
        return 'deleted'
    }
    async getNotesByBugId(bugId) {
        const notes = await dbContext.Notes.find({ bugId }).populate('creator', 'name picture email _id')
        return notes
    }
    async createNote(body) {
        const note = await dbContext.Notes.create(body)
        await note.populate('creator', 'name picture email _id')
        return note
    }

}

export const notesService = new NotesService()