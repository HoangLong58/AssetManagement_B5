import {AXIOS_API_URL} from "../constants/Axios";
import axios from "axios";

class AssetsService {
    createNewAsset(data) {

        const url = AXIOS_API_URL + "/admin/api/assets";
        return axios.post(
            url,
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }
        )
    }

    searchAsset(text) {
        const url = AXIOS_API_URL + "/admin/api/assets/searching?text=" + text;
        return axios.get(
            url,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }
        )
    }

    editAsset(assetPayload, assetCode) {
        const url = AXIOS_API_URL + "/admin/api/assets/" + assetCode

        const token = window.localStorage.getItem("accessToken")
        const params = {

            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        return axios.put(url, assetPayload, params)
    }

    getReport(pageNo) {
        const url = AXIOS_API_URL + "/admin/api/assets/report?pageNo=" + pageNo
        const token = window.localStorage.getItem("accessToken")
        const params = {

            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        return axios.get(url, params)
    }

    exportToExcel() {
        const url = AXIOS_API_URL + "/admin/api/assets/excel"
        const token = window.localStorage.getItem("accessToken")
        const params = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        return axios.get(url, params)

    }

}

export default new AssetsService()