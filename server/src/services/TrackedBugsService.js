import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class TrackedbugsService {
    async deleteTrackedBug(trackedBugId, id) {
        const trackedBug = await dbContext.TrackedBugs.findById(trackedBugId)
        if (!trackedBug) {
            throw new BadRequest(`no tracked bug with this id: ${trackedBugId}`)
        }
        if (trackedBug.accountId != id) {
            throw new BadRequest('you cannot delete this')
        }
        trackedBug.remove()
        return 'deleted'
    }
    async getTrackedBugs(id) {
        const trackedBugs = await dbContext.TrackedBugs.find({ accountId: id }).populate('bug')
        return trackedBugs
    }
    async getUsersTrackingBugs(bugId) {
        const trackedBugs = await dbContext.TrackedBugs.find({ bugId }).populate('tracker', 'name picture email _id')
        return trackedBugs
    }
    async createTrackedBug(body) {
        const users = await this.getUsersTrackingBugs(body.bugId)
        const isTracking = (await users).filter(u => u.accountId == body.accountId)
        if (isTracking.length > 0) {
            throw new BadRequest('you are already tracking this bug')
        }
        const trackedBug = await dbContext.TrackedBugs.create(body)
        await trackedBug.populate('tracker', 'name picture email _id')
        await trackedBug.populate('bug')
        return trackedBug
    }


}

export const trackedBugsService = new TrackedbugsService()