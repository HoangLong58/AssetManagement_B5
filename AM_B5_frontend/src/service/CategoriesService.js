import {AXIOS_API_URL} from "../constants/Axios";
import axios from "axios";

class CategoriesService {
    getListCategories() {
        const url = AXIOS_API_URL + "/admin/api/categories";
        return axios.get(
            url,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }
        );
    }

    createCategory(id, name) {
        const url = AXIOS_API_URL + "/admin/api/categories";
        return axios.post(
            url,
            {
                id: id,
                name: name
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }
        )
    }
}

export default new CategoriesService()