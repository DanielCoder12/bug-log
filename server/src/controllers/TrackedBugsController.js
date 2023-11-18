import { Auth0Provider } from "@bcwdev/auth0provider";
import { trackedBugsService } from "../services/TrackedBugsService.js";
import BaseController from "../utils/BaseController.js";

export class TrackedBugsController extends BaseController {
    constructor() {
        super('api/trackedbugs')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTrackedBug)
            .delete('/:trackedBugId', this.deleteTrackedBug)
    }

    async createTrackedBug(req, res, next) {
        try {
            const body = req.body
            body.accountId = req.userInfo.id

            const trackedBug = await trackedBugsService.createTrackedBug(body)
            return res.send(trackedBug)
        } catch (error) {
            next(error)
        }
    }
    async deleteTrackedBug(req, res, next) {
        try {

            const message = await trackedBugsService.deleteTrackedBug(req.params.trackedBugId, req.userInfo.id,)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}