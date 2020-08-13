import stringifyData from "./../services/stringifyData";
import {url_base} from "./../constants/api_url";
import axios from "axios";
import 'react-notifications-component/dist/theme.css'

const api_url = url_base;

export const storeRecord = async (payload, resource, idCondominio) => {

    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
    };

    if(idCondominio) {
        headers.idCondominio = idCondominio;
    }

    const options = {
        url:`${api_url}${resource}`,
        method: 'POST',
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