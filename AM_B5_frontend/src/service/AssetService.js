import {AXIOS_API_URL} from '../constants/Axios';
import axios from 'axios';

const url_Asset = `${AXIOS_API_URL}/admin/api/assets`;
const url_Assignment = `${AXIOS_API_URL}/admin/api/assignments`;

export const getListAssetState = async () => {
    const res = await axios.get(`${url_Asset}/asset/states`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user_info')).token}`,
        }
    });
    return res;
};

export const getOneAsset = async (assetId) => {
    const res = await axios.get(`${url_Asset}`, {
        params: {
            assetId
        },
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user_info')).token}`,
        }
    });
    return res;
};

export const getListAsset = async (userId, page, size, keyword, sortBy, sortDirection, categoryIds, states) => {
    const res = await axios.get(`${url_Asset}/${userId}`, {
        params: {
            page,
            size,
            keyword, sortBy, sortDirection,
            categoryIds,
            states,
        },
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user_info')).token}`,
        },

    });
    return res;
};

export function formatAssetState(value) {
    let result = '';
    if (value == "AVAILABLE") {
        result = 'Available';
    } else if (value == "NOT_AVAILABLE") {
        result = 'Not available';
    } else if (value == "ASSIGNED") {
        result = 'Assigned';
    } else if (value == "RECYCLED") {
        result = 'Recycled';
    } else if (value == "WAITING_FOR_RECYCLED") {
        result = 'Waiting for recycling';
    }
    return result;
}

export const getListAssignment = async (assetId) => {
    const res = await axios.get(`${url_Assignment}/${assetId}`, {
        params: {
            assetId
        },
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user_info')).token}`,
        },

    });
    return res;
};


