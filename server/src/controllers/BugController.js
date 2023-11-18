import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { bugsService } from "../services/BugsService.js";
import { notesService } from "../services/NotesService.js";
import { trackedBugsService } from "../services/TrackedBugsService.js";

export class BugController extends BaseController {
    constructor() {
        super('api/bugs')
        this.router
            .get('/:bugId/trackedbugs', this.getUsersTrackingBug)
            .get('/:bugId/notes', this.getNotesByBugId)
            .get('', this.getAllBugs)
            .get('/:bugId', this.getBugById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createBug)
            .put('/:bugId', this.editBug)
            .delete('/:bugId', this.deleteBug)
    }

    async getUsersTrackingBug(req, res, next) {
        try {

            const trackedBugs = await trackedBugsService.getUsersTrackingBugs(req.params.bugId)
            return res.send(trackedBugs)
        } catch (error) {
            next(error)
        }
    }

    async getNotesByBugId(req, res, next) {
        try {

            const notes = await notesService.getNotesByBugId(req.params.bugId)
            return res.send(notes)
        } catch (error) {
            next(error)
        }
    }

    async getAllBugs(req, res, next) {
        try {
            const bugs = await bugsService.getAllBugs()
            return res.send(bugs)
        } catch (error) {
            next(error)
        }
    }

    async getBugById(req, res, next) {
        try {

            const bug = await bugsService.getBugById(req.params.bugId)
            return res.send(bug)
        } catch (error) {
            next(error)
        }
    }

    async createBug(req, res, next) {
        try {
            const creatorId = req.userInfo.id
            const body = req.body
            body.creatorId = creatorId
            const bug = await bugsService.createBug(body)
            return res.send(bug)
        } catch (error) {
            next(error)
        }
    }

    async editBug(req, res, next) {
        try {
            const bug = await bugsService.editBug(req.userInfo.id, req.params.bugId, req.body)
            return res.send(bug)
        } catch (error) {
            next(error)
        }
    }

    async deleteBug(req, res, next) {
        try {
            const bug = await bugsService.deleteBug(req.params.bugId, req.userInfo.id)
            return res.send(bug)
        } catch (error) {
            next(error)
        }

    }

}