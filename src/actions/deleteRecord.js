import {url_base} from "./../constants/api_url";
import CookieService from "../services/CookieService";
import axios from "axios";
import stringifyData from "../services/stringifyData";
const api_url = url_base;

export const deleteRecord = async (idRecord,resource) => {
    const authToken = CookieService.get('access_token');

    try{
        const response = await axios({
            url:`${api_url}${resource}/${idRecord}`,
            method: 'DELETE',
            headers: {
                "Authorization": 'Bearer ' + authToken,
            }
        });

        if(response) {
            return response.data;
        }
    }catch (e) {
        throw e;
    }
};