import {url_base} from "./../constants/api_url";
import axios from "axios";
const api_url = url_base;

export const deleteRecord = async (idRecord,resource) => {

    try{
        const response = await axios({
            url:`${api_url}${resource}/${idRecord}`,
            method: 'DELETE'
        });

        if(response) {
            return response.data;
        }
    }catch (e) {
        throw e;
    }
};