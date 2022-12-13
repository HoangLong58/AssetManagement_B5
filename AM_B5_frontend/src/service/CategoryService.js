import {AXIOS_API_URL} from '../constants/Axios';
import axios from 'axios';

const url = `${AXIOS_API_URL}/admin/api/categories`;

export const getListCategories = async () => {
    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user_info')).token}`,
        }
    });
    return res;
};
