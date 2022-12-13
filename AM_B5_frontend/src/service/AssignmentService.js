import axios from "axios";
import {AXIOS_API_URL} from "../constants/Axios";

const ASSIGNMENT_BASE_URL = AXIOS_API_URL + '/admin/api/assignments'

class AssignmentService {

    filterAssignment(states, text, assignedDate, pageNo) {
        var url = ASSIGNMENT_BASE_URL + '?text=' + text + '&assigned-date=' + assignedDate + '&state='
        states.map(state => url += state + ',')

        const token = window.localStorage.getItem("accessToken")
        const params = {
            params: {
                pageNo: pageNo
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        return axios.get(url, params);

    }

    searchingByText(text, pageNo) {
        const url = ASSIGNMENT_BASE_URL + '/searching?text=' + text
        const token = window.localStorage.getItem("accessToken")
        const params = {
            params: {
                pageNo: pageNo
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        return axios.get(url, params)
    }

    createNewAssignment(assignment) {
        const url = ASSIGNMENT_BASE_URL
        return axios.post(url, assignment, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
    }

    getAssignment(staffCode, sortBy, sortDirection) {
        const url = AXIOS_API_URL + '/users/api/assignments/' + staffCode + '?sortBy=' + sortBy + '&sortDirection=' + sortDirection
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })

    }

    editAssignment(assignment) {
        const url = ASSIGNMENT_BASE_URL
        return axios.put(url, assignment, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
    }

    deleteAssignment(assignedTo, assetCode, assignedDate) {
        const url = `${AXIOS_API_URL}/admin/api/assignments?assignedTo=${assignedTo}&assetCode=${assetCode}&assignedDate=${assignedDate}`
        return axios.delete(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            }
        })
    }
}

export default new AssignmentService()