import axios from "axios"
import {AXIOS_API_URL} from '../constants/Axios';

class ReturningRequestResponseService {

    completeRequest(requestPayload) {
        const url = AXIOS_API_URL + "/admin/api/requests/states/complete"
        const token = window.localStorage.getItem("accessToken")
        const params = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        return axios.put(url, requestPayload, params)
    }
}

export default new ReturningRequestResponseService()