export class Bug {
    constructor(data){
        this.id = data.id || data._id
        this.title = data.title
        this.description = data.description
        this.priority = data.priority
        this.closed = data.closed || false
        this.closedDate = new Date(data.closedDate)
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.updatedAt = new Date(data.updatedAt)
    }
}