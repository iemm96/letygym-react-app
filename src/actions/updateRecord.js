import stringifyData from "./../services/stringifyData";
import {url_base} from "./../constants/api_url";
import axios from "axios";
const api_url = url_base;

export const updateRecord = async (payload,resource,record) => {

    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
    };

    const options = {
        url:`${api_url}${resource}/${record}`,
        method: 'PUT',
        headers: headers,
        data: stringifyData(payload)
    };

    try {
        const response = await axios(options);

        if(response) {
            return response.data;
        }
    }catch (e) {
        throw e;
    }

};