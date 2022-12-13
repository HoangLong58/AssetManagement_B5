import axios from "axios";
import React from "react";
import {AXIOS_API_URL} from "../constants/Axios";

const BASE_URL_USERS = AXIOS_API_URL + '/admin/api/users';

class UserService {
    fetchUsers(pageNo) {

        const url = BASE_URL_USERS;
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

    filterUsersByRole(roleName, pageNo) {
        let url = '';
        if (roleName === 'All') {
            url = BASE_URL_USERS + '/all'
        } else {
            url = BASE_URL_USERS + '/filter/' + roleName
        }

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

    searchByText(text, roles, pageNo) {

        const token = window.localStorage.getItem("accessToken")
        const params = {
            params: {
                pageNo: pageNo
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        var url = BASE_URL_USERS + '?textPattern=' + text + '&roles='
        roles.map(role => {
            url = url + role + ","
        })

        return axios.get(url, params)
    }


    getUserByStaffCode(staffCode) {
        return axios.get(
            `${BASE_URL_USERS}/${staffCode}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }
        )
    }

    searchUser(text) {

        const url = AXIOS_API_URL + '/admin/api/users/searching?text=' + text;
        return axios.get(
            url,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }
        )
    }

}

export default new UserService();