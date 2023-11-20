import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class BugsService {
    async deleteBug(bugId, creatorId) {
        const bug = await this.getBugById(bugId)
        if (!bug) {
            throw new BadRequest(`no bug with this id: ${bugId}`)
        }
        if (bug.creatorId != creatorId) {
            throw new Forbidden('not your bug to close')
        }
        if (bug.closed == true) {
            throw new BadRequest('bug is already closed')
        }
        bug.closed = !bug.closed
        bug.updatedAt = new Date()
        await bug.save()
        return bug
    }
    async editBug(id, bugId, body) {
        const bug = await this.getBugById(bugId)
        if (bug.creatorId != id) {
            throw new Forbidden(`this is not your bug to edit`)
        }

        if (!bug) {
            throw new BadRequest(`no bug with this id: ${bugId}`)
        }
        if (bug.closed == true) {
            throw new BadRequest('bug is already closed')
        }

        bug.title = body.title || bug.title
        bug.description = body.description || bug.description
        bug.priority = body.priority || bug.priority
        await bug.save()
        return bug

    }
    async getBugById(bugId) {
        const bug = await dbContext.Bugs.findById(bugId).populate('creator', 'name picture email _id')
        return bug
    }
    async getAllBugs() {
        const bugs = await dbContext.Bugs.find().sort('-updatedAt').populate('creator', 'name picture email')
        // .populate('creator', 'name picture email _id')
        return bugs
    }
    async createBug(body) {
        const bug = await dbContext.Bugs.create(body)
        await bug.populate('creator', 'name picture email _id')
        return bug
    }

}

export const bugsService = new BugsService()