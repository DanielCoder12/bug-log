import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";

export class NoteController extends BaseController {
    constructor() {
        super('api/notes')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createNote)
            .delete('/:noteId', this.deleteNote)

    }

    async createNote(req, res, next) {
        try {
            const body = req.body
            const creatorId = req.userInfo.id
            body.creatorId = creatorId
            const note = await notesService.createNote(body)
            return res.send(note)
        } catch (error) {
            next(error)
        }
    }

    async deleteNote(req, res, next) {
        try {
            const note = await notesService.deleteNote(req.params.noteId, req.userInfo.id)
            return res.send(note)
        } catch (error) {
            next(error)
        }
    }
}