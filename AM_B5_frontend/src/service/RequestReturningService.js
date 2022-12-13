import {AXIOS_API_URL} from '../constants/Axios';
import axios from 'axios';

const url_RequestReturning = `${AXIOS_API_URL}/admin/api/requests`;

export const getListRequestReturning = async (page, size, keyword, sortBy, sortDirection, returnDate, states) => {
    const res = await axios.get(`${url_RequestReturning}`, {
        params: {
            page,
            size,
            keyword,
            sortBy,
            sortDirection,
            returnDate,
            states,
        },
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user_info')).token}`,
        },
    });
    return res;
};

export const getStates = async () => {
    const res = await axios.get(`${url_RequestReturning}/states`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user_info')).token}`,
        },
    });
    return res;
};

export function formatRequestReturningState(value) {
    let result = '';
    if (value == 'COMPLETED') {
        result = 'Completed';
    } else if (value == 'WAITING_FOR_RETURNING') {
        result = 'Waiting for returning';
    }
    return result;
}

class RequestReturningService {
    cancelRequestReturning(id) {
        return axios.delete(url_RequestReturning + `/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
    }
}

export default new RequestReturningService();
