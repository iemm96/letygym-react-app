import {url_base} from "./../constants/api_url";
import CookieService from "../services/CookieService";
import axios from "axios";
const api_url = url_base;

export const fetchRecordsByParam = async (resource,param,idCondominio) => {

    const authToken = CookieService.get('access_token');

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
    };

    if(idCondominio) {
        headers.idCondominio = idCondominio;
    }

    const options = {
        url:`${api_url}${resource}/${param}`,
        method: 'GET',
        headers: headers,
    };

    try {
        const response = await axios(options);

        if(response) {
            return response.data;
        }

        if(response) {
            return response.data;
        }
    }catch (e) {
        throw e;
    }

};