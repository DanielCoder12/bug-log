import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { AppState } from '../AppState';
import {Bug} from '../models/Bug'

class BugsService {


    async getAllBugs(){
    const res = await api.get('api/bugs')
    // logger.log('bugs', res.data)
    AppState.bugs = res.data.map(b=>new Bug(b))
    }
}

export const bugsService = new BugsService()